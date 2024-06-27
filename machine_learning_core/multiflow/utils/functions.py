import torch


def percentile(scores, sparsity):
    k = 1 + round(sparsity * scores.numel())
    threshold, _ = torch.kthvalue(scores.view(-1), k)
    return threshold


class GetTopSubnet(torch.autograd.Function):
    @staticmethod
    def forward(ctx, scores, zeros, ones, threshold=None):
        return torch.where(scores <= threshold, zeros.to(scores.device), ones.to(scores.device))

    @staticmethod
    def backward(ctx, g):
        return g, None, None, None
    
    
class GetBottomSubnet(torch.autograd.Function):
    @staticmethod
    def forward(ctx, scores, zeros, ones, sparsity):
        # this inverts the behaviour of GetTopSubnet, i.e. 
        # if GetTopSubnet returns the mask of the top (1-sparsity) scores, GetBottomSubnet 
        # applies a logical not to the mask of the bottom (1-sparsity) scores
        kth_val = percentile(scores, sparsity)
        return torch.where(scores > kth_val, zeros.to(scores.device), ones.to(scores.device))

    @staticmethod
    def backward(ctx, g):
        return -g, None, None, None


def xvlm_detect_modality_fn(param_name, return_layer_idx=False):
    if param_name.startswith('vision_encoder'):
        modality = 'vision'
        layer = int(param_name.split('.')[3])
    elif param_name.startswith('text_encoder'):
        layer = int(param_name.split('.')[4])
        if layer > 5:
            modality = 'fusion'
        else:
            modality = 'text'
    
    if return_layer_idx:
        return modality, layer
    return modality


def blip_detect_modality_fn(param_name, return_layer_idx=False):
    if param_name.startswith('visual_encoder'):
        modality = 'vision'
        layer_idx = int(param_name.split('.')[2])
    elif param_name.startswith('text'):
        modality = 'text'
        if param_name.startswith('text_encoder'):
            layer_idx = int(param_name.split('.')[3])
        elif param_name.startswith('text_decoder'):
            layer_idx = int(param_name.split('.')[4])
    
    if return_layer_idx:
        return modality, layer_idx
    return modality


def vit_detect_modality_fn(param_name, return_layer_idx=False):
    modality = 'vision'
    if return_layer_idx:
        if "patch_embeddings.projection" not in param_name:
            layer_idx = int(param_name.split('.')[3])
        else:
            layer_idx = -1
        return modality, layer_idx
    return modality
        


def detect_modality_fn(model_name, param_name, return_layer_idx=False):
    if model_name == 'xvlm':
        return xvlm_detect_modality_fn(param_name, return_layer_idx)
    elif model_name == 'blip':
        return blip_detect_modality_fn(param_name, return_layer_idx)
    elif model_name == 'dino':
        return vit_detect_modality_fn(param_name, return_layer_idx)
    else:
        raise NotImplementedError(f"Modality detection for {model_name} not implemented")



def get_unprunable_parameters(model_name):
    if model_name == "xvlm":
        return ['vision_proj', 'text_proj', 'itm_head', 'bbox_head', 'text_encoder.cls']
    elif model_name == "blip":
        return ['vision_proj', 'text_proj', 'itm_head', 'visual_encoder_m', 'text_encoder_m', 'cls.predictions']
    elif model_name == "dino":
        return ['classifier']
    else:
        raise NotImplementedError(f"Unprunable parameters for {model_name} not implemented")