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

#!/usr/bin/env python
# coding: utf-8

import sys
import os
import argparse
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from copy import deepcopy
import time

# Define directory paths
script_dir = os.path.dirname(os.path.realpath(__file__))
data_dir = os.path.join(script_dir, 'data')
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')
checkpoint_dir = os.path.join(script_dir, 'checkpoint')
run_records_dir = os.path.join(script_dir, 'run_records') 

sys.path.append(os.path.join(script_dir, '..'))

from utils.model_utils import prepare_model
from utils.utils import train, test
from utils.pruner import check_sparsity, pruning_model, prune_model_custom, extract_mask, remove_prune
from utils.logger import RunLogger

logger = RunLogger(log_directory=run_records_dir)

def main():
    start_time = time.time()  

    # Setting up the argument parser
    parser = argparse.ArgumentParser(description='Iterative Magnitude Pruning')
    parser.add_argument('--lr', default=0.1, type=float, help='Learning rate')
    parser.add_argument('--epochs', default=2, type=int, help='Number of epochs for each training period')
    parser.add_argument('--pruning_times', default=3, type=int, help='Number of times to prune')
    parser.add_argument('--pruning_ratio', default=0.2, type=float, help='Pruning ratio')
    parser.add_argument('--rewinding_epoch', default=1, type=int, help='Rewinding epoch to restore weights')
    parser.add_argument('--best_acc', default=0, type=float, help='best test accuracy')
    parser.add_argument('--save_dir', default=models_checkpoints_dir, type=str, help='Directory for saving checkpoints')
    parser.add_argument('--arch', default='ResNet18', type=str, help='Model name')

    args = parser.parse_args()
    logger.set_parameters(vars(args)) 
    best_acc = args.best_acc

    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    # Data preparation
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

    os.makedirs(data_dir, exist_ok=True)

    trainset = torchvision.datasets.CIFAR10(root=data_dir, train=True, download=True, transform=transform_train)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=128, shuffle=True, num_workers=2)

    testset = torchvision.datasets.CIFAR10(root=data_dir, train=False, download=True, transform=transform_test)
    testloader = torch.utils.data.DataLoader(testset, batch_size=100, shuffle=False, num_workers=2)

    # Model setup
    logger.log('==> Building model..')
    net = prepare_model(args.arch, device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(net.parameters(), lr=args.lr, momentum=0.9, weight_decay=5e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

    logger.log('# Start Standard Training Iterative Magnitude Pruning #')

    for state in range(args.pruning_times):
        logger.log('******************************************')
        logger.log(f'Pruning state {state}')
        logger.log('******************************************')

        for epoch in range(args.epochs):
            train(epoch, device, net, trainloader, optimizer, criterion, logger)
            if state == 0 and (epoch + 1) == args.rewinding_epoch:
                torch.save(net.state_dict(), os.path.join(args.save_dir, f'epoch_{epoch + 1}_rewind_weight.pt'))
                rewind_init = deepcopy(net.state_dict())
                
            test(epoch, device, net, testloader, criterion, best_acc, checkpoint_dir, logger)
            scheduler.step()

        # Model pruning and rewinding
        pruning_model(net, args.pruning_ratio)
        current_mask = extract_mask(net.state_dict())
        remove_prune(net)
        net.load_state_dict(rewind_init, strict=True)
        prune_model_custom(net, current_mask)

        optimizer = optim.SGD(net.parameters(), lr=args.lr, momentum=0.9, weight_decay=5e-4)
        scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

        for _ in range(args.rewinding_epoch):
            scheduler.step()

        check_sparsity(net, logger)


    logger.log("Finished!")
    end_time = time.time()
    logger.add_statistic("duration_seconds", end_time - start_time)
    filename = f"IMP_{args.arch}"
    saved_file_path = logger.save_run_record(filename) 

    logger.log(f"History of the run saved to: {saved_file_path}")

if __name__ == "__main__":
    main()