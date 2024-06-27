import torch
from pruners.base import Pruner
from utils.prune_utils import make_prunable

class Rand(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.float32, pattern_lock=True, mask_on_the_fly=True)
        super(Rand, self).__init__(model, *args, **kwargs)
        self.is_one_shot = True
        self.modifies_weights = False
        self.name = 'rand'

    def score(self):
        for _, _, p in self.named_masked_parameters:
            self.scores[id(p)] = torch.randn_like(p)

    def prune(self, target_sparsity):
        # allow for a different randomization at different sparsity levels
        self.score()
        self.compute_mask(target_sparsity, scope="global")

    def reset(self):
        pass 