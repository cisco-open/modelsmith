import torch
from pruners.base import Pruner
from utils.prune_utils import make_prunable


class LayerWiseL2Norm(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.bool)
        super(LayerWiseL2Norm, self).__init__(model, *args, **kwargs)
        self.scores_computed = False
        self.is_one_shot = True
        self.modifies_weights = False
        self.name = 'l2'

    # normalize the scores of each layer with layer-wise L2 Norm
    def _normalize_scores(scores):
        """
        Normalize one score tensor by its L2 Norm.
        """
        # compute the l2 norm of the scores 
        l2_norm = torch.norm(scores.view(-1), p=2, dim=0)
        
        # normalize the scores
        return scores / l2_norm
     

    def score(self):
        # compute the magnitude of each weight as its base score
        for _, _, p in self.named_masked_parameters:
            self.scores[id(p)] = torch.clone(p.data).abs().detach()

        # then, normalize each score tensor according to its layer-wise L2 norm
        for key, score in self.scores.items():
            self.scores[key] = LayerWiseL2Norm._normalize_scores(score)

        self.scores_computed = True

    def prune(self, target_sparsity):
        if not self.scores_computed:
            self.score()
        self.compute_mask(target_sparsity, scope="global")

    def reset(self):
        pass

    def hard_reset(self):
        self.scores_computed = False
        self.scores = {}     