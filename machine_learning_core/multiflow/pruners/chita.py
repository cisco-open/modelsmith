import time
import torch
import numpy as np

from lightning.pytorch.utilities.combined_loader import CombinedLoader
from pruners.base import Pruner
from pruners.accumulators import general_forward, region_forward
from utils.prune_utils import make_prunable, generate_schedule, check_blip_state_dict
from utils.solvers import Heuristic_LSBlock, get_blocklist_custom



# Based on original implementation from https://github.com/mazumder-lab/CHITA
class Chita(Pruner):
    def __init__(self, model, *args, **kwargs):
        self.use_first_order = True
        self.block_size = 1e4

        make_prunable(model, mask_dtype=torch.float32, pattern_lock=True, mask_on_the_fly=True)
        super(Chita, self).__init__(model, *args, **kwargs)
        self.is_one_shot = False
        self.block_list = get_blocklist_custom(self.named_masked_parameters, self.block_size)
        self.modifies_weights = True
        self.init_weights = {id(p): torch.clone(p.data).detach() for _, _, p in self.named_masked_parameters}
        self.name = 'chita'


    def run(self, sparsity, fabric, A, lambda_, num_batches):
        in_time = time.time()
        
        # prepare inputs for CHITA
        w1_torch = torch.cat([torch.flatten(p).cpu() for _, _, p in self.named_masked_parameters])
        w1 = w1_torch.detach().numpy().astype(A.dtype)
        beta_tilde2 = np.copy(w1)
        beta_tilde1 = np.zeros_like(w1)
        k = int((1 - sparsity) * w1_torch.numel())
        
        if self.use_first_order:
            alpha = 1 / self.fisher_mini_bsz
        else:
            alpha = 0
        
        if alpha != 0:
            alpha_vec = alpha*A.sum(axis=0) 
        else:
            alpha_vec = np.zeros_like(w1)
        
        # print all the parameters going into the chita function together with their value and type
        print("About to run CHITA with the following parameters:")
        print("-\tw1: ", w1.shape, w1.dtype)
        print("-\tA: ", A.shape, A.dtype)
        print("-\tk: ", k, type(k))
        print("-\talpha_vec: ", alpha_vec.shape, alpha_vec.dtype)
        print("-\tlambda: ", lambda_)
        print("-\tbeta_tilde1: ", beta_tilde1.shape, beta_tilde1.dtype)
        print("-\tbeta_tilde2: ", beta_tilde2.shape, beta_tilde2.dtype)
        print("-\tuse_prune: ", True, type(True))
        print("-\tblock_list: ", type(self.block_list))

        # solve the chita minimization problem with blockwise approximation and backsolve with the woodbury formula
        # NOTE: this is the method used for Resnet-50 and MobileNet-V1 in the original CHITA paper
        # since the size of these networks is the closest to ours, we use this
        w_pruned, _, _, _, _ = Heuristic_LSBlock(
            w1,
            A,
            w1,
            k,
            alpha=alpha_vec,
            lambda1=0,
            lambda2=num_batches*lambda_/2,
            M=np.inf, 
            beta_tilde1=beta_tilde1, 
            beta_tilde2=beta_tilde2, 
            use_prune=True,
            block_list=self.block_list, 
            split_type=1,
            verbose=True
        )
        actual_non_zero = np.count_nonzero(w_pruned)
        print(f"{actual_non_zero} non-zero weights / {w_pruned.size} ({actual_non_zero/w_pruned.size*100:.2f}%)")

        with torch.no_grad():
            # compute the mask from the pruned weights
            flat_mask = torch.tensor(w_pruned != 0, dtype=torch.float32)

            # reshape both the mask and the flattened pruned weights to match the shape of the parameters
            param_sizes = [p.numel() for _, _, p in self.named_masked_parameters]
            mask_chunks = torch.split(flat_mask, split_size_or_sections=param_sizes)
            w_pruned_chunks = torch.split(torch.tensor(w_pruned, dtype=torch.float32), split_size_or_sections=param_sizes)
            
            for (_, mask, param), mask_chunk, w_pruned_chunk in zip(self.named_masked_parameters, mask_chunks, w_pruned_chunks):
                mask.copy_(mask_chunk.view_as(mask))
                param.data.copy_(w_pruned_chunk.view_as(param.data))

        total_time = int(time.time() - in_time)
        print("CHITA took {} seconds".format(total_time))
        


    def prune(self, 
              target_sparsity,
              model, 
              dataloader, 
              device, 
              fabric, 
              pruning_steps, 
              num_batches_per_step, 
              schedule,
              lambda_,
              **kwargs):

        # define sparsity schedule
        sparsity_levels = generate_schedule(
            pruning_steps, 
            target_sparsity, 
            schedule
        )

        if pruning_steps > 1:
            self.name = 'chita++'

        # accumulate gradients
        is_combined = 'region_loader' in kwargs and kwargs['region_loader'] is not None
        if is_combined:
            dataloader = CombinedLoader((dataloader, kwargs['region_loader']), mode="min_size")
            scale_factor = 2
        else:
            scale_factor = 1
        
        # start constructing the low-rank A matrix with first order gradient per sample
        num_params = sum([p.numel() for _, _, p in self.named_masked_parameters])
        A = np.zeros((num_batches_per_step, num_params), dtype=np.float32)
        steps = 0
        for batch_idx, batch in enumerate(dataloader):
            print(f"[{self.name}] Processing batch {batch_idx%num_batches_per_step+1}/{num_batches_per_step}")

            if is_combined:
                general_batch, region_batch = batch
                if not (hasattr(self, 'fisher_mini_bsz') and self.use_first_order):
                    self.fisher_mini_bsz = len(general_batch[0]) + len(region_batch[0])
                    print(f"Setting Fisher mini-batch size to {self.fisher_mini_bsz}")
            else:
                general_batch = batch
                if not (hasattr(self, 'fisher_mini_bsz') and self.use_first_order):
                    self.fisher_mini_bsz = len(general_batch[0])
                    print(f"Setting Fisher mini-batch size to {self.fisher_mini_bsz}")
            
            loss_general = general_forward(model.name, model, general_batch, device)
            fabric.backward(loss_general / scale_factor)
            if is_combined:
                loss_region = region_forward(model.name, model, region_batch, device)
                fabric.backward(loss_region / scale_factor)
            
            # store the gradient of each parameter
            grads = torch.cat([torch.flatten(torch.clone(p.grad)).cpu() for _, _, p in self.named_masked_parameters])
            A[batch_idx%num_batches_per_step, :] = grads.numpy()

            # zero-out the gradients
            model.zero_grad(set_to_none=True)
            for _, _, p in self.named_masked_parameters:
                assert p.grad is None

            is_end_step = (batch_idx+1) % num_batches_per_step == 0 \
                or batch_idx == len(dataloader) - 1
            
            # run the CHITA algorithm
            if is_end_step:
                sparsity = sparsity_levels[steps]
                self.run(sparsity, fabric, A, lambda_, num_batches_per_step)
                
                # chita relies on weight updates, so for blip we need to always tie the weights whenever we prune
                if self.model.name == 'blip':
                    check_blip_state_dict(self.model.state_dict())
                steps += 1
            
            if steps == len(sparsity_levels):
                # free up a lot of memory
                del A
                break          


    @torch.no_grad()
    def reset(self):
        for _, mask, param in self.named_masked_parameters:
            param.data.copy_(self.init_weights[id(param)].to(param))
            mask.fill_(1.)
        
        if self.model.name == 'blip':
            check_blip_state_dict(self.model.state_dict())
