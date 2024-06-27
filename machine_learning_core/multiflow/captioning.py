import argparse
import os
import math
import ruamel.yaml as yaml
import time
import datetime
import json
from functools import partial

import torch
import torch.backends.cudnn as cudnn
import lightning as L

from models import XVLMCaptioning, BLIPCaptioning

import utils
from utils.misc import millions, num_params
from utils.loggers import init_wandb_logger
from utils.functions import get_unprunable_parameters
from utils.prune_utils import make_prunable, stats, named_masked_parameters
from utils.optim import create_optimizer, create_scheduler

from datasets.coco_karpathy_dataset import coco_karpathy_train_collate_fn
from datasets import create_dataset, create_sampler, create_loader

from evaltools import coco_caption_eval


def train(model, data_loader, optimizer, scheduler, epoch, fabric: L.Fabric, config, debug_mode=False):
    
    model.train()
    optimizer.zero_grad()
    
    steps = 0
    steps_per_epoch = math.ceil(len(data_loader.dataset) / (config['batch_size_target']))
    for i, (image, caption, ids) in enumerate(data_loader):

        # forward and backward under appropriate context manager
        is_accumulating = not (((i+1) % config['grad_acc_steps'] == 0) or ((i+1) == len(data_loader)))
        with fabric.no_backward_sync(model, enabled=is_accumulating):
            loss = model(image, caption, already_tokenized=True)
            loss /= config['grad_acc_steps']
            fabric.backward(loss)

        # optimization step
        if not is_accumulating:
            optimizer.step()
            scheduler.step()
            optimizer.zero_grad()
        
            # log on the web
            loss_scalar = loss.item()
            lr_value = optimizer.param_groups[0]["lr"]
            if (steps+1) % config['log_freq'] == 0:
                fabric.log_dict({"loss": loss_scalar, "lr": lr_value})
            
            # log locally
            print(f"[Epoch {epoch+1}] Step = {steps+1} / {steps_per_epoch}\t loss = {loss_scalar}")
            steps += 1

        # if --debug is passed to the main script
        if debug_mode and steps == 16: break



@torch.no_grad()
def evaluation(result_dir, model, data_loader, epoch, fabric: L.Fabric, config, split):
    
    assert split in ("val", "test")
    
    model.eval()
    result = []
    for batch_idx, (image, image_id) in enumerate(data_loader):

        captions = model.generate(
            image, 
            sample=False, 
            num_beams=config['num_beams'], 
            max_length=config['max_length'],
            min_length=config['min_length']
        )

        for caption, img_id in zip(captions, image_id):
            result.append({"image_id": img_id.item(), "caption": caption})

        if ((batch_idx + 1) % config['log_freq'] == 0) or (batch_idx == len(data_loader)-1):
            progress = (batch_idx + 1) / len(data_loader) * 100
            print(f"[({split}) Caption Generation] Batch = {batch_idx+1} / {len(data_loader)} ({progress:.2f}%)")

    # dump on disk the json file containing the 
    # captions generated on each rank
    captions_path = os.path.join(result_dir, f"captioning_{split}_result_epoch{epoch}_rank{fabric.global_rank}.json")
    with open(captions_path, "w") as f:
        json.dump(result, f)
    return result


def merge_eval_from_ranks(result_dir, epoch, fabric, split):
    assert split in ("val", "test")
    
    result = []
    for r in range(fabric.world_size):
        path_for_this_rank = os.path.join(result_dir, f"captioning_{split}_result_epoch{epoch}_rank{r}.json")
        with open(path_for_this_rank, "r") as f:
            r_result = json.load(f)
            result += r_result
    
    result_path = os.path.join(result_dir, f"captioning_{split}_result_epoch{epoch}.json")
    with open(result_path, "w") as f:
        json.dump(result, f)
    return result_path


def cleanup_eval(result_dir, epoch, fabric, split):
    for r in range(fabric.world_size):
        path_for_this_rank = os.path.join(result_dir, f"captioning_{split}_result_epoch{epoch}_rank{r}.json")
        os.remove(path_for_this_rank)


def main(args, config):
    if "16" in args.precision:
        torch.set_float32_matmul_precision(precision="medium")
    elif "32" in args.precision:
        torch.set_float32_matmul_precision(precision="high")

    # setup the loggers before distributing
    loggers = []
    if args.wandb:
        loggers.append(init_wandb_logger(config))

    # initialize distributed mode
    fabric = L.Fabric(
        accelerator="cuda",
        devices=args.devices,
        strategy="ddp",
        precision=args.precision,
        loggers=loggers
    )
    fabric.launch()
    utils.setup_for_distributed(is_master=fabric.is_global_zero)
    
    # setup useful variables
    world_size = fabric.world_size
    global_rank = fabric.global_rank

    # define gradient accumulation steps
    E = config['batch_size_target']
    B = config['batch_size_train']
    config['grad_acc_steps'] = (E // world_size) // B

    # reproducibility settings
    L.seed_everything(args.seed)
    cudnn.benchmark = False
    torch.use_deterministic_algorithms(True)
    
    # model initialization (for this script, I need to initialize the model before the dataloader)
    # since the dataloader will have a collate_fn made with a partial from model data
    print("Creating model...")
    if args.model == "xvlm":
        model = XVLMCaptioning(config=config)
        setattr(model, "name", "xvlm")
    elif args.model == "blip":
        model = BLIPCaptioning(
            image_size=config['image_res'], 
            vit=config['vit'], 
            vit_grad_ckpt=config['vit_grad_ckpt'], 
            vit_ckpt_layer=config['vit_ckpt_layer'], 
            prompt=config['prompt']
        )
        setattr(model, "name", "blip")
    else:
        raise NotImplementedError(f"Model {args.model} not implemented!")


    if not args.dense:
        make_prunable(model, pattern_lock=True, mask_on_the_fly=True)
        # if loading from a pretrained checkpoint after the 1st stage finetuning on the 4M data, it is assumed
        # that the state dict contains the pruning masks (xvlm only)
        if args.model == 'xvlm':
            masks_for_loading = args.mask if not args.load_capt_pretrain else None
        elif args.model == 'blip':
            masks_for_loading = args.mask
        model.load_from_pruned_pretrained(args.pretraining_weights, masks_for_loading, config, args.load_capt_pretrain)
    else:
        model.load_pretrained(args.pretraining_weights, config, load_capt_pretrain=args.load_capt_pretrain)
        # dummy op, but useful to check that the sparsity is 0% with the upcoming lines
        make_prunable(model, pattern_lock=False, mask_on_the_fly=False)

    # log some cute stuff
    print("Total Params: ", millions(num_params(model)))
    masked_params = named_masked_parameters(model, exclude=get_unprunable_parameters(model.name))
    remaining_params, prunable_params = stats(masked_params)
    print(f"Remaining Params = {millions(remaining_params, decimals=2)} / {millions(prunable_params, decimals=2)}", end=" ")
    print(f"({100*remaining_params/prunable_params:.2f}%)")
    
    # datasets initialization
    print("Creating COCO Caption dataset...")
    train_dataset, val_dataset, test_dataset = create_dataset('captioning', config)

    # (distributed) samplers initialization    
    datasets = [train_dataset, val_dataset, test_dataset]
    samplers = create_sampler(
        datasets, 
        shuffles=[True, False, False], 
        num_replicas=world_size, 
        global_rank=global_rank, 
        is_eval=[False, True, True] # this enables DistributedEvalSampler for val and test
    )
    
    # dataloaders initialization
    # NOTE: the collate function already embeds the tokenization process
    train_collate_fn = partial(coco_karpathy_train_collate_fn, tokenizer=model.tokenizer, max_tokens=config['max_tokens'])
    train_loader, val_loader, test_loader = create_loader(
        datasets, 
        samplers,
        batch_size=[config['batch_size_train'], config['batch_size_test'], config['batch_size_test']],
        num_workers=[8, 8, 8], 
        is_trains=[True, False, False],
        collate_fns=[train_collate_fn, None, None]
    )

    # everything about data management is ready, so set it up with fabric
    train_loader, val_loader, test_loader = fabric.setup_dataloaders(train_loader, val_loader, test_loader, use_distributed_sampler=False)
    
    # optimizer initialization
    arg_opt = utils.AttrDict(config['optimizer'])
    optimizer = create_optimizer(arg_opt, model)

    # setup model and optimizer with fabric
    model, optimizer = fabric.setup(model, optimizer)

    # resume from a snapshot if existing
    # NOTE: the code for resuming from a snapshot is given, but it is not tested
    # during the experiments of the main paper, I have never used it
    start_epoch = 0
    start_time = time.time()
    sched_state_dict = None
    if os.path.exists(args.snapshot):
        restored_state = fabric.load(args.snapshot)
        model.load_state_dict(restored_state['model'])
        optimizer.load_state_dict(restored_state['optimizer'])
        sched_state_dict = restored_state['scheduler']
        start_epoch = restored_state['last_epoch'] + 1
        start_time = time.time() - restored_state['elapsed_time']
        print(f"Loaded state, resuming from epoch = {start_epoch}")
        print(
            "IMPORTANT: You are resuming training from a snapshot.\n"
            "As per the README.md, note that while the code for resuming is given, it has not been tested.\n"
            "The authors are not responsible for any issues that may arise from resuming training.\n\n"
        )
    
    # learning rate scheduler initialization
    arg_sche = utils.AttrDict(config['scheduler'])
    steps_per_epoch = math.ceil(len(train_dataset) / config['batch_size_target'])
    num_training_steps = steps_per_epoch * arg_sche['epochs']
    num_warmup_steps = int(num_training_steps * arg_sche['num_warmup_steps'])
    lr_scheduler = create_scheduler(
        mode=arg_sche['sched'], 
        optimizer=optimizer, 
        num_warmup_steps=num_warmup_steps, 
        total_steps=num_training_steps, 
        last_epoch=-1 if sched_state_dict is None else sched_state_dict['last_epoch']-1 
    )
    if sched_state_dict is not None:
        lr_scheduler.load_state_dict(sched_state_dict)

    # start training! :) 
    max_epoch = config['scheduler']['epochs']
    for epoch in range(start_epoch, max_epoch):
        
        # needed to reshuffle the distribution of data among ranks epoch-wise
        train_loader.sampler.set_epoch(epoch)
        val_loader.sampler.set_epoch(epoch)
        test_loader.sampler.set_epoch(epoch)

        # one training epoch
        train(model, train_loader, optimizer, lr_scheduler, epoch, fabric, config, debug_mode=args.debug)

        # save model checkpoint after training for an epoch
        state = {'model': model, 'optimizer': optimizer, 'scheduler': lr_scheduler.state_dict(), 
                 'last_epoch': epoch, 'elapsed_time': time.time() - start_time}
        fabric.save(path=args.snapshot, state=state)

        # evaluate the model
        if epoch >= config['start_eval']:

            # generate captions for the validation set and the test sets
            evaluation(args.result_dir, model, val_loader, epoch, fabric, config, split="val")
            evaluation(args.result_dir, model, test_loader, epoch, fabric, config, split="test")

            # merge the results from all ranks and clean up the json files (only on rank 0 to avoid locking issues)
            fabric.barrier()
            if fabric.is_global_zero:
                val_result_file = merge_eval_from_ranks(args.result_dir, epoch, fabric, split="val")
                cleanup_eval(args.result_dir, epoch, fabric, split="val")
                test_result_file = merge_eval_from_ranks(args.result_dir, epoch, fabric, split="test")
                cleanup_eval(args.result_dir, epoch, fabric, split="test")

                # compute scores using the PyCOCO APIs
                # NOTE: if you pass --skip_eval to the main script, evaluation will not be performed
                # This is useful if you want to evaluate the results on a different machine (my use case during development of the paper) 
                # You are responsible for evaluating these files offline, using the function `coco_caption_eval` from evaltools/ic/__init__.py
                if not args.skip_eval:
                    coco_val = coco_caption_eval(config['val_gt_file'], val_result_file)
                    coco_test = coco_caption_eval(config['test_gt_file'], test_result_file)

                    log_stats = {**{f'val_{k}': round(v*100, 4) for k, v in coco_val.eval.items()},
                                **{f'test_{k}': round(v*100, 4) for k, v in coco_test.eval.items()},
                                'epoch': epoch}
                    fabric.log_dict(log_stats)
                    print(log_stats)
                else:
                    print("Skipping evaluation...")

        # synchronize all processes before the next epoch
        fabric.barrier()

    # final logging and exit
    total_time = time.time() - start_time
    total_time_str = str(datetime.timedelta(seconds=int(total_time)))
    print('Total Finetuning Time for Image Captioning {}'.format(total_time_str))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', required=True, type=str, choices=['xvlm', 'blip'])
    parser.add_argument('-pre', '--pretraining_weights', type=str, required=True)
    parser.add_argument('-m', '--mask', type=str, required=False, 
                        help="Path to the pruning mask to load. If not provided, ensure to pass the --dense flag.")
    parser.add_argument('--dense', action="store_true", default=False, 
                        help="If passed, the dense model will be trained (even if you pass a mask).")
    parser.add_argument('--config', required=True, type=str, 
                        help="Path to the .yaml file containing the configuration for the script. "
                        "For simplicity, you can use the provided .yaml files in the configs/ folder. "
                        "For example, you can use the configs/xvlm/captioning.yaml file for XVLM, and "
                        "the configs/blip/captioning.yaml file for BLIP.")
    parser.add_argument('--skip_eval', action="store_true", default=False, 
                        help="If passed, the evaluation step will be skipped. "
                        "And you fill find the files in the --output_dir folder for both val and test splits. "
                        "Have a look at the `coco_caption_eval` function in evaltools/ic/__init__.py to evaluate the results offline.")
    parser.add_argument('--output_dir', default='experiments/captioning', 
                        help="Path to the output directory where the results will be saved. "
                        "This includes a copy of the config and the json files with the generated captions.")
    parser.add_argument('--snapshot', default="snapshots/captioning.pt", 
                        help="Path to the snapshot file where the model will be saved after each epoch. " 
                        "Set this flag to an existing checkpoint to resume training from that point. "
                        "If the file does not exist, the script will start training from scratch.")
    parser.add_argument('--seed', default=42, type=int, 
                        help="Seed for reproducibility. Default is 42.")
    parser.add_argument('--load_capt_pretrain', action='store_true', 
                        help="If passed, the model will load the weights from a 1epoch pretraining on the 4M dataset. "
                        "XVLM only. Please see the XVLM paper, appendix A.2 for more details.")
    parser.add_argument('-wdb', '--wandb', action="store_true", default=False, 
                        help="Log data onWeights & Biases. Make sure to log to your account first with `wandb login`.")
    parser.add_argument('-exp', '--experiment_name', type=str, required=False, 
                        help="Name of the experiment on Weights & Biases.")
    parser.add_argument('--wdb_offline', action="store_true", 
                        help="Locally cache W&B data instead of logging it to the cloud. You can then sync the run with `wandb sync`.")
    parser.add_argument('--debug', action="store_true", default=False, 
                        help="Enables debugging mode to ensure everything works fine. Only 16 grad steps per epoch are performed.")
    parser.add_argument('--devices', type=int, default=1, 
                        help="Number of devices (i.e., gpus) to use for DistributedDataParallel with Fabric. Default is 1.")
    parser.add_argument('--precision', type=str, default='bf16-mixed', choices=['32-true', 'bf16-mixed', '16-mixed'], 
                        help="Precision strategy to use for training. Default is bf16-mixed (used in the paper).")
    args = parser.parse_args()

    config = yaml.load(open(args.config, 'r'), Loader=yaml.Loader)

    os.makedirs(args.output_dir, exist_ok=True)
    yaml.dump(config, open(os.path.join(args.output_dir, 'config.yaml'), 'w'))
    
    args.result_dir = os.path.join(args.output_dir, 'result')
    os.makedirs(args.result_dir, exist_ok=True)

    # mixup command line arguments and config
    config.update(vars(args))
    main(args, config)