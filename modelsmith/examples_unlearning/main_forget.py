import sys
import copy
import os
import argparse
import torch
import torch.nn as nn
import torch.optim
import torch.utils.data

# Define directory paths
script_dir = os.path.dirname(os.path.realpath(__file__))
data_dir = os.path.join(script_dir, 'data')
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')
checkpoint_dir = os.path.join(script_dir, 'checkpoint')
unlearn_dir = os.path.join(checkpoint_dir, 'unlearn')

sys.path.append(os.path.join(script_dir, '..'))

from collections import OrderedDict

from models import *
from utils.utils import progress_bar, train, test, setup_seed, setup_dataset
from utils import pruner
from utils.impl import iterative_unlearn
import time

def main():
    arg_parser = argparse.ArgumentParser(description='PyTorch CIFAR10 Training and Unlearning')
    arg_parser.add_argument('--save-dir', default=unlearn_dir, type=str, help='save directory')
    arg_parser.add_argument('--mask', default=checkpoint_dir + '/ckpt.pth', type=str, help='pretrianed model path')
    arg_parser.add_argument('--num-indexes-to-replace', default=4500, type=int, help='number of indexes to replace')
    arg_parser.add_argument('--alpha', default=5e-4, type=float, help='alpha, the l1 regularization coefficient')
    arg_parser.add_argument('--unlearn_lr', default=0.01, type=float, help='learning rate for unlearning')
    arg_parser.add_argument('--unlearn_epochs', default=2, type=int, help='number of epochs for l1-sparse unlearning')
    arg_parser.add_argument('--seed', default=2, type=int, help='random seed')
    arg_parser.add_argument('--train_seed', default=1, type=int, help='random seed')
    arg_parser.add_argument('--class_to_replace', type=int, default=0, help="Specific class to forget")
    arg_parser.add_argument('--dataset', default='cifar10', type=str, help='dataset')
    arg_parser.add_argument("--batch_size", type=int, default=256, help="batch size")
    arg_parser.add_argument("--lr", default=0.1, type=float, help="initial learning rate")
    arg_parser.add_argument("--momentum", default=0.9, type=float, help="momentum")
    arg_parser.add_argument("--weight_decay", default=5e-4, type=float, help="weight decay")
    arg_parser.add_argument("--num_workers", type=int, default=4)
    arg_parser.add_argument("--data", type=str, default=data_dir, help="location of the data corpus")
    arg_parser.add_argument("--indexes_to_replace", type=list, default=None, help="Specific index data to forget")
    arg_parser.add_argument("--no-aug", action="store_true", default=False, help="No augmentation in training dataset (transformation).")
    arg_parser.add_argument("--workers", type=int, default=4, help="number of workers in dataloader")
    arg_parser.add_argument("--decreasing_lr", default="91,136", help="decreasing strategy")
    arg_parser.add_argument("--rewind_epoch", default=0, type=int, help="rewind checkpoint")
    arg_parser.add_argument("--imagenet_arch", action="store_true", help="architecture for imagenet size samples")
    arg_parser.add_argument("--arch", type=str, default="resnet18", help="model architecture")
    arg_parser.add_argument("--no-l1-epochs", default=0, type=int, help="non l1 epochs")

    args = arg_parser.parse_args()

    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    os.makedirs(args.save_dir, exist_ok=True)

    if args.seed:
        setup_seed(args.seed)

    seed = args.seed
    model = ResNet18()
    model = model.to(device)

    # prepare dataset
    (
        train_loader_full,
        val_loader,
        test_loader,
        marked_loader,
    ) = setup_dataset(args)
    model.cuda()

    def replace_loader_dataset(
        dataset, batch_size=args.batch_size, seed=1, shuffle=True
    ):
        setup_seed(seed)
        return torch.utils.data.DataLoader(
            dataset,
            batch_size=batch_size,
            num_workers=0,
            pin_memory=True,
            shuffle=shuffle,
        )

    forget_dataset = copy.deepcopy(marked_loader.dataset)

    marked = forget_dataset.targets < 0
    forget_dataset.data = forget_dataset.data[marked]
    forget_dataset.targets = -forget_dataset.targets[marked] - 1
    forget_loader = replace_loader_dataset(
        forget_dataset, seed=seed, shuffle=True
    )
    print(len(forget_dataset), flush=True)
    retain_dataset = copy.deepcopy(marked_loader.dataset)
    marked = retain_dataset.targets >= 0
    retain_dataset.data = retain_dataset.data[marked]
    retain_dataset.targets = retain_dataset.targets[marked]
    retain_loader = replace_loader_dataset(
        retain_dataset, seed=seed, shuffle=True
    )
    print(len(retain_dataset), flush=True)
    assert len(forget_dataset) + len(retain_dataset) == len(
        train_loader_full.dataset
    )

    unlearn_data_loaders = OrderedDict(
        retain=retain_loader, forget=forget_loader, val=val_loader, test=test_loader
    )

    criterion = nn.CrossEntropyLoss()

    evaluation_result = None


    checkpoint = torch.load(args.mask, map_location=device)
    if "net" in checkpoint.keys():
        checkpoint = checkpoint["net"]
    if "state_dict" in checkpoint.keys():
        checkpoint = checkpoint["state_dict"]
    model.load_state_dict(checkpoint, strict=True)
    pruner.check_sparsity(model)


    FT_l1(unlearn_data_loaders, model, criterion, args)

    if evaluation_result is None:
        evaluation_result = {}

    if "new_accuracy" not in evaluation_result:
        print('Testing Phase Started', flush=True)

        accuracy = {}
        for index, (name, loader) in enumerate(unlearn_data_loaders.items()):
            print(f'Test: {index}', flush=True)
            val_acc = validate(loader, model, criterion, args, test_index=index)
            accuracy[name] = val_acc
            print(f"Statistics: {name}_acc_test_{index}: {val_acc:.2f}", flush=True)

        evaluation_result["accuracy"] = accuracy

        print('Testing Phase Ended', flush=True)
    
    state = {
            'state_dict': model.state_dict(),
            'eval': evaluation_result,
        }
    torch.save(state, os.path.join(args.save_dir, 'ckpt.pth'))

def l1_regularization(model):
    params_vec = []
    for param in model.parameters():
        params_vec.append(param.view(-1))
    return torch.norm(torch.cat(params_vec), p=1)

@iterative_unlearn
def FT_l1(data_loaders, model, criterion, optimizer, epoch, args):
    return FT_iter(data_loaders, model, criterion, optimizer, epoch, args, with_l1=True)

def FT_iter(data_loaders, model, criterion, optimizer, epoch, args, with_l1=True):
    train_loader = data_loaders["retain"]

    losses = AverageMeter()
    top1 = AverageMeter()

    # switch to train mode
    model.train()

    start = time.time()

    for i, (image, target) in enumerate(train_loader):

        image = image.cuda()
        target = target.cuda()
        if epoch < args.unlearn_epochs - args.no_l1_epochs:
            current_alpha = args.alpha * (
                1 - epoch / (args.unlearn_epochs - args.no_l1_epochs)
            )
            # current_alpha = args.alpha * (epoch / (args.unlearn_epochs-args.no_l1_epochs))
        elif args.unlearn_epochs - args.no_l1_epochs == 0:
            current_alpha = args.alpha
        else:
            current_alpha = 0
        # compute output
        output_clean = model(image)
        loss = criterion(output_clean, target)
        if with_l1:
            loss += current_alpha * l1_regularization(model)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        output = output_clean.float()
        loss = loss.float()
        # measure accuracy and record loss
        prec1 = accuracy(output.data, target)[0]

        losses.update(loss.item(), image.size(0))
        top1.update(prec1.item(), image.size(0))
       
        msg = "Loss: {:.4f} | Acc: {:.3f}%".format(losses.val, top1.val)
        progress_bar(i, len(train_loader), msg)

    print("train_accuracy {top1.avg:.3f}".format(top1=top1), flush=True)

    return top1.avg

class AverageMeter(object):
    """Computes and stores the average and current value"""

    def __init__(self):
        self.reset()

    def reset(self):
        self.val = 0
        self.avg = 0
        self.sum = 0
        self.count = 0

    def update(self, val, n=1):
        self.val = val
        self.sum += val * n
        self.count += n
        self.avg = self.sum / self.count

def accuracy(output, target, topk=(1,)):
    """Computes the precision@k for the specified values of k"""
    maxk = max(topk)
    batch_size = target.size(0)

    _, pred = output.topk(maxk, 1, True, True)
    pred = pred.t()
    correct = pred.eq(target.view(1, -1).expand_as(pred))

    res = []
    for k in topk:
        correct_k = correct[:k].view(-1).float().sum(0)
        res.append(correct_k.mul_(100.0 / batch_size))
    return res

def validate(val_loader, model, criterion, args, test_index=None):
    """
    Run evaluation
    """
    losses = AverageMeter()
    top1 = AverageMeter()

    # switch to evaluate mode
    model.eval()
    for i, (image, target) in enumerate(val_loader):
        image = image.cuda()
        target = target.cuda()

        # compute output
        with torch.no_grad():
            output = model(image)
            loss = criterion(output, target)

        output = output.float()
        loss = loss.float()

        # measure accuracy and record loss
        prec1 = accuracy(output.data, target)[0]
        losses.update(loss.item(), image.size(0))
        top1.update(prec1.item(), image.size(0))

        msg = "Loss: {:.4f} | Acc: {:.3f}%".format(losses.val, top1.val)
        progress_bar(i, len(val_loader), msg)

    if test_index is not None:
        print(f"Statistics: valid_accuracy_test_{test_index}: {top1.avg:.3f}", flush=True)
    else:
        print(f"valid_accuracy: {top1.avg:.3f}", flush=True)

    return top1.avg

if __name__ == "__main__":
    main()