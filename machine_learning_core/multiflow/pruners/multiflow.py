import time
import datetime
import torch
from functools import partial

from lightning.pytorch.utilities.combined_loader import CombinedLoader
from pruners.base import Pruner
from pruners.accumulators import forward_output, region_forward_output
from utils.prune_utils import (
    make_prunable, check_blip_state_dict, recursive_getattr
)
from utils.functions import detect_modality_fn



class MultiFlow(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.bool, pattern_lock=True, mask_on_the_fly=True, store_input=True)
        super(MultiFlow, self).__init__(model, *args, **kwargs)
        
        # 3 functions the user must implement to use this pruner
        self.detect_modality_fn = partial(detect_modality_fn, self.model.name)
        self.forward_output = partial(forward_output, self.model.name)
        self.region_forward_output = partial(region_forward_output, self.model.name) # optional, only for combined loaders
        
        # default variables
        self.scores_computed = False
        self.is_one_shot = True
        self.modifies_weights = False
        self.name = 'multiflow'
        
        # variables for the algorithm (note that pruning is always done in fp32)
        self.actn_norms = {id(p): torch.ones(p.size()[1], dtype=torch.float32) for _, _, p in self.named_masked_parameters}
        self.nsamples = {id(p): 0 for _, _, p in self.named_masked_parameters}
        self.init_weights = {id(p): torch.clone(p.data).detach().cpu() for _, _, p in self.named_masked_parameters}


    def _compute_abs_scores(self):
        for _, _, param in self.named_masked_parameters:
            self.scores[id(param)] = torch.clone(param.data).detach().abs_()

    def _modal_mask(self, target_sparsity):
        different_modalities = set([self.detect_modality_fn(n) for n, _, _ in self.named_masked_parameters])
        for modality in different_modalities:

            # get the scores of the tensors of this modality
            scores_for_this_modality = {
                id(p): self.scores[id(p)] for n, _, p in self.named_masked_parameters 
                if self.detect_modality_fn(n) == modality
            }
            modal_scores = torch.cat([torch.flatten(v) for v in scores_for_this_modality.values()])

            # get the modality threshold
            k = int(modal_scores.numel() * target_sparsity)
            threshold, _ = torch.kthvalue(modal_scores, k=k)
            
            # compute the mask for the parameters of this modality
            for name, mask, param in self.named_masked_parameters:
                if self.detect_modality_fn(name) != modality: continue
                score = self.scores[id(param)] 
                zero = torch.tensor([0], dtype=torch.bool).to(mask.device)
                one = torch.tensor([1], dtype=torch.bool).to(mask.device)
                mask.copy_(torch.where(score.to(mask.device) <= threshold, zero, one))


    def multimodal_distribution(self, target_sparsity):
        self._compute_abs_scores()
        self._modal_mask(target_sparsity)

        distribution = {}
        # grab the sparsity distribution for each param, rewind the masks and the scores
        for _, mask, param in self.named_masked_parameters:
            sparsity = 1 - mask.sum().item() / mask.numel()
            distribution[id(param)] = sparsity
            mask.fill_(1)
            self.scores[id(param)] = torch.zeros_like(self.scores[id(param)])
        
        return distribution


    def score(self):
        for _, _, param in self.named_masked_parameters:
            # compute the importance of each input and output neuron
            actn_norm = torch.sqrt(self.actn_norms[id(param)]).to(param.device)
            importance_per_output = (param.abs() * actn_norm).mean(dim=1)
            importance_per_input = (param.abs() * actn_norm).mean(dim=0)

            # make a cross product of the two importance vectors
            score = torch.outer(importance_per_output, importance_per_input)
            
            # final score |Imp(input)| * |w_ij| * |Imp(output)|
            score = score * param.abs()
            self.scores[id(param)] = torch.clone(score).detach().cpu()
                        
    
    def _offload_actns(self, text_atts_history):
        for name, _, param in self.named_masked_parameters:
            mname = ".".join(name.split(".")[:-1])
            module = recursive_getattr(self.model, mname)
            modality = self.detect_modality_fn(name)
            
            # if the current layer is a textual one, we must make sure not to include the [PAD] tokens 
            # in the computation of the score
            num_samples_to_add = 0
            if modality in ("text", "fusion"):
                assert len(text_atts_history) == len(module.input_history), \
                    "The number of text attentions and the number of input histories must be the same." \
                    "Instead got {} attentions and {} input histories.".format(len(text_atts_history), len(module.input_history))
                
                for index_in_history, (text_att, input_sample) in enumerate(zip(text_atts_history, module.input_history)):
                    # text_att is a tensor of size [B, L] telling which tokens are relevant for each sample of the current batch
                    # input_sample is a tensor of size [B, L, embed_size] containing the embedding of each token of each batch
                    # our goal is to remove from the second dimension of :input_sample: the tokens that are not relevant
                    assert text_att.size()[0] == input_sample.size()[0], \
                        f"The text attentions and the input history must have the same batch size. Instead got {text_att.size()[0]} and {input_sample.size()[0]}." \
                        f"Please check your implementation."
                    
                    num_samples_to_add += input_sample.size()[0]
                    
                    # in cross attention layers inputs will have a shape defined by the number of image patches, so we must
                    # make sure to avoid filtering out those
                    L_att = text_att.size()[-1]
                    L_seq = input_sample.size()[1]
                    if L_att == L_seq:
                        input_sample = input_sample[text_att.to(input_sample.device).squeeze() == 1, :] 

                    # modify the input sample s.t. it has shape (L, embed_size), where L is now the number of relevant tokens after filtering
                    module.input_history[index_in_history] = input_sample.view(-1, input_sample.size()[-1])
                
            # if the current layer is a vision one, there is no concept of image attention and we simply
            # reshape each input sample to have shape (L, embed_size), where L is the number image patches
            elif modality == "vision":
                for index_in_history, input_sample in enumerate(module.input_history):
                    # each vision input sample will have shape [B, P, embed_size], where P is the number of patches
                    num_samples_to_add += input_sample.size()[0]
                    module.input_history[index_in_history] = input_sample.view(-1, input_sample.size()[-1])
            else:
                raise NotImplementedError("Modality {} not supported.".format(modality))

            # rescale the offloaded activations and update the number of samples to include in the reduction
            self.actn_norms[id(param)] *= self.nsamples[id(param)] / (self.nsamples[id(param)]+num_samples_to_add)
            self.nsamples[id(param)] += num_samples_to_add

            # update the running norm vector
            X = torch.cat(module.input_history, dim=0).type(torch.float32)
            self.actn_norms[id(param)] = self.actn_norms[id(param)].to(X.device) + torch.norm(X, p=2, dim=0) ** 2  / self.nsamples[id(param)]

            # when activation norms are computed, release the input history
            del module.input_history; del X
            module.input_history = []


    def _flag_norms(self):
        # turn-off the flag for storing inputs for the layers that don't have to be pruned
        for module in self.model.modules():
            if hasattr(module, "store_input_flag"):
                module.store_input_flag = False

        for name, _, _ in self.named_masked_parameters:
            module_name = ".".join(name.split(".")[:-1])
            module = recursive_getattr(self.model, module_name)
            if hasattr(module, "store_input_flag"):
                module.store_input_flag = True


    @torch.no_grad()
    def prune(self, target_sparsity, model, dataloader, device, fabric, num_batches_per_step, **kwargs):
        # NOTE: fabric is kept here to share the signature with other pruners, but since there is no backward pass it is not used
        time_in = time.time()

        # detect if we also have a region-level dataloader
        is_combined = 'region_loader' in kwargs and kwargs['region_loader'] is not None
        if is_combined:
            dataloader = CombinedLoader((dataloader, kwargs['region_loader']), mode="min_size")

        # precompute the layer-wise pruning ratios (eq.7 of the paper)
        distribution = self.multimodal_distribution(target_sparsity)
        
        # initialize a buffer for the binary indices of the tokens to attend (will be used to discard [PAD] tokens from the input history of each module) 
        text_atts_history = []

        # be sure to avoid storing inputs for the layers that don't have to be pruned (would consume useless memory)
        self._flag_norms()
        
        # start iterating over the data
        for batch_idx, batch in enumerate(dataloader):
            print(f"[{self.name.upper()}] Processing batch {batch_idx%num_batches_per_step+1}/{num_batches_per_step}", end='\r', flush=True)

            # unpack "out-of-domain" and "in-domain" batches (refer to the "4M pretraining set" of VLMs for these terms)
            if is_combined:
                general_batch, region_batch = batch
            else:
                general_batch = batch

            # when processing text, some of the tokens are padded in order to properly
            # collate the batch; therefore, in order not to bias the criterion towards [PAD] tokens,
            # we must keep track of their position here, and we will get rid of them before aggregating batches
            # in the 'score' function
            if hasattr(model, "is_vlm") and model.is_vlm:
                text_attentions = general_batch['attention_mask'] if 'attention_mask' in general_batch else general_batch[2].clone() 
                text_atts_history.append(text_attentions)
            
            # forward the model on the ood/general data, with no backward pass
            _ = self.forward_output(model, general_batch, device, modality="fusion")

            # also forward the model on the id data
            if is_combined:
                if hasattr(model, "is_vlm") and model.is_vlm:
                    text_attentions = region_batch['attention_mask'] if 'attention_mask' in region_batch else region_batch[2].clone() 
                    text_atts_history.append(text_attentions)
                _ = self.region_forward_output(model, region_batch, device)
            
            # compute the running aggregration of the norms of the activations and release the associated memory
            self._offload_actns(text_atts_history)
            del text_atts_history; text_atts_history = []

            # once all activations are computed, compute the scores and inject the pruning ratios in "compute_mask"
            is_end_step = (batch_idx+1) % num_batches_per_step == 0 or batch_idx == len(dataloader) - 1
            if is_end_step:
                # compute the information flow score (eq.6 of the paper)
                self.score()
                # compute the final mask using the information flow score and the layer-wise pruning ratios (eq.8 of the paper)
                self.compute_mask(distribution, scope="local")
                break
                
        self.scoring_time = int(time.time() - time_in)
        print(f"Total pruning time (hh:mm:ss) = {datetime.timedelta(seconds=self.scoring_time)}")


    def hard_reset(self):
        self.reset()

    def reset(self):
        for _, mask, param in self.named_masked_parameters:
            mask.fill_(1)
            if mask.grad is not None:
                mask.grad.data.zero_()
            if param.grad is not None:
                param.grad.data.zero_()
            self.scores[id(param)] = torch.zeros(param.size(), dtype=torch.float32)
            self.nsamples[id(param)] = 0
            self.actn_norms[id(param)] = torch.zeros(param.size()[1], dtype=torch.float32)
        
        # re-tie the weights in the case of blip models
        if self.model.name == 'blip':
            check_blip_state_dict(self.model.state_dict())
