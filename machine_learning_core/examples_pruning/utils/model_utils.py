#    Copyright 2024 Cisco Systems, Inc. and its affiliates

#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at

#        http://www.apache.org/licenses/LICENSE-2.0

#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

#   SPDX-License-Identifier: Apache-2.0

from models.resnet import (
    ResNet18,
    ResNet34,
    ResNet50,
    ResNet101,
    ResNet152,
)

from models.vgg import (
    VGG11,
    VGG13,
    VGG16,
    VGG19,
)

import os
import torch
from collections import OrderedDict

script_dir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')

def prepare_model(model_arch='resnet18', device='cpu', logger=None):
    logger.log(f'==> Building model {model_arch}...')

    if model_arch in globals():
        model_constructor = globals()[model_arch]
    else:
        logger.log(f"Error: No such model architecture: {model_arch}")
        raise ValueError(f"No such model architecture: {model_arch}")

    net = model_constructor()
    net = net.to(device)

    checkpoint_path = os.path.join(models_checkpoints_dir, f'{model_arch}.pt')
    try:
        checkpoint = torch.load(checkpoint_path, map_location=device)
        new_state_dict = OrderedDict()

        for k, v in checkpoint.items():
            name = k[7:] if k.startswith('module.') else k  
            new_state_dict[name] = v
        
        logger.log(f"Model state dict keys: {net.state_dict().keys()}")
        logger.log(f"Checkpoint state dict keys: {new_state_dict.keys()}")

        missing_keys, unexpected_keys = net.load_state_dict(new_state_dict, strict=False)
        
        if missing_keys:
            logger.log(f"Missing keys when loading state dict: {missing_keys}")
        if unexpected_keys:
            logger.log(f"Unexpected keys when loading state dict: {unexpected_keys}")

        logger.log(f"Loaded checkpoint for {model_arch} from {checkpoint_path}")
    except FileNotFoundError:
        error_msg = f"No checkpoint found for {model_arch} at {checkpoint_path}. Please train the model first."
        logger.log(error_msg)
        raise FileNotFoundError(error_msg)
    except KeyError as e:
        error_msg = f"Checkpoint for {model_arch} at {checkpoint_path} does not have the expected format: {e}. Please ensure the checkpoint is correct and try again."
        logger.log(error_msg)
        raise RuntimeError(error_msg)
    
    return net