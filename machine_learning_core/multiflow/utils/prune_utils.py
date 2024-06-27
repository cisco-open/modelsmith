import os
import numpy as np

import torch
import torch.nn as nn

from layers.linear import Linear, SupermaskLinear
from collections import OrderedDict


def masks(module):
    r"""Returns an iterator over modules masks, yielding the mask.
    """

    # this will work for Linear classes
    for name, buf in module.named_buffers():
        if "pruning_mask" in name:
            yield buf
        
    # this will work for SupermaskLinear classes
    for name, param in module.named_parameters():
        if "pruning_mask" in name:
            yield param


def named_masks(module):
    r"""Returns an iterator over modules masks, yielding the mask.
    """
    # this will work for Linear classes
    for name, buf in module.named_buffers():
        if "pruning_mask" in name:
            yield name.replace('_forward_module.', ''), buf
    
    # this will work for SupermaskLinear classes
    for name, param in module.named_parameters():
        if "pruning_mask" in name:
            yield name.replace('_forward_module.', ''), param


def prunable(module):
    return isinstance(module, (Linear, SupermaskLinear))


def parameters(model):
    r"""Returns an iterator over models trainable parameters, yielding just the
    parameter tensor.
    """
    for module in model.modules():
        for param in module.parameters(recurse=False):
            yield param


def masked_parameters(model, bias=False):
    r"""Returns an iterator over models prunable parameters, yielding both the
    mask and parameter tensors.
    """
    for module in filter(lambda p: prunable(p), model.modules()):
        for mask, param in zip(masks(module), module.parameters(recurse=False)):
            if param is not module.bias or bias is True:
                yield mask, param

        
def recursive_getattr(obj, attr):
    attrs = attr.split('.')
    if len(attrs) == 1:
        return getattr(obj, attrs[0])
    
    direct_child = getattr(obj, attrs[0])
    rest_of_attrs = '.'.join(attrs[1:])
    return recursive_getattr(direct_child, rest_of_attrs)


def named_masked_parameters(model, bias=False, exclude=[]):
    for pname, param in model.named_parameters():
        if any(e in pname for e in exclude): continue
        if '.bias' in pname and not bias: continue
        
        parent_module = '.'.join(pname.split('.')[:-1])
        if parent_module == '': continue
        
        parent_module = recursive_getattr(model, parent_module)
        if not prunable(parent_module): continue
        
        if pname.endswith('pruning_mask'):
            continue
        else:
            yield pname, recursive_getattr(model, pname + '_pruning_mask'), param



def _make_prunable(model: nn.Module, mask_dtype=torch.bool, pattern_lock=True, mask_on_the_fly=True, store_input=False, store_output=False) -> nn.Module: 

    # replace every module children with their prunable counterpart
    for name, module in model.named_children():

        # replacing linear layers
        if isinstance(module, nn.Linear):
            prunable_linear = Linear.from_pretrained(
                module, 
                mask_dtype=mask_dtype, 
                pattern_lock=pattern_lock, 
                mask_on_the_fly=mask_on_the_fly, 
                store_input=store_input, 
                store_output=store_output
            )
            setattr(model, name, prunable_linear)
        
        # NOTE: implement and substitute your custom layers here :) 
    

def make_prunable(model: nn.Module, mask_dtype=torch.bool, pattern_lock=True, mask_on_the_fly=True, store_input=False, store_output=False) -> nn.Module:
    """
    Makes an nn.Module prunable by replacing native torch
    layers with custom prunable layers containing masks.
    """
    if hasattr(model, 'prunable') and model.prunable: 
        return 
    
    for module in model.modules():
        _make_prunable(
            module, 
            mask_dtype=mask_dtype, 
            pattern_lock=pattern_lock, 
            mask_on_the_fly=mask_on_the_fly, 
            store_input=store_input, 
            store_output=store_output
        )
    
    setattr(model, 'prunable', True)


def _make_searchable(model: nn.Module, exclude: list[str] = []) -> nn.Module: 

    # replace every module children with their searchable counterpart
    for name, module in model.named_children():
        # skip excluded modules, e.g. matching head if provided
        if any(e in name for e in exclude): continue

        # replacing linear layers
        if isinstance(module, nn.Linear):
            searchable_linear = SupermaskLinear.from_pretrained(module)
            setattr(model, name, searchable_linear)



def make_searchable(model: nn.Module, exclude: list[str] = []) -> nn.Module:
    """
    Makes an nn.Module searchable by replacing native torch
    `nn.Linear` layers with custom `SupermaskLinear` layers.
    """   
    # replace every module children with their searchable counterpart
    if hasattr(model, 'searchable') and model.searchable: 
        return
    [_make_searchable(module, exclude=exclude) for name, module in model.named_modules() \
     if not any(e in name for e in exclude)]
    return model


def stats(named_masked_parameters):
    remaining_params, total_params = 0, 0 
    for _, mask, _ in named_masked_parameters:
        remaining_params += mask.detach().cpu().numpy().sum()
        total_params += mask.numel()
    return remaining_params, total_params


def dumpable_named_masks(model: nn.Module):
    return OrderedDict(named_masks(model))


def state_dict_without_masks(model: nn.Module):
    return OrderedDict(
        filter(
            lambda tpl: not tpl[0].endswith('pruning_mask'), 
            {k.replace('_forward_module', ''): v for k, v in model.state_dict().items()}.items()
        )
    )


def disentangle_path(path):
    name, ext = os.path.splitext(path)
    params_path = name + '_params' + ext
    masks_path = name + '_pruning_masks' + ext
    return params_path, masks_path


def save_prunable_model(model, path, mask_only=False, **kwargs):
    params_path, masks_path = disentangle_path(path)
    if mask_only:
        torch.save(dumpable_named_masks(model), masks_path, **kwargs)
    else:
        torch.save(dumpable_named_masks(model), masks_path, **kwargs)
        torch.save(state_dict_without_masks(model), params_path, **kwargs)
    return params_path, masks_path


def check_gradients(model: nn.Module):
    assert all(
        [module.check_gradients() for module in filter(lambda m: isinstance(m, Linear), model.modules())]
    ), "Gradients at masked positions are not 0. Please check your backward hooks are set correctly."


def freeze(model: nn.Module):
    for param in model.parameters():
        param.requires_grad_(False)
    return model


def remaining_params(model: nn.Module) -> int:
    remaining_params = 0
    for mask in masks(model):
        remaining_params += torch.sum(mask)
    return remaining_params.item()

def prunable_params(model: nn.Module) -> int:
    prunable_params = 0
    for mask in masks(model):
        prunable_params += mask.numel()
    return prunable_params


def generate_mesh(num_stages, base_level, sparsity_level, mesh_type):
    repeat=1
    if num_stages == 1:
        return [sparsity_level]
    if mesh_type == 'exp':
        sparsity_multiplier = (sparsity_level - base_level)*np.power(2, num_stages-1)/(np.power(2, num_stages-1) - 1)
        l = [base_level + sparsity_multiplier*((np.power(2, stage) - 1)/np.power(2, stage)) for stage in range(num_stages)]
        return [x for x in l for _ in range(repeat)]
    elif mesh_type == 'poly':
        l = [sparsity_level + (base_level-sparsity_level)*np.power(1 - (stage/(num_stages-1)), 3) for stage in range(num_stages)]
        return [x for x in l for _ in range(repeat)]
    elif mesh_type == 'const':
        return [sparsity_level for stage in range(num_stages)]
    elif mesh_type == 'linear':
        return [base_level + stage*(sparsity_level - base_level)/(num_stages-1) for stage in range(num_stages)]
    elif mesh_type == 'MFAC':
        sparsity_multiplier = ((1. - sparsity_level) / (1. - base_level)) ** (1./num_stages)
        return [1. - ((1. - base_level) * (sparsity_multiplier**(stage+1))) for stage in range(num_stages)]
    

def generate_schedule(num_stages, sparsity_level, schedule):
    if schedule == 'linear':
        return [sparsity_level + (1.0 - sparsity_level)*((stage + 1) / num_stages) for stage in range(num_stages)]
    elif schedule == 'exp':
        return [1.0 - (1.0 - sparsity_level)**((stage + 1) / num_stages) for stage in range(num_stages)]
    elif schedule == 'const':
        return [sparsity_level for _ in range(num_stages)]
    else:
        raise NotImplementedError(f"Schedule {schedule} not implemented.")


def tie_blip_params_for_pruner(named_masked_parameters):
    new_named_masked_parameters = []
    for name, mask, param in named_masked_parameters:
        vision_or_text_encoder = name.startswith("visual_encoder") or name.startswith("text_encoder")
        causal_self_attn_in_decoder = name.startswith("text_decoder") and ".attention." in name
        if vision_or_text_encoder or causal_self_attn_in_decoder:
            new_named_masked_parameters.append((name, mask, param))
    return new_named_masked_parameters


def is_blip_text_encoder_weight_tied(name):
    # all the weights of both the text-enc and the text-dec are tied to 
    # each other except for the SA / Causal SA layers
    return name.startswith("text_encoder") and ".attention." not in name

def is_blip_text_decoder_weight_tied(name):
    # all the weights of both the text-enc and the text-dec are tied to 
    # each other except for the SA / Causal SA layers
    return name.startswith("text_decoder") and ".attention." not in name


def tie_blip_gradients_for_pruner(named_masked_parameters, blip_model):
    # organize blip model's gradients as a dict
    text_dec_grads_from_model = {k: v.grad for k, v in blip_model.named_parameters() if k.startswith("text_decoder")}
    for name, mask, param in named_masked_parameters:
        if is_blip_text_encoder_weight_tied(name):
            name_in_decoder = name.replace("text_encoder", "text_decoder.bert")
            param.grad += text_dec_grads_from_model[name_in_decoder]
    return named_masked_parameters


def inherit_encoder_decoder_params(named_masked_parameters, blip_model):
    text_dec_masked = {}
    for name, _, param in named_masked_parameters:
        if is_blip_text_encoder_weight_tied(name):
            name_in_decoder = name.replace("text_encoder", "text_decoder.bert")
            text_dec_masked[name_in_decoder] = param
    
    blip_model.load_state_dict(text_dec_masked, strict=False)
    return blip_model


def check_blip_tie(named_masked_parameters, blip_model):
    # arrange blip's weights as a dict
    text_dec_weights_from_model = {k: v for k, v in blip_model.named_parameters() if k.startswith("text_decoder")}
    for name, _, param in named_masked_parameters:
        if is_blip_text_encoder_weight_tied(name):
            name_in_decoder = name.replace("text_encoder", "text_decoder.bert")
            assert torch.allclose(param, text_dec_weights_from_model[name_in_decoder], atol=1e-6), f"BLIP tie check failed for {name}" 


def check_blip_gradients_tie(named_masked_parameters, blip_model):
    # arrange blip's gradients as a dict
    text_dec_grads_from_model = {k: v.grad for k, v in blip_model.named_parameters() if k.startswith("text_decoder")}
    for name, _, param in named_masked_parameters:
        if is_blip_text_encoder_weight_tied(name):
            name_in_decoder = name.replace("text_encoder", "text_decoder.bert")
            assert torch.allclose(param.grad, text_dec_grads_from_model[name_in_decoder], atol=1e-6), f"BLIP gradients tie check failed for {name}"
    

def inherit_encoder_decoder_masks(mask_dict):
    # for every encoder mask, if the weights is tied to the decoder, inherit the mask
    enc_dec_dict = {k: v for k, v in mask_dict.items()}
    for name, mask in mask_dict.items():
        if is_blip_text_encoder_weight_tied(name) and not name.startswith("text_encoder_m"):
            name_in_decoder = name.replace("text_encoder", "text_decoder.bert")
            enc_dec_dict[name_in_decoder] = mask
    return enc_dec_dict


def inherit_encoder_momentum_masks(mask_dict):
    # for every encoder mask, duplicate it for the respective momentum encoder
    enc_momentum_dict = {k: v for k, v in mask_dict.items()}
    for name, mask in mask_dict.items():
        if name.startswith("visual_encoder") and not name.startswith("visual_encoder_m"):
            name_in_momentum = name.replace("visual_encoder", "visual_encoder_m")
            enc_momentum_dict[name_in_momentum] = mask
        elif name.startswith("text_encoder") and not name.startswith("text_encoder_m"):
            name_in_momentum = name.replace("text_encoder", "text_encoder_m")
            enc_momentum_dict[name_in_momentum] = mask
    return enc_momentum_dict


def grab_encoder_from_decoder_module(blip_model, decoder_name):
    name_in_encoder = decoder_name.replace("text_decoder.bert", "text_encoder")
    for name, module in blip_model.named_modules():
        if name == name_in_encoder:
            return module


def check_blip_state_dict(state_dict):
    blip = {k: v for k, v in state_dict.items() if 'visual_encoder' not in k and 'text_encoder_m' not in k}

    for k, v in blip.items():
        if is_blip_text_encoder_weight_tied(k) and 'layer.' in k:
            v_in_decoder = blip[k.replace('text_encoder', 'text_decoder.bert')]
            assert torch.allclose(v, v_in_decoder)