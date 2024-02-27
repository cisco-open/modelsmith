#!/usr/bin/env python
# coding: utf-8

# Import necessary libraries
import sys
import os
import argparse

script_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(script_dir, '..'))

import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from copy import deepcopy
from models import *
from utils.utils import train, test
from utils.pruner import check_sparsity, pruning_model, prune_model_custom, extract_mask, remove_prune

def main():
    # Setting up the argument parser
    parser = argparse.ArgumentParser(description='Iterative Magnitude Pruning')

    # Define arguments
    parser.add_argument('--lr', default=0.1, type=float, help='Learning rate')
    parser.add_argument('--epochs', default=2, type=int, help='Number of epochs for each training period')
    parser.add_argument('--pruning_times', default=3, type=int, help='Set this to 1 if omp is applied')
    parser.add_argument('--pruning_ratio', default=0.2, type=float, help='Pruning ratio')
    parser.add_argument('--rewinding_epoch', default=1, type=int, help='Rewinding epoch')
    parser.add_argument('--save_dir', default='checkpoint', type=str, help='Directory for saving checkpoints')

    # Parse arguments
    args, unknown = parser.parse_known_args()

    if unknown:  # if there are unrecognized arguments
        print(f"Warning: Unrecognized arguments: {' '.join(unknown)}")

    # Extract parameters from parsed arguments
    lr = args.lr
    epochs = args.epochs
    pruning_times = args.pruning_times
    pruning_ratio = args.pruning_ratio
    rewinding_epoch = args.rewinding_epoch
    save_dir = args.save_dir

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    best_acc = 0  
    start_epoch = 0  

    # Data
    print('==> Preparing data..')
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

    trainset = torchvision.datasets.CIFAR10(
        root='./data', train=True, download=True, transform=transform_train)
    trainloader = torch.utils.data.DataLoader(
        trainset, batch_size=128, shuffle=True, num_workers=2)

    testset = torchvision.datasets.CIFAR10(
        root='./data', train=False, download=True, transform=transform_test)
    testloader = torch.utils.data.DataLoader(
        testset, batch_size=100, shuffle=False, num_workers=2)

    # Model
    print('==> Building model..')
    net = ResNet18()
    net = net.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(net.parameters(), lr=lr, momentum=0.9, weight_decay=5e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)

    print('# Start Standard Training Iterative Pruning #')

    for state in range(pruning_times):

        print('******************************************')
        print('pruning state', state)
        print('******************************************')

        for epoch in range(start_epoch, start_epoch+epochs):
            train(epoch, device, net, trainloader, optimizer, criterion)
            if state == 0:
                if (epoch+1) == rewinding_epoch:
                    torch.save(net.state_dict(), os.path.join(save_dir, 'epoch_{}_rewind_weight.pt'.format(epoch+1)))
                    rewind_init = deepcopy(net.state_dict())
            test(epoch, device, net, testloader, criterion, best_acc)
            scheduler.step()

        # model pruning and rewinding
        pruning_model(net, pruning_ratio)
        current_mask = extract_mask(net.state_dict())
        remove_prune(net)

        net.load_state_dict(rewind_init, strict=True)
        prune_model_custom(net, current_mask)

        optimizer = optim.SGD(net.parameters(), lr=lr, momentum=0.9, weight_decay=5e-4)
        scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)

        for _ in range(rewinding_epoch):
            scheduler.step()

        check_sparsity(net)

    print("Finished!")

if __name__ == "__main__":
    main()