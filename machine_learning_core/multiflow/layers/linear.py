import math
import torch
import torch.nn as nn
import torch.nn.functional as F

from utils.functions import GetTopSubnet


def memorization_hook(module, input_args, output):
    # store the output of the linear layer
    if module.store_output_flag:

        # if the incoming output is identical to the last stored output, we don't store it
        # this is to avoid memory blow up for models with multiple forward passes on the same data
        # (e.g. blip)
        if len(module.output_history) > 0:
            if torch.allclose(module.output_history[-1], output):
                return

        if module.store_output_mem_save:
            module.output_history.append(output.to('cpu', non_blocking=True))
        else:
            module.output_history.append(output)
    
    # store the input of the linear layer
    if module.store_input_flag:

        if len(module.input_history) > 0 and module.input_history[-1].shape == input_args[0].shape:
            if torch.allclose(module.input_history[-1], input_args[0]):
                print("Not registering the same input twice.")
                return

        if module.store_input_mem_save:
            module.input_history.append(input_args[0].clone().detach().to('cpu', non_blocking=True))
        else:
            module.input_history.append(input_args[0])



class Linear(nn.Linear):
    def __init__(self, in_features, 
                 out_features, 
                 bias=True, 
                 init_weight=None, 
                 init_bias=None, 
                 mask_dtype=torch.bool, 
                 pattern_lock=False, 
                 mask_on_fly=False,
                 store_input=False,
                 store_output=False):
        
        # initialize parent class
        super(Linear, self).__init__(in_features, out_features, bias)        
        
        # init masks for linear weight and linear bias
        self.register_buffer('weight_pruning_mask', torch.ones(self.weight.shape, dtype=mask_dtype))
        if self.bias is not None:
            self.register_buffer('bias_pruning_mask', torch.ones(self.bias.shape, dtype=mask_dtype))

        # start from pretrained weight matrix and bias if provided
        if init_weight is not None:
            self.weight.data = init_weight.clone()
            self.weight_pruning_mask = self.weight_pruning_mask.to(init_weight.device)
        
        if init_bias is not None and self.bias is not None:
            self.bias.data = init_bias.clone()
            self.bias_pruning_mask = self.bias_pruning_mask.to(init_bias.device)
        
        # since we want to make sure the masked parameters are not updated,
        # we must register backward hooks on the weights of the net to zero out the gradients
        self.pattern_lock = pattern_lock
        if self.pattern_lock:
            self.weight.register_hook(lambda g: g * self.weight_pruning_mask)
            if self.bias is not None:
                self.bias.register_hook(lambda g: g * self.bias_pruning_mask)

        # passing :mask_on_the_fly: will make the model apply the mask on the fly
        # if you don't pass this but you want the model to be pruned, you will have to
        # manually set the turned-off weights to 0
        self.mask_on_fly = mask_on_fly
        if self.mask_on_fly:
            self.forward = self.forward_on_the_fly

        # if selected, we store the last input to the linear layer
        # beware that this will blow up the memory usage if not used carefully
        assert store_input in (True, False, "offload"), "store_input must be either True, False or 'offload'"
        self.store_input_flag = store_input in (True, "offload")
        self.store_input_mem_save = store_input == "offload"
        if self.store_input_flag:
            self.input_history = []
        
        assert store_output in (True, False, "offload"), "store_output must be either True, False or 'offload'"
        self.store_output_flag = store_output in (True, "offload")
        self.store_output_mem_save = store_output == "offload"
        if self.store_output_flag:
            self.output_history = []
        
        # register a forward hook to store the input
        self.register_forward_hook(memorization_hook)



    @staticmethod
    def from_pretrained(linear_layer: nn.Linear, mask_dtype=torch.bool, pattern_lock=False, mask_on_the_fly=True, store_input=False, store_output=False):
        prunable_linear = Linear(
            in_features=linear_layer.in_features, 
            out_features=linear_layer.out_features, 
            bias=linear_layer.bias is not None, 
            init_weight=linear_layer.weight.clone(), 
            init_bias=linear_layer.bias.clone() if linear_layer.bias is not None else None,
            mask_dtype=mask_dtype,
            pattern_lock=pattern_lock,
            mask_on_fly=mask_on_the_fly,
            store_input=store_input,
            store_output=store_output
        )
        return prunable_linear
    

    def dummy_log(self, module, input):
        print(self)
        print(f"weight matrix sparsity = \
              {self.weight.data.nonzero().size(0) / self.weight.numel()}")
        print(f"mask sparsity = \
              {self.weight_pruning_mask.nonzero().size(0) / self.weight_pruning_mask.numel()}", end="\n\n")


    def apply_mask(self):
        W = self.weight_pruning_mask * self.weight
        if self.bias is not None:
            b = self.bias_pruning_mask * self.bias
        else:
            b = self.bias
        return W, b


    def forward_on_the_fly(self, input):
        # hadamard the mask with the weight matrix and bias, then apply the linear layer
        W, b = self.apply_mask()
        return F.linear(input, W, b)

    def check_gradients(self):
        # checks that gradients at masked positions sum to 0
        masked_grads = self.weight.grad[self.weight_pruning_mask == 0]
        return masked_grads.sum() == 0
    

class SupermaskLinear(nn.Linear):
    r"""
    Linear layer with a supermask. Implementation is based on the paper:
    **What's hidden inside a randomly weighted neural network?** by Ramanujan et al."""
    
    def __init__(self, *args, **kwargs):
        if "linear" in kwargs:
            src_linear = kwargs.pop("linear")
        else:
            src_linear = None
        
        # initialize the superclass
        super().__init__(*args, **kwargs)

        # NOTE: since we build on top of pretrained models, we don't need to
        # initialize the weights of the linear model from scratch. Instead,
        # we inherit the weights from the pretrained model.
        if src_linear is not None:
            self.weight.data = src_linear.weight.data.clone()
            if src_linear.bias is not None:
                self.bias.data = src_linear.bias.data.clone()
        
        # initialize the supermask
        self.weight_pruning_mask = nn.Parameter(self.weight.data.clone())
        
        # random initialization of the supermask as in edge-popup
        # in TAMT, we will override the initialization within the pruner class
        nn.init.kaiming_uniform_(self.weight_pruning_mask, a=math.sqrt(5))

        # NOTE: turn the gradient on the weights off
        self.weight.requires_grad = False

        # we will dynamically update either of these values when optimizing the supermask
        self.threshold = None


    def forward(self, x):
        if self.threshold is not None:
            mask = GetTopSubnet.apply(
                self.weight_pruning_mask.abs(), 
                torch.zeros_like(self.weight_pruning_mask).to(self.weight_pruning_mask.device), 
                torch.ones_like(self.weight_pruning_mask).to(self.weight_pruning_mask.device), 
                self.threshold
            )
            W = self.weight * mask
        else:
            W = self.weight
        return F.linear(x, W, self.bias)


    @staticmethod
    def from_pretrained(linear: nn.Linear):
        """static class method to initialize a `SupermaskLinear` layer from a pretrained `nn.Linear` layer"""
        assert isinstance(linear, nn.Linear), "Input layer must be an instance of `nn.Linear`"
        supermask_linear = SupermaskLinear(
            in_features=linear.in_features, 
            out_features=linear.out_features, 
            bias=linear.bias is not None, 
            linear=linear
        )
        return supermask_linear
    


class TiedLinear(nn.Module):
    """Custom class to share weights between linear modules.
    Example:  
    >>> normal_linear = nn.Linear(758, 758, bias=True)
    >>> tied_linear = TiedLinear(tie_to=input_linear)
    In this example, `tied_linear.weight` will be the same `nn.Parameter` instance of `normal_linear.weight`.
    if `normal_linear` also uses a bias, then `tied_linear` will also use the same instance.
    """

    def __init__(self, tie_to: nn.Linear):
        super().__init__()
        self.tied_linear = tie_to

    def forward(self, input: torch.Tensor) -> torch.Tensor:
        return torch.nn.functional.linear(input, self.tied_linear.weight.t(), self.tied_linear.bias)

    @property
    def in_features(self) -> int:
        return self.tied_to.in_features
    
    @property
    def out_features(self) -> int:
        return self.tied_to.out_features

    @property
    def weight(self) -> torch.Tensor:
        return self.tied_to.weight.t()

    @property
    def bias(self) -> torch.Tensor:
        return self.tied_to.bias