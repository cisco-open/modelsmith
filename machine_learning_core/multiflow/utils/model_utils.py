import torch
import ruamel.yaml as yaml


from models import BLIPPretrain, XVLMPretrain

from utils.misc import update_config_for_vit

available_models = ["xvlm", "blip", "dino"]

def model_factory(model_name: str) -> torch.nn.Module:
    r"""Shared access interface for all models. The `model_name` argument switches between models.
    By the time of code release, the function supports 3 values for `model_name`: "xvlm", "blip" and "dino".  
    - "xvlm" initializes an XVLM with a CLIP-ViT-B/16 as the vision encoder. The text encoder is a 6-layer BERT Encoder, while 
    the fusion module is a 6-layer BERT Decoder which cross-attends visual and text latents from both unimodal encoders; 
    By default, the model loads pretraining weights from the 4M Pretraining Dataset for VLMs.
    - "blip" initializes a BLIP-Base model, with a ViT-B/16 and a 12-layer BERT Encoder and a 12-layer BERT Decoder which comprise the 
    MED (Multimodal Mixture of Encoder-Decoder networks). The weights of this model results from 14M Pretraining;  
    - "dino" initializes a ViT-B/16 pretrained with the DINO method from Meta AI.
    """

    if model_name == "xvlm":
        # initialize the config for XVLM
        config_path = 'configs/xvlm/pretrain_xvlm_base_4m.yaml'
        config = yaml.load(open(config_path, 'r'), Loader=yaml.Loader)

        # the default config would initialize an XVLM-Swin, while the repo always uses XVLM-ClipViT
        config = update_config_for_vit(config)
        pretraining_weights = 'weights/4m-xvlm-vit-bert.pth'

        # load weights from the 4M pretraining
        model = XVLMPretrain(config)
        pretraining_weights = torch.load(pretraining_weights, map_location="cpu")['model']
        model.load_state_dict(pretraining_weights, strict=False)
        
        # FIXME: define a 'property' within the model in-place of this manual attribute assignment
        setattr(model, 'dtype', torch.float32)
        setattr(model, 'is_vlm', True)
        setattr(model, 'needs_tie', False)
    
    elif model_name == "blip":
        config_path = 'configs/blip/pretrain_blip_base_14m.yaml'
        config = yaml.load(open(config_path, 'r'), Loader=yaml.Loader)
        model = BLIPPretrain(
            image_size=config['image_res'], 
            vit=config['vit'], 
            vit_grad_ckpt=config['vit_grad_ckpt'], 
            vit_ckpt_layer=config['vit_ckpt_layer'], 
            queue_size=config['queue_size']
        )

        pretraining_weights = 'weights/14m-blip-vitB.pth'
        pretraining_weights = torch.load(pretraining_weights, map_location="cpu")['model']
        msg = model.load_state_dict(pretraining_weights, strict=False)
        print(f"{'='*50} Loaded BLIP ViT-B weights {'='*50}")
        print("missing keys:", msg.missing_keys)
        print("unexpected keys:", msg.unexpected_keys, end="\n\n")
        
        # FIXME: define a 'property' within the model in-place of this manual attribute assignment
        setattr(model, 'dtype', torch.float32)
        setattr(model, 'is_vlm', True)
        setattr(model, 'needs_tie', True)

    elif model_name == "dino":
        # some models can easily be initialized from the HF hub :)
        from transformers import ViTForImageClassification
        model = ViTForImageClassification.from_pretrained("facebook/dino-vitb16", num_labels=1000)
        setattr(model, 'is_vlm', False)
        setattr(model, 'needs_tie', False)

    else:
        raise NotImplementedError(
            f"Model {model_name} not implemented. Please add it to the factory yourself."
        )

    # IMPORTANT: do NOT remove this line! It injects a "name" attribute into each Module, which is then used by all pruners to switch 
    # between various function implementations.  
    setattr(model, 'name', model_name)
    return model