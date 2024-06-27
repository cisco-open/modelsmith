import time
import torch
import datetime

from lightning.pytorch.utilities.combined_loader import CombinedLoader
from pruners.base import Pruner
from pruners.accumulators import general_forward, region_forward
from utils.prune_utils import make_prunable, generate_schedule
from utils.misc import millions


# Based on https://github.com/mi-lad/snip/blob/master/snip.py#L18
class IterSNIP(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.float32, pattern_lock=True, mask_on_the_fly=True)
        super(IterSNIP, self).__init__(model, *args, **kwargs)
        self.init_weights = {id(p): torch.clone(p.data).detach() for _, _, p in self.named_masked_parameters}
        self.is_one_shot = False
        self.name = "itersnip"
        self.modifies_weights = False
        

    @torch.no_grad()
    def score(self, reduce_by=1):
        
        # calculate score |g * theta|
        for _, m, p in self.named_masked_parameters:
            # NOTE: since we are multiplying the gradient with the current value of its weight
            # if a weight is dead it will stay dead (ie, go to zero) over pruning iterations; 
            self.scores[id(p)] = torch.clone(p.grad/reduce_by*p).detach().abs_()
            p.grad.data.zero_()
            if m.grad is not None:
                m.grad.data.zero_()

        # normalize score
        all_scores = torch.cat([torch.flatten(v) for v in self.scores.values()])
        norm = torch.sum(all_scores)
        for _, _, p in self.named_masked_parameters:
            self.scores[id(p)].div_(norm)


    def prune(self, 
              target_sparsity, 
              model, 
              dataloader, 
              device, 
              fabric, 
              pruning_steps, 
              num_batches_per_step,
              schedule,
              **kwargs):
        time_in = time.time()

        # allow masks to have gradient
        for _, m, _ in self.named_masked_parameters:
            m.requires_grad = True

        # initialize the sparsity schedule (IterSNIP authors suggest using exponential decay of the 
        # active fraction of parameters (inverse of sparsity))
        sparsity_levels = generate_schedule(
            num_stages=pruning_steps,
            sparsity_level=target_sparsity,
            schedule=schedule
        )
        
        is_combined = 'region_loader' in kwargs and kwargs['region_loader'] is not None
        if is_combined:
            dataloader = CombinedLoader((dataloader, kwargs['region_loader']), mode="min_size")
            scale_factor = 2
        else:
            scale_factor = 1
        
        # start iterative pruning
        steps = 0
        for batch_idx, batch in enumerate(dataloader):
            print(f"[{self.name}], batch {batch_idx%num_batches_per_step+1}/{num_batches_per_step}, t = {steps+1}/{pruning_steps}.")
            if is_combined:
                general_batch, region_batch = batch
            else:
                general_batch = batch
            
            # compute gradient
            loss_general = general_forward(model.name, model, general_batch, device)
            fabric.backward(loss_general / scale_factor)
            if is_combined:
                loss_region = region_forward(model.name, model, region_batch, device)
                fabric.backward(loss_region / scale_factor)

            is_prune_step = (batch_idx+1) % num_batches_per_step == 0 \
                or batch_idx == len(dataloader) - 1
            if not is_prune_step: continue
            
            # calculate score |g * theta|
            self.score(reduce_by=num_batches_per_step)

            # compute the mask and apply it
            current_sparsity = sparsity_levels[steps]
            self.compute_mask(current_sparsity, scope="global")
            self.apply_mask()

            # log the current sparsity and check it with the actual mask values
            remaining_params, total_params = self.stats()
            print(f"\n{'-'*100}\nRemaining params at {current_sparsity*100:.2f}% sparsity = {millions(remaining_params):.2f}M\t" \
                f"(total prunable params = {millions(total_params):.2f}M)\n{'-'*100}\n")
            
            # terminate when the desired number of steps is reached
            steps += 1
            if steps == pruning_steps: break
        
        # compute total time, and log it then exit
        self.scoring_time = int(time.time() - time_in)
        print(f"Total pruning time = {datetime.timedelta(seconds=self.scoring_time)}")
    

    def reset(self):
        # discard gradient requirement on the masks
        for _, m, _ in self.named_masked_parameters:
            m.requires_grad = False

        # zero-out the parameter and mask gradients, then re-fill the mask with ones
        for _, mask, param in self.named_masked_parameters:
            if mask.grad is not None:
                mask.grad.data.zero_()
            if param.grad is not None:
                param.grad.data.zero_()
            
            # since itersnip zeroes out parameters over pruning iterations, when resetting the pruner
            # we need to re-initialize the weights
            param.data = self.init_weights[id(param)].clone().to(param.device)
            mask.fill_(1.)

        # zero-out the scores (unnecessary, but cleaner)
        for _, _, param in self.named_masked_parameters:
            self.scores[id(param)].zero_()
