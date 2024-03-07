'''Train CIFAR10 with PyTorch.'''
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

from resnet_quant import (
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
    parser = argparse.ArgumentParser(description='PyTorch CIFAR10 Training')
    parser.add_argument('--lr', default=0.1, type=float, help='learning rate')
    parser.add_argument('--resume', '-r', action='store_true', help='resume from checkpoint')
    parser.add_argument('--epochs', default=200, type=int, help='number of epochs to train')
    parser.add_argument('--arch', default='resnet18', type=str, help='model name')
    args = parser.parse_args()

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    best_acc = 0  # best test accuracy
    start_epoch = 0  # start from epoch 0 or last checkpoint epoch

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

    os.makedirs(data_dir, exist_ok=True)  
    os.makedirs(models_checkpoints_dir, exist_ok=True)  
    os.makedirs(checkpoint_dir, exist_ok=True)

    trainset = torchvision.datasets.CIFAR10(
        root=data_dir, train=True, download=True, transform=transform_train)
    trainloader = torch.utils.data.DataLoader(
        trainset, batch_size=128, shuffle=True, num_workers=2)

    testset = torchvision.datasets.CIFAR10(
        root=data_dir, train=False, download=True, transform=transform_test)
    testloader = torch.utils.data.DataLoader(
        testset, batch_size=100, shuffle=False, num_workers=2)

    print('==> Building model..')
    net = get_model(args.arch)
    net = net.to(device)
    if device == 'cuda':
        net = torch.nn.DataParallel(net)
        cudnn.benchmark = True

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(net.parameters(), lr=args.lr, momentum=0.9, weight_decay=5e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

    if args.resume:
        checkpoint_path = os.path.join(checkpoint_dir, 'ckpt.pth')
        if os.path.isfile(checkpoint_path):
            print('==> Resuming from checkpoint..')
            checkpoint = torch.load(checkpoint_path)
            net.load_state_dict(checkpoint['net'])
            best_acc = checkpoint['acc']
            start_epoch = checkpoint['epoch']

    for epoch in range(start_epoch, start_epoch + args.epochs):
        train(epoch, device, net, trainloader, optimizer, criterion)
        acc = test(epoch, device, net, testloader, criterion, best_acc, checkpoint_dir)
        scheduler.step()

        print('==> Saving checkpoint..')
        state = {
            'net': net.state_dict(),
            'acc': acc,
            'epoch': epoch,
        }
        torch.save(state, os.path.join(checkpoint_dir, 'latest_checkpoint.pth'))

    torch.save(net.state_dict(), os.path.join(models_checkpoints_dir, f'{args.arch}.pt'))

if __name__ == '__main__':
    main()