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
import copy
import os
import argparse
import torch
import torch.nn as nn
import torch.optim
import torch.utils.data
import time
from datetime import datetime

# Define directory paths
script_dir = os.path.dirname(os.path.realpath(__file__))
data_dir = os.path.join(script_dir, 'data')
models_checkpoints_dir = os.path.join(script_dir, 'models_checkpoints')
checkpoint_dir = os.path.join(script_dir, 'checkpoint')
unlearn_dir = os.path.join(checkpoint_dir, 'unlearn')
run_records_dir = os.path.join(script_dir, 'run_records')

sys.path.append(os.path.join(script_dir, '..'))


from collections import OrderedDict
from utils.model_utils import prepare_model
from utils.utils import progress_bar, train, test, setup_seed, setup_dataset
from utils import pruner
from utils.impl import iterative_unlearn
from utils.logger import RunLogger

logger = RunLogger(log_directory=run_records_dir)

def main():
    start_time = time.time()  

    arg_parser = argparse.ArgumentParser(description='PyTorch CIFAR10 Training and Unlearning')
    arg_parser.add_argument('--save-dir', default=unlearn_dir, type=str, help='save directory')
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
    arg_parser.add_argument("--arch", type=str, default="ResNet18", help="model architecture")
    arg_parser.add_argument("--no-l1-epochs", default=0, type=int, help="non l1 epochs")

    args = arg_parser.parse_args()
    logger.set_parameters(vars(args)) 

    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    os.makedirs(args.save_dir, exist_ok=True)

    if args.seed:
        setup_seed(args.seed)

    seed = args.seed
    net = prepare_model(args.arch, device, logger)
    net = net.to(device)

    # prepare dataset
    (
        train_loader_full,
        val_loader,
        test_loader,
        marked_loader,
    ) = setup_dataset(args, logger)
    net.cuda()

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
    logger.log(len(forget_dataset))
    retain_dataset = copy.deepcopy(marked_loader.dataset)
    marked = retain_dataset.targets >= 0
    retain_dataset.data = retain_dataset.data[marked]
    retain_dataset.targets = retain_dataset.targets[marked]
    retain_loader = replace_loader_dataset(
        retain_dataset, seed=seed, shuffle=True
    )
    logger.log(len(retain_dataset))
    assert len(forget_dataset) + len(retain_dataset) == len(
        train_loader_full.dataset
    )

    unlearn_data_loaders = OrderedDict(
        retain=retain_loader, forget=forget_loader, val=val_loader, test=test_loader
    )

    criterion = nn.CrossEntropyLoss()

    evaluation_result = None

    pruner.check_sparsity(net, logger)

    FT_l1(unlearn_data_loaders, net, criterion, args)

    if evaluation_result is None:
        evaluation_result = {}

    if "new_accuracy" not in evaluation_result:
        logger.log('Testing Phase Started')

        accuracy = {}
        for index, (name, loader) in enumerate(unlearn_data_loaders.items()):
            logger.log(f'Test: {index}')
            val_acc = validate(loader, net, criterion, args, test_index=index)
            accuracy[name] = val_acc
            logger.log(f"Statistics: {name}_acc_test_{index}: {val_acc:.2f}")

        evaluation_result["accuracy"] = accuracy

        logger.log('Testing Phase Ended')
    
    logger.log("Finished!")
    end_time = time.time()
    logger.add_statistic("algorithm_key", "MU")
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.add_statistic("execution_date", current_date)
    logger.add_statistic("duration_seconds", end_time - start_time)
    filename = f"MU_{args.arch}"
    saved_file_path = logger.save_run_record(filename) 

    logger.log(f"History of the run saved to: {saved_file_path}")

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
        progress_bar(i, len(train_loader), msg, logger)

    logger.log("train_accuracy {top1.avg:.3f}".format(top1=top1))

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
        progress_bar(i, len(val_loader), msg, logger)

    if test_index is not None:
        logger.log(f"valid_accuracy_test_{test_index}: {top1.avg:.3f}")
    else:
        logger.log(f"valid_accuracy: {top1.avg:.3f}")

    return top1.avg

if __name__ == "__main__":
    main()