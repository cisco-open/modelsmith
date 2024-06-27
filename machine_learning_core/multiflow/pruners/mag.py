import torch
from functools import partial
from pruners.base import Pruner
from utils.prune_utils import make_prunable
from utils.functions import detect_modality_fn


class Mag(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.bool, pattern_lock=True, mask_on_the_fly=True)
        super(Mag, self).__init__(model, *args, **kwargs)
        self.is_one_shot = True
        self.scores_computed = False
        self.modifies_weights = False
        self.name = 'omp'
        self.scope = 'global' # one of 'global', 'local', 'modality'
        self.detect_modality_fn = partial(detect_modality_fn, self.model.name)
    
    def score(self):
        for _, _, p in self.named_masked_parameters:
            self.scores[id(p)] = torch.clone(p.data).detach().abs_()


    def prune(self, target_sparsity):
        if not self.scores_computed:
            self.score()
            self.scores_computed = True
        
        self.compute_mask(target_sparsity, scope=self.scope)

    def compute_mask(self, sparsity, scope):
        if scope == 'global':
            self._global_mask(sparsity)
        if scope == 'local':
            self._local_mask(sparsity)
        if scope == 'modality':
            self._modal_mask(sparsity)


    def _modal_mask(self, target_sparsity):
        print("Computing mask for each modality...")
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


    def reset(self):
        pass

    def hard_reset(self):
        self.scores_computed = False
        self.scores = {} 