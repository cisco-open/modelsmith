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

import sys
import os
import argparse
import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import time
from datetime import datetime

# Define directory paths
script_dir = os.path.dirname(os.path.realpath(__file__))
data_dir = os.path.join(script_dir, 'data')
checkpoint_dir = os.path.join(script_dir, 'checkpoint')
run_records_dir = os.path.join(script_dir, 'run_records') 

sys.path.append(os.path.join(script_dir, '..'))

import random
import numpy as np

from utils.model_utils import prepare_model
from utils.utils import evaluate_accuracy_quant, test
from utils.quant import (
    block_reconstruction,
    layer_reconstruction,
    BaseQuantBlock,
    QuantModule,
    QuantModel,
    set_weight_quantize_params,
    set_act_quantize_params,
)
from utils.logger import RunLogger

logger = RunLogger(log_directory=run_records_dir)

#%%
lr = 0.1
pruning_ratio = 0.99
epochs = 1
device = 'cuda' if torch.cuda.is_available() else 'cpu'
best_acc = 0  # best test accuracy
start_epoch = 0  # start from epoch 0 or last checkpoint epoch

def seed_all(seed=1029):
    random.seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)  # if you are using multi-GPU.
    torch.backends.cudnn.benchmark = False
    torch.backends.cudnn.deterministic = True

def prepare_data(dataset='cifar10', batch_size=128, workers=2):
    # Data
    logger.log('==> Preparing data..')
    transform_train = transforms.Compose([
        transforms.RandomCrop(32, padding=4),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),
    ])

    transform_test = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),
    ])

    if dataset == 'cifar10':
        logger.log('==> Preparing cifar10..')
        trainset = torchvision.datasets.CIFAR10(
            root=data_dir, train=True, download=True, transform=transform_train)
        trainloader = torch.utils.data.DataLoader(
            trainset, batch_size=batch_size, shuffle=True, num_workers=workers)

        testset = torchvision.datasets.CIFAR10(
            root=data_dir, train=False, download=True, transform=transform_test)
        testloader = torch.utils.data.DataLoader(
            testset, batch_size=batch_size, shuffle=False, num_workers=workers)
    elif dataset == 'cifar100':
        logger.log('==> Preparing cifar100..')
        trainset = torchvision.datasets.CIFAR100(
            root=data_dir, train=True, download=True, transform=transform_train)
        trainloader = torch.utils.data.DataLoader(
            trainset, batch_size=batch_size, shuffle=True, num_workers=workers)

        testset = torchvision.datasets.CIFAR100(
            root=data_dir, train=False, download=True, transform=transform_test)
        testloader = torch.utils.data.DataLoader(
            testset, batch_size=batch_size, shuffle=False, num_workers=workers)
    else:
        logger.log('No corresponding datasets')
    return trainloader, testloader

def get_calibration_samples(train_loader, num_samples):
    train_data, target = [], []
    for batch in train_loader:
        train_data.append(batch[0])
        target.append(batch[1])
        if len(train_data) * batch[0].size(0) >= num_samples:
            break
    return torch.cat(train_data, dim=0)[:num_samples], torch.cat(target, dim=0)[:num_samples]

if __name__ == '__main__':
    start_time = time.time()  

    parser = argparse.ArgumentParser(description='running parameters',
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    # general parameters for data and model
    parser.add_argument('--seed', default=1005, type=int, help='random seed for results reproduction')
    parser.add_argument('--dataset', default='cifar10', type=str, help='dataset name', choices=['cifar10', 'cifar100'])
    parser.add_argument('--arch', default='resnet18', type=str, help='Model name')
    parser.add_argument('--batch_size', default=128, type=int, help='mini-batch size for data loader')
    parser.add_argument('--workers', default=4, type=int, help='number of workers for data loader')

    # quantization parameters
    parser.add_argument('--n_bits_w', default=4, type=int, help='bitwidth for weight quantization')
    parser.add_argument('--channel_wise', action='store_true', help='apply channel_wise quantization for weights')
    parser.add_argument('--n_bits_a', default=4, type=int, help='bitwidth for activation quantization')
    parser.add_argument('--act_quant', action='store_true', help='apply activation quantization')
    parser.add_argument('--disable_8bit_head_stem', action='store_true')

    # weight calibration parameters
    parser.add_argument('--num_samples', default=1024, type=int, help='size of the calibration dataset')
    parser.add_argument('--iters_w', default=20000, type=int, help='number of iteration for adaround')
    parser.add_argument('--weight', default=0.01, type=float, help='weight of rounding cost vs the reconstruction loss.')
    parser.add_argument('--keep_cpu', action='store_true', help='keep the calibration data on cpu')

    parser.add_argument('--wwq', action='store_false', help='weight_quant for input in weight reconstruction')
    parser.add_argument('--waq', action='store_true', help='act_quant for input in weight reconstruction')

    parser.add_argument('--b_start', default=20, type=int, help='temperature at the beginning of calibration')
    parser.add_argument('--b_end', default=2, type=int, help='temperature at the end of calibration')
    parser.add_argument('--warmup', default=0.2, type=float, help='in the warmup period no regularization is applied')

    # activation calibration parameters
    parser.add_argument('--lr', default=4e-5, type=float, help='learning rate for LSQ')

    parser.add_argument('--awq', action='store_true', help='weight_quant for input in activation reconstruction')
    parser.add_argument('--aaq', action='store_true', help='act_quant for input in activation reconstruction')

    parser.add_argument('--init_wmode', default='mse', type=str, choices=['minmax', 'mse', 'minmax_scale'],
                        help='init opt mode for weight')
    parser.add_argument('--init_amode', default='mse', type=str, choices=['minmax', 'mse', 'minmax_scale'],
                        help='init opt mode for activation')
    # order parameters
    parser.add_argument('--order', default='before', type=str, choices=['before', 'after', 'together'], help='order about activation compare to weight')
    parser.add_argument('--prob', default=1.0, type=float)
    parser.add_argument('--input_prob', default=1.0, type=float)
    
    args, unknown_args = parser.parse_known_args()
    logger.set_parameters(vars(args)) 

    if unknown_args:
        logger.log(f"Warning: Unrecognized arguments {' '.join(unknown_args)}. These will be ignored.")

    seed_all(args.seed)
    # build imagenet data loader
    train_loader, test_loader = prepare_data(dataset=args.dataset, batch_size=args.batch_size, workers=args.workers)
    # load model
    cnn = prepare_model(args.arch, device, logger)
    cnn.cuda()
    cnn.eval()

    # build quantization parameters
    wq_params = {'n_bits': args.n_bits_w, 'channel_wise': args.channel_wise, 'scale_method': args.init_wmode}
    aq_params = {'n_bits': args.n_bits_a, 'channel_wise': False, 'scale_method': args.init_amode,
                 'leaf_param': True, 'prob': args.prob}

    qnn = QuantModel(model=cnn, weight_quant_params=wq_params, act_quant_params=aq_params)
    qnn.cuda()
    qnn.eval()
    if not args.disable_8bit_head_stem:
        logger.log('Setting the first and the last layer to 8-bit')
        qnn.set_first_last_layer_to_8bit()

    qnn.disable_network_output_quantization()
    logger.log('check the model!')
    logger.log(qnn)
    cali_data, cali_target = get_calibration_samples(train_loader, num_samples=args.num_samples)
    print(cali_data.shape, flush=True)
    device = next(qnn.parameters()).device
    # print('the quantized model is below!')
    # Kwargs for weight rounding calibration
   
    kwargs = dict(cali_data=cali_data, iters=args.iters_w, weight=args.weight,
                  b_range=(args.b_start, args.b_end), warmup=args.warmup, opt_mode='mse',
                  wwq=args.wwq, waq=args.waq, order=args.order, act_quant=args.act_quant,
                  lr=args.lr, input_prob=args.input_prob, keep_gpu=not args.keep_cpu)

    if args.act_quant and args.order == 'before' and args.awq is False:
        '''Case 2'''
        set_act_quantize_params(qnn, cali_data=cali_data, awq=args.awq, order=args.order)

    '''init weight quantizer'''
    set_weight_quantize_params(qnn, logger)

    def set_weight_act_quantize_params(module):
        if isinstance(module, QuantModule):
            layer_reconstruction(qnn, module, **kwargs, logger=logger)
            evaluate_accuracy_quant(device, qnn, test_loader, logger=logger)
        elif isinstance(module, BaseQuantBlock):
            block_reconstruction(qnn, module, **kwargs, logger=logger)
            evaluate_accuracy_quant(device, qnn, test_loader, logger=logger)
        else:
            raise NotImplementedError

    def recon_model(model: nn.Module):
        """
        Block reconstruction. For the first and last layers, we can only apply layer reconstruction.
        """
        for name, module in model.named_children():
            if isinstance(module, QuantModule):
                logger.log('Reconstruction for layer {}'.format(name))
                set_weight_act_quantize_params(module)
            elif isinstance(module, BaseQuantBlock):
                logger.log('Reconstruction for block {}'.format(name))
                set_weight_act_quantize_params(module)
            else:
                recon_model(module)
    # Start calibration
    recon_model(qnn)

    if args.act_quant and args.order == 'after' and args.waq is False:
        '''Case 1'''
        set_act_quantize_params(qnn, cali_data=cali_data, awq=args.awq, order=args.order)

    qnn.set_quant_state(weight_quant=True, act_quant=args.act_quant)
    criterion = nn.CrossEntropyLoss()
    logger.log('Full quantization (W{}A{}) accuracy: {}'.format(args.n_bits_w, args.n_bits_a, test(0, device, qnn, test_loader, criterion, best_acc, checkpoint_dir, logger)))

    logger.log("Finished!")
    end_time = time.time()
    logger.add_statistic("algorithm_key", "MINMAXPTQ")
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.add_statistic("execution_date", current_date)
    logger.add_statistic("duration_seconds", end_time - start_time)
    filename = f"MINMAXPTQ_{args.arch}"
    saved_file_path = logger.save_run_record(filename) 

    logger.log(f"History of the run saved to: {saved_file_path}")
