import torch
from pruners.base import Pruner
from utils.prune_utils import make_prunable


# Based on https://github.com/jaeho-lee/layer-adaptive-sparsity/blob/main/tools/pruners.py#L162
class Lamp(Pruner):
    def __init__(self, model, *args, **kwargs):
        make_prunable(model, mask_dtype=torch.float32, pattern_lock=True, mask_on_the_fly=True)
        super(Lamp, self).__init__(model, *args, **kwargs)
        self.is_one_shot = True
        self.scores_computed = False
        self.modifies_weights = False
        self.name = 'lamp'

    # taken from original repository
    def _normalize_scores(scores):
        """
        Normalize one score tensor with the Lamp criterion.
        """
        # sort scores in an ascending order
        sorted_scores, sorted_idx = scores.view(-1).sort(descending=False)
        
        # compute cumulative sum
        scores_cumsum_temp = sorted_scores.cumsum(dim=0)
        scores_cumsum = torch.zeros(scores_cumsum_temp.shape, device=scores.device)
        scores_cumsum[1:] = scores_cumsum_temp[:len(scores_cumsum_temp)-1]
        
        # normalize by cumulative sum
        sorted_scores /= (scores.sum() - scores_cumsum)
        
        # tidy up and output
        new_scores = torch.zeros(scores_cumsum.shape, device=scores.device)
        new_scores[sorted_idx] = sorted_scores
        
        return new_scores.view(scores.shape)
    
    def _compute_square_scores(self):
        for _, _, p in self.named_masked_parameters:
            self.scores[id(p)] = torch.clone(p.data).detach().pow(2)

    def score(self):
        # LAMP uses squared magnitude as a base score; compute it first
        self._compute_square_scores()

        # Then, normalize each weight tensor according to the LAMP criterion
        for key, score in self.scores.items():
            self.scores[key] = Lamp._normalize_scores(score)

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
