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

'''Train CIFAR10 with PyTorch for pruning.'''
import sys
import os
import argparse
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import torch.backends.cudnn as cudnn
import torchvision
import torchvision.transforms as transforms

script_dir = os.path.dirname(os.path.abspath(__file__))

data_dir = os.path.join(script_dir, 'data')
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')
checkpoint_dir = os.path.join(script_dir, 'checkpoint') 

sys.path.append(os.path.abspath(os.path.join(script_dir, '..', 'models')))
sys.path.append(os.path.abspath(os.path.join(script_dir, '..', 'utils')))

from resnet import (
    ResNet18,
    ResNet34,
    ResNet50,
    ResNet101,
    ResNet152,
)

from vgg import (
    VGG11,
    VGG13,
    VGG16,
    VGG19,
)

from utils import train, test

def get_model(arch):
    """
    Dynamically import and return the network architecture based on the provided argument.
    """
    if arch in globals():
        return globals()[arch]()
    else:
        raise ValueError(f"Unsupported model: {arch}")

def main():
    parser = argparse.ArgumentParser(description='PyTorch CIFAR10 Training for Pruning')
    parser.add_argument('--lr', default=0.1, type=float, help='learning rate')
    parser.add_argument('--resume', '-r', action='store_true', help='resume from checkpoint')
    parser.add_argument('--epochs', default=200, type=int, help='number of epochs to train')
    parser.add_argument('--arch', default='ResNet18', type=str, help='Model name')
    args = parser.parse_args()

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    best_acc = 0  # best test accuracy
    start_epoch = 0  # start from epoch 0 or last checkpoint epoch
    
    # Data preparation
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

    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(models_checkpoints_dir, exist_ok=True)
    os.makedirs(checkpoint_dir, exist_ok=True)

    trainset = torchvision.datasets.CIFAR10(root=data_dir, train=True, download=True, transform=transform_train)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=128, shuffle=True, num_workers=2)

    testset = torchvision.datasets.CIFAR10(root=data_dir, train=False, download=True, transform=transform_test)
    testloader = torch.utils.data.DataLoader(testset, batch_size=100, shuffle=False, num_workers=2)

    # Model
    print('==> Building model..')
    net = get_model(args.arch)
    net = net.to(device)
    if device == 'cuda':
        net = torch.nn.DataParallel(net)
        cudnn.benchmark = True

    if args.resume:
        print('==> Resuming from checkpoint..')
        checkpoint_path = os.path.join(checkpoint_dir, 'ckpt.pth')
        assert os.path.isfile(checkpoint_path), 'Error: no checkpoint file found!'
        checkpoint = torch.load(checkpoint_path)
        net.load_state_dict(checkpoint['net'])
        best_acc = checkpoint['acc']
        start_epoch = checkpoint['epoch']

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(net.parameters(), lr=args.lr, momentum=0.9, weight_decay=5e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

    for epoch in range(start_epoch, start_epoch + args.epochs):
        train(epoch, device, net, trainloader, optimizer, criterion)
        test(epoch, device, net, testloader, criterion, best_acc, checkpoint_dir)
        scheduler.step()
    
    torch.save(net.state_dict(), os.path.join(models_checkpoints_dir, f'{args.arch}.pt'))

if __name__ == '__main__':
    main()