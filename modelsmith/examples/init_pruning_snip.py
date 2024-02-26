#!/usr/bin/env python
# coding: utf-8

# # Pruning at initialization with Grasp

import sys
import os
import argparse

script_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(script_dir, '..'))

import torch
import torch.nn as nn
import torch.optim as optim
import torch.backends.cudnn as cudnn

import torchvision
import torchvision.transforms as transforms

from models import *
from utils.utils import progress_bar, train, test
from utils.pruner import pruning_model_random, check_sparsity, pruning_model, snip_pruning

def main():
    # In[2]: Argument parser
    parser = argparse.ArgumentParser(description='Pruning at initialization with Snip')
    parser.add_argument('--lr', default=0.1, type=float, help='learning rate')
    parser.add_argument('--pruning_ratio', default=0.99, type=float, help='pruning ratio')
    parser.add_argument('--epochs', default=1, type=int, help='number of epochs')
    parser.add_argument('--device', default='cuda' if torch.cuda.is_available() else 'cpu', type=str, help='device to use')
    parser.add_argument('--best_acc', default=0, type=float, help='best test accuracy')
    parser.add_argument('--start_epoch', default=0, type=int, help='start epoch')

    args, unknown = parser.parse_known_args()

    if unknown:  # if there are unrecognized arguments
        print(f"Warning: Unrecognized arguments: {' '.join(unknown)}", flush=True)

    # Extracting values from arguments
    lr = args.lr
    pruning_ratio = args.pruning_ratio
    epochs = args.epochs
    device = args.device
    best_acc = args.best_acc
    start_epoch = args.start_epoch

    # In[3]:

    print('# Pruning at initialization with Snip #', flush=True)

    # Data
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

    trainset = torchvision.datasets.CIFAR10(
        root='./data', train=True, download=True, transform=transform_train)
    trainloader = torch.utils.data.DataLoader(
        trainset, batch_size=128, shuffle=True, num_workers=2)

    testset = torchvision.datasets.CIFAR10(
        root='./data', train=False, download=True, transform=transform_test)
    testloader = torch.utils.data.DataLoader(
        testset, batch_size=100, shuffle=False, num_workers=2)

    # Model
    print('==> Building model..', flush=True)
    net = ResNet18()
    net = net.to(device)

    # Prune
    snip_pruning(net, pruning_ratio, trainloader, num_class=10)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(net.parameters(), lr=lr,
                        momentum=0.9, weight_decay=5e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)

    for epoch in range(start_epoch, start_epoch+epochs):
        train(epoch, device, net, trainloader, optimizer, criterion)
        test(epoch, device, net, testloader, criterion, best_acc)
        scheduler.step()
    check_sparsity(net)

    print("Finished!", flush=True)

    # In[ ]:

if __name__ == "__main__":
    main()


