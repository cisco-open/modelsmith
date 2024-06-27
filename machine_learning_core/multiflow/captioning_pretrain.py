import os
import argparse

import math
import time
import datetime
import ruamel.yaml as yaml

import torch
import torch.backends.cudnn as cudnn

from models import XVLMCaptioningPretrain as XVLM

import utils
from utils.misc import millions, num_params
from utils.prune_utils import make_prunable, stats, named_masked_parameters
from utils.loggers import init_wandb_logger

from utils.scheduler import create_scheduler
from utils.optim import create_optimizer
from datasets import create_dataset, create_loader

import lightning as L


def train(model, 
          loader, 
          optimizer, 
          scheduler, 
          fabric: L.Fabric, 
          config: dict, 
          snapshot_path: str, 
          in_time: float = None,
          debug: bool = False
          ):
    
    model.train()
    optimizer.zero_grad()

    steps = 0
    in_time = time.time() if not in_time else in_time
    
    for i, (images, texts, atts) in enumerate(loader):
        
        # define if the current iteration should be a gradient step
        is_accumulating = not ((i+1) % config['grad_acc_steps'] == 0 or (i+1) == len(loader))
        
        # forward and backward pass
        with fabric.no_backward_sync(model, enabled=is_accumulating):
            loss = model(images, text_ids=texts, text_atts=atts)
            loss /= config['grad_acc_steps']
            fabric.backward(loss)

        if not is_accumulating:
            # pretraining on the 4M dataset uses gradient clipping
            fabric.clip_gradients(model, optimizer, max_norm=config['clip_grad_norm'], error_if_nonfinite=False)
            optimizer.step()
            scheduler.step()
            optimizer.zero_grad()
            
            # log both on the web and locally
            loss_scalar = loss.item()
            fabric.log_dict({"loss": loss_scalar, "step": steps, "lr": optimizer.param_groups[0]["lr"]})
            print(f"Batch {i}/{len(loader)}:\t loss = {loss_scalar}\t step = {steps}")
            
            # saving training snapshot if needed
            if (steps+1) % config['save_freq'] == 0:
                state = {'model': model, 'optimizer': optimizer, 'scheduler': scheduler.state_dict(), 
                         'last_step': steps, 'elapsed_time': time.time() - in_time}
                fabric.save(snapshot_path, state)
            steps += 1
        
        # enable debug mode
        if debug and steps > 64: break
    
    # when training is finished, save the last state
    state = {
        'model': model, 
        'optimizer': optimizer, 
        'scheduler': scheduler.state_dict(), 
        'last_step': steps, 
        'elapsed_time': time.time() - in_time
    }
    snapshot_dir = os.path.dirname(snapshot_path)
    fabric.save(os.path.join(snapshot_dir, "last.pt"), state)
    print("Finished train function.")
    return


def main(args, config):
    
    if "16" in args.precision:
        torch.set_float32_matmul_precision("medium")
    elif "32" in args.precision:
        torch.set_float32_matmul_precision("high")
    
    loggers = []
    if args.wandb:
        loggers.append(init_wandb_logger(config))

    # initialize distributed mode with fabric
    fabric = L.Fabric(
        accelerator="cuda",
        devices=args.devices,
        strategy="ddp",
        precision=args.precision,
        loggers=loggers,
    )
    fabric.launch()
    utils.setup_for_distributed(is_master=fabric.is_global_zero)

    # define gradient accumulation steps
    E = config['batch_size_target']
    B = config['batch_size_train']
    config['grad_acc_steps'] = (E // fabric.world_size) // B
    
    # set seed for reproducibility
    L.seed_everything(args.seed)
    cudnn.benchmark = False
    torch.use_deterministic_algorithms(True)
    
    # initialize the dataset and the dataloader
    dataset = create_dataset('captioning_pretrain', config)
    [loader] = create_loader(
        datasets=[dataset],
        samplers=[None],
        batch_size=[config['batch_size_train']],
        num_workers=[8],
        is_trains=[True],
        collate_fns=[None]
    )
    # set the loader up with fabric s.t. it gets a distributed sampler and automatic device placement
    loader = fabric.setup_dataloaders(loader, use_distributed_sampler=True)
    
    # model initialization
    config['pad_token_id'] = dataset.pad_token_id
    model = XVLM(config=config)
    setattr(model, "name", "xvlm")

    # load both weights and fixed pruning masks
    if not args.dense:
        make_prunable(model, pattern_lock=True, mask_on_the_fly=True)
        model.load_from_pruned_pretrained(args.pretraining_weights, args.mask, config, verbose=True)
    else:
        # dummy call, useful to check the sparsity is really 0%
        make_prunable(model, pattern_lock=False, mask_on_the_fly=False)
        model.load_pretrained(args.pretraining_weights, config)

    # log the current situation regarding the parameters
    print(f"Total Params: {millions(num_params(model)):.2f}M")
    
    # log some stats regarding the pruned parameters
    remaining_params, total_params = stats(named_masked_parameters(model, exclude=['cls.predictions', 'text_proj', 'vision_proj', 'itm_head']))
    print(f"Remaining params: {millions(remaining_params, decimals=2)} / {millions(total_params, decimals=2)} ({remaining_params/total_params*100:.2f}%)")

    # optimizer initialization
    arg_opt = utils.AttrDict(config['optimizer'])
    optimizer = create_optimizer(arg_opt, model)
    
    # setup everything with fabric
    model, optimizer = fabric.setup(model, optimizer)

    # resume from a snapshot if existing
    # NOTE: code for resuming from a snapshot is not tested, I have not used it for the results of the main paper
    start_time = time.time()
    sched_state_dict = None
    if os.path.exists(args.snapshot):
        restored_state = fabric.load(args.snapshot)
        model.load_state_dict(restored_state['model'])
        optimizer.load_state_dict(restored_state['optimizer'])
        sched_state_dict = restored_state['scheduler']
        start_step = restored_state['last_step'] + 1
        start_time = time.time() - restored_state['elapsed_time']
        print(f"Loaded state, resuming from step = {start_step}")    

    # scheduler initialization
    arg_sche = utils.AttrDict(config['scheduler'])
    arg_sche['step_per_epoch'] = math.ceil(len(dataset) / (config['batch_size_target']))
    if sched_state_dict:
        lr_scheduler = create_scheduler(arg_sche, optimizer, last_epoch=sched_state_dict['last_epoch']-1)
        lr_scheduler.load_state_dict(sched_state_dict)
    else:
        lr_scheduler = create_scheduler(arg_sche, optimizer)

    # 1epoch pretraining on the 4M dataset
    print("Start training")
    train(
        model, 
        loader, 
        optimizer, 
        lr_scheduler, 
        fabric, 
        config,
        snapshot_path=args.snapshot,
        in_time=start_time,
        debug=args.debug
    )

    # when training ends, save the final model to the experiment folder
    final_model_path = os.path.join(args.output_dir, 'pretrained.pt')
    if fabric.is_global_zero:
        torch.save(obj=model.state_dict(), f=final_model_path)
    print(f"Saved final model to {final_model_path}. Use these weights for the 2nd stage (--load_capt_pretrain in captioning.py).")
    
    # nice log end exit
    total_time = time.time() - start_time
    total_time_str = str(datetime.timedelta(seconds=int(total_time)))
    print('Total time for 1st Stage Captioning Finetuning {}'.format(total_time_str))

    
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', type=str, required=False, default='configs/xvlm/captioning_pretrain.yaml', 
                        help='Path to the configuration file. Default: configs/xvlm/captioning_pretrain.yaml')
    parser.add_argument('-pre', '--pretraining_weights', type=str, required=True)
    parser.add_argument('-m', '--mask', type=str, required=False, 
                        help="Path to the pruning mask to load. If not provided, ensure to pass the --dense flag.")
    parser.add_argument('--dense', action="store_true", default=False, 
                        help="Train the dense model (overrides the --mask flag).")
    parser.add_argument('--snapshot', default='captioning_pretrain.pt', 
                        help='Path to the snapshot to save/load. Default: captioning_pretrain.pt. '
                        'If the file exists, the script will resume from it. If not, it will start from scratch and create it.')
    parser.add_argument('--output_dir', type=str, default='output/captioning_pretrain', 
                        help='Path to the output directory, where the final weights will be dumped. Default: output/captioning_pretrain.')
    parser.add_argument('-wdb', '--wandb', action="store_true", default=False, 
                        help='Log the results on Weights and Biases. Make sure to run `wandb login` before.')
    parser.add_argument('-exp', '--experiment_name', type=str, required=False, 
                        help='Name of the experiment on Weights and Biases.')
    parser.add_argument('--wdb_offline', action='store_true', default=False, 
                        help='If true, wandb will not sync the results online. You can sync them after the script with `wandb sync`.')
    parser.add_argument('--seed', default=42, type=int, 
                        help='Seed for reproducibility. Default: 42.')
    parser.add_argument('--devices', type=int, default=1, 
                        help="Number of devices (ie, gpus) to use with Lightning Fabric in DDP mode. Default: 1.")
    parser.add_argument('--precision', type=str, default="bf16-mixed", choices=['32-true', 'bf16-mixed', '16-mixed'], 
                        help='Precision strategy for training. Default: bf16-mixed.')
    parser.add_argument('--debug', action="store_true", default=False, help="Enable debug mode. Will run only a few iterations.")
    args = parser.parse_args()

    # load the config
    with open(args.config, 'r') as f:
        config = yaml.load(f, Loader=yaml.Loader)

    os.makedirs(args.output_dir, exist_ok=True)
    yaml.dump(config, open(os.path.join(args.output_dir, 'config.yaml'), 'w'))

    assert set(config.keys()) != set(vars(args).keys()), "Config and command line arguments must not overlap"
        
    # mixup command line arguments and config
    config.update(vars(args))
    main(args, config)
