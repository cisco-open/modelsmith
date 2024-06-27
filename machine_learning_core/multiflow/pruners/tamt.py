import time
import math
import datetime
import torch
import torch.nn as nn
import lightning as L
from transformers import get_linear_schedule_with_warmup
from lightning.pytorch.utilities.combined_loader import CombinedLoader

from layers.linear import SupermaskLinear
from pruners.base import Pruner
from pruners.accumulators import general_forward, region_forward
from utils.prune_utils import make_searchable, check_blip_state_dict


# task agnostic mask training, original paper here: https://aclanthology.org/2022.naacl-main.428/
class TAMT(Pruner):
    def __init__(self, model, *args, **kwargs):
        
        # initialize trainable masks for each of the prunable weights
        make_searchable(model)
        super(TAMT, self).__init__(model, *args, **kwargs)
        
        # default variables
        self.scores_computed = False
        self.is_one_shot = False
        self.modifies_weights = False
        self.name = 'tamt'
        self.requires_training = True

        # hyperparameters for mask initialization
        self.alpha = 2.0 # coming from the original paper
            

    def initialize_trainable_masks(self, target_sparsity):
        # TAMT initializes the trainable masks following the OMP distribution.
        # Each value is initially set to self.alpha * sparsity_thresh for weights that would be retained by OMP, and to 0 otherwise.
        omp_scores = {id(p): torch.clone(p.data).detach().abs_() for _, _, p in self.named_masked_parameters}
        omp_masks = {
            k: (v >= torch.kthvalue(v.view(-1), k=int(v.numel() * target_sparsity))[0]).float()
            for k, v in omp_scores.items()
        }

        flattened_omp_scores = torch.cat([v.view(-1) for v in omp_scores.values()])
        kth_score, _ = torch.kthvalue(flattened_omp_scores, k=int(flattened_omp_scores.numel()*target_sparsity))
        
        # loop through the trainable masks (instances of SupermaskLinear within the model) 
        # and set the "weight_pruning_mask" (to alpha * target_sparsity) * OMP Mask
        for _, mask, param in self.named_masked_parameters:
            mask.data = self.alpha * kth_score * omp_masks[id(param)].data
            mask.requires_grad_(True)

    def get_trainable_params(self):
        trainable_masks = []
        for _, mask, _ in self.named_masked_parameters:
            trainable_masks.append(mask)
        return trainable_masks

    @torch.no_grad()
    def pin_scores_to_memory(self):
        self.scores = {id(p): m for _, m, p in self.named_masked_parameters}

    @torch.no_grad()
    def update_threshold(self, target_sparsity):
        # at training time, TAMT re-computes the threshold for the binarization of each trainable mask to ensure 
        # that the sparsity of the model is always equal to the target sparsity
        running_scores = torch.cat([v.abs().view(-1) for v in self.scores.values()])
        kth_score, _ = torch.kthvalue(running_scores, k=int(running_scores.numel() * target_sparsity))

        # each instance of "SupermaskLinear" can be given either a "sparsity" or a "threshold" attribute to modify its binarization threshold
        for name, module in self.model.named_modules():
            to_exclude = any(k in name for k in self.keys_to_exclude)
            if isinstance(module, SupermaskLinear) and not to_exclude:
                setattr(module, "threshold", kth_score)

    
    def prune(self, target_sparsity, model, dataloader, device, fabric: L.Fabric, num_batches_per_step, **kwargs):

        time_in = time.time()

        # detect if we also have a region-level dataloader
        is_combined = 'region_loader' in kwargs and kwargs['region_loader'] is not None
        if is_combined:
            dataloader = CombinedLoader((dataloader, kwargs['region_loader']), mode="min_size")
        scale_factor = 2 if is_combined else 1

        # to save some memory, we only keep the gradients of the weight_pruning_mask params
        for name, param in self.model.named_parameters():
            if 'pruning_mask' not in name:
                param.requires_grad_(False)

        # initialize the masks following Eq 5 of the paper
        self.initialize_trainable_masks(target_sparsity)
        self.pin_scores_to_memory()

        # get all "weight_pruning_mask" params as the trainable params
        trainable_masks = self.get_trainable_params()
        
        # init the optimizer, which is AdamW in the original paper, with a fixed learning rate
        optimizer = torch.optim.AdamW(trainable_masks, lr=5e-5)
        optimizer = fabric.setup_optimizers(optimizer)
        scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=num_batches_per_step, last_epoch=-1)

        # start training the model for 1 epoch on the calibration data (we fix the computational budget in terms of the number of forward and backward passes)
        for batch_idx, batch in enumerate(dataloader):
            print(f"[{self.name.upper()}] Processing batch {batch_idx%num_batches_per_step+1}/{num_batches_per_step}", end='\r', flush=True)
            self.update_threshold(target_sparsity)
            
            # unwrap batches
            if is_combined:
                general_batch, region_batch = batch
            else:
                general_batch = batch 

            # forward the model and compute the loss
            loss_general = general_forward(model.name, model, general_batch, device)
            fabric.backward(loss_general / scale_factor)
            if is_combined:
                loss_region = region_forward(model.name, model, region_batch, device)
                fabric.backward(loss_region / scale_factor)

            # update the masks
            optimizer.step()
            scheduler.step()
            optimizer.zero_grad()

            if self.model.name == 'blip':
                check_blip_state_dict(self.model.state_dict())

            is_end_step = (batch_idx+1) % num_batches_per_step == 0 \
                or batch_idx == len(dataloader) - 1
            if is_end_step:
                break
        
        self.scores = {k: v.abs().detach() for k, v in self.scores.items()}
        self.compute_mask(target_sparsity, scope='global')

        self.scoring_time = int(time.time() - time_in)
        print(f"Total pruning time (hh:mm:ss) = {datetime.timedelta(seconds=self.scoring_time)}")

    def reset(self):
        # reset the scores, the already binarized masks and the trainable masks
        del self.scores
        self.scores = {}

        for name, module in self.model.named_modules():
            to_exclude = any(k in name for k in self.keys_to_exclude)
            if isinstance(module, SupermaskLinear) and not to_exclude:
                module.weight_pruning_mask.data = nn.init.kaiming_uniform_(module.weight_pruning_mask, a=math.sqrt(5))
                module.threshold = None

    def hard_reset(self):
        self.reset()
