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

import os
import sys
import time

import numpy as np
import torch

from utils.pruner import extract_mask, prune_model_custom, remove_prune

sys.path.append(".")

def _iterative_unlearn_impl(unlearn_iter_func, logger):
    def _wrapped(data_loaders, model, criterion, args):
        decreasing_lr = list(map(int, args.decreasing_lr.split(",")))
        if args.rewind_epoch != 0:
            initialization = torch.load(
                args.rewind_pth, map_location=torch.device("cuda:" + str(args.gpu))
            )
            current_mask = extract_mask(model.state_dict())
            remove_prune(model)
            # weight rewinding
            # rewind, initialization is a full model architecture without masks
            model.load_state_dict(initialization, strict=True)
            prune_model_custom(model, current_mask)
        optimizer = torch.optim.SGD(
            model.parameters(),
            args.unlearn_lr,
            momentum=args.momentum,
            weight_decay=args.weight_decay,
        )
        if args.imagenet_arch and args.unlearn == "retrain":
            lambda0 = (
                lambda cur_iter: (cur_iter + 1) / args.warmup
                if cur_iter < args.warmup
                else (
                    0.5
                    * (
                        1.0
                        + np.cos(
                            np.pi
                            * (
                                (cur_iter - args.warmup)
                                / (args.unlearn_epochs - args.warmup)
                            )
                        )
                    )
                )
            )
            scheduler = torch.optim.lr_scheduler.LambdaLR(optimizer, lr_lambda=lambda0)
        else:
            scheduler = torch.optim.lr_scheduler.MultiStepLR(
                optimizer, milestones=decreasing_lr, gamma=0.1
            )  # 0.1 is fixed
        if args.arch == "swin_t":
            optimizer = torch.optim.Adam(model.parameters(), args.unlearn_lr)
            scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
                optimizer, args.unlearn_epochs
            )
        if args.rewind_epoch != 0:
            # learning rate rewinding
            for _ in range(args.rewind_epoch):
                scheduler.step()
        for epoch in range(0, args.unlearn_epochs):
            start_time = time.time()
            logger.log("Epoch: {}".format(epoch))
            train_acc = unlearn_iter_func(
                data_loaders, model, criterion, optimizer, epoch, args
            )
            scheduler.step()

            logger.log("one epoch duration:{}".format(time.time() - start_time))

    return _wrapped


def iterative_unlearn(logger):
    """usage:

    @iterative_unlearn(logger)

    def func(data_loaders, model, criterion, optimizer, epoch, args, logger)"""
    def decorator(func):
        return _iterative_unlearn_impl(func, logger)
    return decorator