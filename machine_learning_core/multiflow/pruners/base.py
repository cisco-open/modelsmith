# Taken and adapted from: https://github.com/YiteWang/NTK-SAP/blob/main/Pruners/pruners.py
import torch
from collections import OrderedDict
from utils.prune_utils import stats, named_masked_parameters


class Pruner:
    def __init__(self, model, keys_to_exclude=[]):
        self.name = 'pruner'
        self.model = model
        self.requires_training = False

        self.scores = {}
        self.keys_to_exclude = keys_to_exclude
        
        if hasattr(self.model, "needs_tie") and self.model.needs_tie:
            if not hasattr(model, "tie_fn"):
                raise ValueError("You have passed a module with needs_tie=True to a pruner, but the model you are trying to prune does not have a tie_fn method. "
                                 "Please implement a tie_fn method in your model and try again.")
            if not callable(model.tie_fn):
                raise ValueError("The tie_fn method in your model is not callable. Please make sure that the tie_fn method in your model is callable.")
            
            print("Pruner was initialized with a model that needs to be tied: {}".format(self.model.name))
            self.model.tie_fn()

        if len(self.keys_to_exclude) > 0:
            print("Excluding keys: ", self.keys_to_exclude)
            self.named_masked_parameters = []
            for name, mask, param in named_masked_parameters(model):
                if not any(key in name for key in self.keys_to_exclude):
                    self.named_masked_parameters.append((name, mask, param))
        else:
            self.named_masked_parameters = list(named_masked_parameters(model))

        # NOTE: when wrapping with Lightning Fabric, a '_forward_module.' prefix is added to 
        # the names of the parameters; this is a hack to remove it
        self.named_masked_parameters = [
            (name.replace('_forward_module.', ''), mask, param) 
            for name, mask, param in self.named_masked_parameters
        ]
        

    def __str__(self):
        return self.name
    

    def __repr__(self):
        return self.name

        
    def score(self, *args, **kwargs):
        raise NotImplementedError


    @torch.no_grad()
    def _global_mask(self, sparsity):
        r"""Updates masks of model with scores by sparsity level globally.
        """

        global_scores = torch.cat([torch.flatten(v) for v in self.scores.values()])
        k = int(sparsity * global_scores.numel())
        if not k < 1:
            threshold, _ = torch.kthvalue(global_scores, k)
            for name, mask, param in self.named_masked_parameters:
                score = self.scores[id(param)] 
                zero = torch.tensor([0], dtype=torch.bool).to(mask.device)
                one = torch.tensor([1], dtype=torch.bool).to(mask.device)
                mask.copy_(torch.where(score.to(mask.device) <= threshold, zero, one))
            
    @torch.no_grad()
    def _local_mask(self, sparsity):
        r"""Updates masks of model with scores by sparsity level parameter-wise.
        """
        for _, mask, param in self.named_masked_parameters:
            score = self.scores[id(param)]
            # k = int((1.0 - sparsity) * score.numel())
            
            if isinstance(sparsity, dict):
                sparsity_for_this_param = sparsity[id(param)]
            else:
                sparsity_for_this_param = sparsity
            k = int(sparsity_for_this_param * score.numel())
            if not k < 1:
                threshold, _ = torch.kthvalue(torch.flatten(score), k)
                zero = torch.tensor([0], dtype=torch.bool).to(mask.device)
                one = torch.tensor([1], dtype=torch.bool).to(mask.device)
                mask.copy_(torch.where(score.to(mask.device) <= threshold, zero, one))

    def compute_mask(self, sparsity, scope):
        r"""Updates masks of model with scores by sparsity according to scope.
        """
        if scope == 'global':
            self._global_mask(sparsity)
        if scope == 'local':
            self._local_mask(sparsity)

    @torch.no_grad()
    def apply_mask(self):
        r"""Applies mask to prunable parameters.
        """
        for _, mask, param in self.named_masked_parameters:
            param.mul_(mask)

    def alpha_mask(self, alpha):
        r"""Set all masks to alpha in model.
        """
        for _, mask, _ in self.named_masked_parameters:
            mask.fill_(alpha)

    # Based on https://github.com/facebookresearch/open_lth/blob/master/utils/tensor_utils.py#L43
    def shuffle(self):
        for _, mask, param in self.named_masked_parameters:
            shape = mask.shape
            perm = torch.randperm(mask.nelement())
            mask = mask.reshape(-1)[perm].reshape(shape)

    def invert(self):
        for v in self.scores.values():
            v.div_(v**2)

    def stats(self):
        r"""Returns remaining and total number of prunable parameters.
        """
        return stats(self.named_masked_parameters)
    
    def state_dict(self):
        state_dict = OrderedDict()
        for name, _, param in self.named_masked_parameters:
            score = self.scores[id(param)]
            state_dict[name] = score.detach().cpu()
        return state_dict
    
    def load_state_dict(self, state_dict):
        for name, _, param in self.named_masked_parameters:
            self.scores[id(param)] = state_dict[name].to(param.device)
