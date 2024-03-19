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
import torch.backends.cudnn as cudnn
import torchvision
import torchvision.transforms as transforms

script_dir = os.path.dirname(os.path.realpath(__file__))

data_dir = os.path.join(script_dir, 'data')
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')
checkpoint_dir = os.path.join(script_dir, 'checkpoint')

sys.path.append(os.path.join(script_dir, '..'))

from utils.model_utils import prepare_model
from utils.utils import train, test
from utils.pruner import check_sparsity, grasp_pruning

def main():
    parser = argparse.ArgumentParser(description='Pruning at initialization with Grasp')
    parser.add_argument('--lr', default=0.1, type=float, help='learning rate')
    parser.add_argument('--pruning_ratio', default=0.99, type=float, help='pruning ratio')
    parser.add_argument('--epochs', default=1, type=int, help='number of epochs')
    parser.add_argument('--device', default='cuda' if torch.cuda.is_available() else 'cpu', type=str, help='device to use')
    parser.add_argument('--best_acc', default=0, type=float, help='best test accuracy')
    parser.add_argument('--start_epoch', default=0, type=int, help='start epoch')
    parser.add_argument('--arch', default='ResNet18', type=str, help='Model name')
    
    args = parser.parse_args()

    device = args.device
    best_acc = args.best_acc
    start_epoch = args.start_epoch

    # Preparing data
    print('==> Preparing data..', flush=True)
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

    # Building model
    print('==> Building model..', flush=True)
    net = prepare_model(args.arch, device)

    # Pruning
    grasp_pruning(net, args.pruning_ratio, trainloader, num_class=10)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(net.parameters(), lr=args.lr, momentum=0.9, weight_decay=5e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

    print('# Start Pruning at initialization with Grasp #', flush=True)

    for epoch in range(start_epoch, start_epoch + args.epochs):
        train(epoch, device, net, trainloader, optimizer, criterion)
        test(epoch, device, net, testloader, criterion, best_acc, checkpoint_dir)
        scheduler.step()

    check_sparsity(net)
    print("Finished!", flush=True)

if __name__ == "__main__":
    main()