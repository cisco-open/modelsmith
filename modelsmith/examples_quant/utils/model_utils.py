from models.resnet_quant import (
    resnet18,
    resnet34,
    resnet50,
    resnet101,
    resnet152,
    resnext50_32x4d,
    resnext101_32x8d,
    wide_resnet50_2,
    wide_resnet101_2
)
import os
import torch
from collections import OrderedDict

script_dir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')

def prepare_model(model_arch = 'resnet18', device='cpu'):
    print(f'==> Building model {model_arch}...')

    if model_arch in globals():
        model_constructor = globals()[model_arch]
    else:
        raise ValueError(f"No such model architecture: {model_arch}")

    net = model_constructor()
    net = net.to(device)

    checkpoint_path = os.path.join(script_dir, models_checkpoints_dir, f'{model_arch}.pt')
    try:
        checkpoint = torch.load(checkpoint_path, map_location=device)
        new_state_dict = OrderedDict()

        for k, v in checkpoint.items():
            name = k[7:]
            new_state_dict[name] = v
        
        net.load_state_dict(new_state_dict)
        print(f"Loaded checkpoint for {model_arch} from {checkpoint_path}")
    except FileNotFoundError:
        raise FileNotFoundError(f"No checkpoint found for {model_arch} at {checkpoint_path}. Please train the model first.")
    except KeyError:
        raise RuntimeError(f"Checkpoint for {model_arch} at {checkpoint_path} does not have the expected format. Please ensure the checkpoint is correct and try again.")
    
    return net