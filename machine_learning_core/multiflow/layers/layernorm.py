# never used and untested
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.nn.modules.normalization import _shape_t

class LayerNorm(nn.LayerNorm):
    def __init__(self, normalized_shape: _shape_t, eps: float = 0.00001, elementwise_affine: bool = True, device=None, dtype=None, init_weight=None, init_bias=None) -> None:
        # initialize parent class
        super().__init__(normalized_shape, eps, elementwise_affine, device, dtype)

        # place masks for affine transformations after normalization
        self.register_buffer("weight_mask", torch.ones_like(self.weight))
        if self.bias is not None:
            self.register_buffer("bias_mask", torch.ones_like(self.bias))
        
        # start from pretrained weights if available
        if init_weight is not None:
            self.weight = init_weight
            self.weight_mask = self.weight_mask.to(init_weight)
        if init_bias is not None:
            self.bias = init_bias
            self.bias_mask = self.bias_mask.to(init_bias)

    def forward(self, input):
        W = self.weight * self.weight_mask
        b = self.bias*self.bias_mask if self.bias is not None else self.bias
        return F.layer_norm(
            input, self.normalized_shape, W, b, self.eps)
    
    @staticmethod
    def from_pretrained(layernorm: nn.LayerNorm):
        prunable_layernorm = LayerNorm(
            layernorm.normalized_shape,
            eps=layernorm.eps,
            elementwise_affine=layernorm.elementwise_affine,
            init_weight=layernorm.weight,
            init_bias=layernorm.bias
        )
        return prunable_layernorm