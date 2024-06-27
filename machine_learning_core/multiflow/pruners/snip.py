import time
import torch
import datetime

from lightning.pytorch.utilities.combined_loader import CombinedLoader
from pruners.base import Pruner
from pruners.accumulators import general_forward, region_forward
from utils.prune_utils import make_prunable



# Original source: https://github.com/mi-lad/snip/blob/master/snip.py#L18
class SNIP(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.float32, pattern_lock=True, mask_on_the_fly=True, store_input=False, store_output=False)
        super(SNIP, self).__init__(model, *args, **kwargs)
        self.scores_computed = False
        self.is_one_shot = True
        self.modifies_weights = False
        self.name = 'snip'
        self.model = model


    @torch.no_grad()
    def score(self, reduce_by=1):  
        # calculate score |g * theta|
        for _, m, p in self.named_masked_parameters:
            reduced_grad = torch.clone(p.grad/reduce_by)
            self.scores[id(p)] = (reduced_grad * p).detach().abs_()
            p.grad.data.zero_()
            if m.grad is not None:
                m.grad.data.zero_()

        # normalize score
        all_scores = torch.cat([torch.flatten(v) for v in self.scores.values()])
        norm = torch.sum(all_scores)
        for _, _, p in self.named_masked_parameters:
            self.scores[id(p)].div_(norm)

    
    def prune(self, target_sparsity, model, dataloader, device, fabric, num_batches_per_step, **kwargs):
        
        if self.scores_computed:
            print(f"{self.name} works one-shot and the scores have already been computed. "
                "If you intend to recompute them, please call the hard_reset() method first.")
            self.compute_mask(target_sparsity, scope="global")
            return
        
        time_in = time.time()

        # allow masks to have gradient
        for _, m, _ in self.named_masked_parameters:
            m.requires_grad = True

        is_combined = 'region_loader' in kwargs and kwargs['region_loader'] is not None
        if is_combined:
            dataloader = CombinedLoader((dataloader, kwargs['region_loader']), mode="min_size")
            scale_factor = 2
        else:
            scale_factor = 1
        
        # compute gradient
        for batch_idx, batch in enumerate(dataloader):
            print(f"[{self.name.upper()}] Processing batch {batch_idx+1}/{num_batches_per_step}")
            if is_combined:
                general_batch, region_batch = batch
            else:
                general_batch = batch
            
            loss_general = general_forward(model.name, model, general_batch, device)
            fabric.backward(loss_general / scale_factor)
            if is_combined:
                loss_region = region_forward(model.name, model, region_batch, device)
                fabric.backward(loss_region / scale_factor)

            is_end_step = (batch_idx+1) % num_batches_per_step == 0 \
                or batch_idx == len(dataloader) - 1
            
            if is_end_step: break
        
        # when gradient is computed, compute the scores
        self.score(reduce_by=num_batches_per_step)           

        self.scores_computed = True
        self.compute_mask(target_sparsity, scope="global")
        self.scoring_time = int(time.time() - time_in)
        print(f"Total pruning time = {datetime.timedelta(seconds=self.scoring_time)}")

    def reset(self):
        pass
    
    def hard_reset(self):
        self.scores_computed = False
        self.scores = {}
        for _, m, p in self.named_masked_parameters:
            if m.grad is not None:
                m.grad.data.zero_()
            if p.grad is not None:
                p.grad.data.zero_()
            m.data.fill_(1.)
