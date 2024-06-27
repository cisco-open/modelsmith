import os
import math
import json
import time
import datetime
import argparse
import numpy as np
import torch
import lightning as L
import ruamel.yaml as yaml
import torch.backends.cudnn as cudnn

import utils

from functools import partial
from pathlib import Path
from models import BLIPRetrieval, XVLMRetrieval, BertTokenizerForXVLM

from utils.optim import create_optimizer, create_scheduler
from utils.loggers import init_wandb_logger
from utils.misc import millions, num_params
from utils.prune_utils import make_prunable, stats, named_masked_parameters
from utils.functions import get_unprunable_parameters
from datasets import create_dataset, create_loader

from evaltools import blip_itr_evaluation, xvlm_itr_evaluation



def train_collate(batch, tokenizer):
    images, captions, idx = zip(*batch)
    images = torch.stack(images, dim=0)
    indices = torch.tensor(idx, dtype=torch.long)
    text_input = tokenizer(captions, padding='longest', max_length=config['max_tokens'], return_tensors="pt")
    text_ids, text_atts = text_input.input_ids, text_input.attention_mask
    return images, text_ids, text_atts, indices


def determine_alpha(index, epoch, num_batches, config):
    if epoch>0:
        alpha = config['alpha']
    else:
        alpha = config['alpha']*min(1,index/num_batches)
    return alpha


def train(model, data_loader, optimizer, fabric: L.Fabric, scheduler, epoch, config, debug_mode=False, **kwargs):
    model.train()
    optimizer.zero_grad()
    steps = 0
    itm_losses, itc_losses, total_losses = [], [], []

    # if the model is blip, setup the momentum encoders
    if model.name == "blip":
        visual_encoder_m, text_encoder_m, vision_proj_m, text_proj_m = model.update_momentum(
            visual_encoder_m=kwargs.get('visual_encoder_m', None), 
            text_encoder_m=kwargs.get('text_encoder_m'), 
            vision_proj_m=kwargs.get('vision_proj_m', None), 
            text_proj_m=kwargs.get('text_proj_m', None)
        )
        kwargs['visual_encoder_m'] = visual_encoder_m
        kwargs['text_encoder_m'] = text_encoder_m
        kwargs['vision_proj_m'] = vision_proj_m
        kwargs['text_proj_m'] = text_proj_m
    
    # start training
    for i, (image, text_ids, text_atts, idx) in enumerate(data_loader):
        
        if debug_mode and i == 100: break

        # effectively synchronize only when the target batch size is met
        is_sync_step = ((i+1) % config['grad_acc_steps'] == 0) or (i+1 == len(data_loader))
        with fabric.no_backward_sync(model, enabled=not is_sync_step):

            if model.name == "blip":
                alpha = determine_alpha(i, epoch, len(data_loader), config)
            elif model.name == "xvlm":
                alpha = None

            loss_itc, loss_itm = model(
                image, text_ids, text_atts, idx=idx, 
                return_losses=True, alpha=alpha,
                visual_encoder_m=kwargs.get('visual_encoder_m', None), 
                text_encoder_m=kwargs.get('text_encoder_m'), 
                vision_proj_m=kwargs.get('vision_proj_m', None), 
                text_proj_m=kwargs.get('text_proj_m', None)
            )
            loss = (loss_itc + loss_itm) / config['grad_acc_steps']
            fabric.backward(loss)

        if is_sync_step:
            optimizer.step()
            scheduler.step()
            optimizer.zero_grad()

            # move from gpu to cpu only once
            loss_itc_scalar, loss_itm_scalar, loss_scalar = loss_itc.item(), loss_itm.item(), loss.item()
            fabric.log_dict({
                "loss_itc": loss_itc_scalar,
                "loss_itm": loss_itm_scalar,
                "loss": loss_scalar,
                "lr": optimizer.param_groups[0]['lr'],
                "step": steps
            })

            # keep track locally
            itm_losses.append(loss_itm.item())
            itc_losses.append(loss_itc.item())
            total_losses.append(loss.item())
            steps += 1
            print(f"[Epoch {epoch+1}] Training batch {i+1} / {len(data_loader)}\t loss itc = {loss_itc}\t loss itm = {loss_itm}")

            # if the model is blip, reupdate the momentum encoders
            if model.name == "blip":
                visual_encoder_m, text_encoder_m, vision_proj_m, text_proj_m = model.update_momentum(
                    visual_encoder_m=kwargs.get('visual_encoder_m', None), 
                    text_encoder_m=kwargs.get('text_encoder_m'), 
                    vision_proj_m=kwargs.get('vision_proj_m', None), 
                    text_proj_m=kwargs.get('text_proj_m', None)
                )
                kwargs['visual_encoder_m'] = visual_encoder_m
                kwargs['text_encoder_m'] = text_encoder_m
                kwargs['vision_proj_m'] = vision_proj_m
                kwargs['text_proj_m'] = text_proj_m
    
    # finally, put on W&B epoch-aggregated data
    aggr_itm_loss = torch.tensor(itm_losses).mean().item()
    aggr_itc_loss = torch.tensor(itc_losses).mean().item()
    aggr_loss = torch.tensor(total_losses).mean().item()
    fabric.log_dict({
        "loss_itm_epoch_level": aggr_itm_loss,
        "loss_itc_epoch_level": aggr_itc_loss,
        "losses_epoch_level": aggr_loss
    })
    
    return {
        'loss_itm': aggr_itm_loss,
        'loss_itc': aggr_itc_loss,
        'loss': aggr_loss
    }


@torch.no_grad()
def compute_metrics(scores_i2t, scores_t2i, dataset, decimals=2):
    # Images->Text
    ranks = np.zeros(scores_i2t.shape[0])
    for index, score in enumerate(scores_i2t):
        inds = np.argsort(score)[::-1]
        # Score
        rank = 1e20
        for i in dataset.img2txt[index]:
            tmp = np.where(inds == i)[0][0]
            if tmp < rank:
                rank = tmp
        ranks[index] = rank

    # Compute metrics
    tr1 = 100.0 * len(np.where(ranks < 1)[0]) / len(ranks)
    tr5 = 100.0 * len(np.where(ranks < 5)[0]) / len(ranks)
    tr10 = 100.0 * len(np.where(ranks < 10)[0]) / len(ranks)

    # Text->Images
    ranks = np.zeros(scores_t2i.shape[0])

    for index, score in enumerate(scores_t2i):
        inds = np.argsort(score)[::-1]
        ranks[index] = np.where(inds == dataset.txt2img[index])[0][0]

    # Compute metrics
    ir1 = 100.0 * len(np.where(ranks < 1)[0]) / len(ranks)
    ir5 = 100.0 * len(np.where(ranks < 5)[0]) / len(ranks)
    ir10 = 100.0 * len(np.where(ranks < 10)[0]) / len(ranks)

    tr_mean = (tr1 + tr5 + tr10) / 3
    ir_mean = (ir1 + ir5 + ir10) / 3
    r_mean = (tr_mean + ir_mean) / 2

    eval_result = {'txt_r1': round(tr1, decimals),
                   'txt_r5': round(tr5, decimals),
                   'txt_r10': round(tr10, decimals),
                   'txt_r_mean': round(tr_mean, decimals),
                   'img_r1': round(ir1, decimals),
                   'img_r5': round(ir5, decimals),
                   'img_r10': round(ir10, decimals),
                   'img_r_mean': round(ir_mean, decimals),
                   'r_mean': round(r_mean, decimals)}
    return eval_result


def main(args, config):

    if args.precision == '32-true':
        torch.set_float32_matmul_precision(precision="high")
    elif args.precision in ('bf16-mixed', '16-mixed'):
        torch.set_float32_matmul_precision(precision="medium")

    loggers = []
    if args.wandb:
        loggers.append(init_wandb_logger(config))

    # initialize distributed training
    fabric = L.Fabric(
        accelerator="cuda",
        strategy="ddp",
        precision=args.precision,
        devices=args.devices,
        loggers=loggers
    )
    fabric.launch()
    utils.setup_for_distributed(is_master=fabric.is_global_zero)

    # automatically infer the gradient accumulation steps
    B = config['batch_size_train']
    E = config['batch_size_target']
    config['grad_acc_steps'] = (E // fabric.world_size) // B
    
    # reproducibility settings
    L.seed_everything(args.seed)
    cudnn.benchmark = False
    torch.use_deterministic_algorithms(True)

    # initialize the datasets, distributed samplers and dataloaders
    print("Creating retrieval dataset", flush=True)
    train_dataset, val_dataset, test_dataset = create_dataset('retrieval', config)
    
    # tokenizer for the dataset
    if args.model == "xvlm":
        tokenizer = BertTokenizerForXVLM.from_pretrained(config['text_encoder'])
        
        # model initialization
        print("Creating model", flush=True)
        model = XVLMRetrieval(config=config)
        setattr(model, 'name', 'xvlm')

        # definition of the evaluation function
        evaluation = xvlm_itr_evaluation

        # define the momentum encoders (only for compatibility with the BLIP code, XVLM does not use them)
        visual_encoder_m = None
        text_encoder_m = None
        vision_proj_m = None
        text_proj_m = None
    
    elif args.model == "blip":
        model = BLIPRetrieval(
            image_size=config['image_res'], 
            vit=config['vit'], 
            vit_grad_ckpt=config['vit_grad_ckpt'], 
            vit_ckpt_layer=config['vit_ckpt_layer'], 
            queue_size=config['queue_size'], 
            negative_all_rank=config['negative_all_rank']
        )
        tokenizer = model.tokenizer
        setattr(model, 'name', 'blip')

        # definition of the evaluation function
        evaluation = blip_itr_evaluation
    else:
        raise NotImplementedError(f"Model {args.model} not implemented. Please add it to the factory yourself.")
    
    # training goes in distributed mode, so it needs a sampler
    # NOTE: since the evaluation code is a bit tricky for the retrieval task, we don't use a distributed sampler
    training_sampler = torch.utils.data.distributed.DistributedSampler(
        train_dataset,
        num_replicas=fabric.world_size, 
        rank=fabric.global_rank, 
        shuffle=True # remember to set shuffle=False in the DataLoader
    )

    # define the dataloaders
    training_collate_fn = partial(train_collate, tokenizer=tokenizer)
    train_loader, val_loader, test_loader = create_loader(
        datasets=[train_dataset, val_dataset, test_dataset], 
        samplers=[training_sampler, None, None],
        batch_size=[config['batch_size_train'], config['batch_size_test'], config['batch_size_test']],
        num_workers=[8,8,8],
        is_trains=[True,False,False],
        collate_fns=[training_collate_fn, None, None]
    )

    # attach pruning masks to the model and load the pretraining weights
    if not args.dense:
        make_prunable(model, pattern_lock=True, mask_on_the_fly=True)
        model.load_from_pruned_pretrained(args.pretraining_weights, args.mask, config, is_eval=False)
    else:
        model.load_pretrained(args.pretraining_weights, config, is_eval=False)
        make_prunable(model, pattern_lock=False, mask_on_the_fly=False)
    
    # if running with BLIP, setup the external momentum encoders
    if args.model == "blip":
        # de-register the momentum parameters from the model
        visual_encoder_m = model.visual_encoder_m
        text_encoder_m = model.text_encoder_m
        vision_proj_m = model.vision_proj_m
        text_proj_m = model.text_proj_m
        delattr(model, 'visual_encoder_m')
        delattr(model, 'text_encoder_m')
        delattr(model, 'vision_proj_m')
        delattr(model, 'text_proj_m')
        visual_encoder_m.to(fabric.device)
        text_encoder_m.to(fabric.device)
        vision_proj_m.to(fabric.device)
        text_proj_m.to(fabric.device)
    
    # log some stats regarding the pruned parameters
    print(f"Total Params: {millions(num_params(model)):.2f}M")
    remaining_params, total_params = stats(named_masked_parameters(model, exclude=get_unprunable_parameters(model.name)))
    print(f"Remaining params: {millions(remaining_params, decimals=2)} / {millions(total_params, decimals=2)} ({remaining_params/total_params*100:.2f}%)")

    # load the configuration (they remain the same across resumes)
    arg_opt = utils.AttrDict(config['optimizer'])
    optimizer = create_optimizer(arg_opt, model)

    # once the model weights are initialized, distribute everything
    optimizer = fabric.setup_optimizers(optimizer)

    # load and resume from a snapshot if provided
    if os.path.exists(args.snapshot):
        snapshot = fabric.load(args.snapshot)
        model.load_state_dict(snapshot['model_state'])
        optimizer.load_state_dict(snapshot['optimizer_state'])
        sched_state_dict = snapshot['scheduler']
        epochs_run = snapshot['epochs_run'] + 1
        best_r_mean = snapshot['best_r_mean']
        best_epoch = snapshot['best_epoch']
        print(f"Resuming training from epoch {epochs_run}. \
               best_r_mean = {best_r_mean} obtained at epoch {best_epoch}")
        print(
            "IMPORTANT: You are resuming training from a snapshot.\n"
            "As per the README.md, note that while the code for resuming is given, it has not been tested.\n"
            "The authors are not responsible for any issues that may arise from resuming training.\n\n"
        )
    else:
        epochs_run = 0
        best_r_mean = 0
        best_epoch = 0
        sched_state_dict = None
        print("No snapshot exists. Starting training from scratch...")

    # LR SCHEDULER initialization
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
    
    # when everything is ready, distribute
    model = fabric.setup_module(model)
    train_loader, val_loader, test_loader = fabric.setup_dataloaders(train_loader, val_loader, test_loader, use_distributed_sampler=False)

    # keep track of time
    start_time = time.time()

    # grab other training hyperparameters
    max_epoch = config['scheduler']['epochs']
    save_freq = config['save_freq'] if 'save_freq' in config else 1

    # start fault-tolerant distributed training
    if epochs_run == max_epoch:
        done_training = True
    else:
        done_training = False
        print("Start training", flush=True)
    
    for epoch in range(epochs_run, max_epoch):
        
        # NOTE: this is needed for data distribution across gpus since they are not in-sync 
        # before the forward pass!
        train_loader.sampler.set_epoch(epoch)
        
        # train one epoch
        train_stats = train(
            model, train_loader, optimizer, fabric, lr_scheduler, epoch, config, args.debug, 
            visual_encoder_m=visual_encoder_m, text_encoder_m=text_encoder_m, 
            vision_proj_m=vision_proj_m, text_proj_m=text_proj_m
        )

        # evaluate on the validation set
        score_val_i2t, score_val_t2i = evaluation(model, val_loader, tokenizer, fabric, config, debug_mode=args.debug)
        val_result = compute_metrics(score_val_i2t, score_val_t2i, dataset=val_dataset)
        print(val_result)
        
        # log validation data on wandb
        val_dict = {f'val_{k}': v for k, v in val_result.items()}
        fabric.log_dict(val_dict)

        # log train and validation data on disk
        if fabric.is_global_zero:
            log_stats = {**{f'train_{k}': v for k, v in train_stats.items()},
                        **{f'val_{k}': v for k, v in val_result.items()},
                        'epoch': epoch}
            with open(os.path.join(args.output_dir, "log.txt"), "a") as f:
                f.write(json.dumps(log_stats) + "\n")

        # saving best model
        if val_result['r_mean'] > best_r_mean:
            ckpt = {
                'model_state': model,
                'optimizer_state': optimizer,
                'scheduler': lr_scheduler.state_dict(),
                'config': config,
                'epochs_run': epoch,
            }
            fabric.save(os.path.join(args.output_dir, 'checkpoint_best.pt'), ckpt)
            best_r_mean = val_result['r_mean']
            best_epoch = epoch

        # saving model every :save_freq: epochs on each node
        if (epoch+1) % save_freq == 0:
            snapshot = {
                'model_state': model,
                'optimizer_state': optimizer,
                'scheduler': lr_scheduler.state_dict(),
                'epochs_run': epoch,
                'best_r_mean': best_r_mean,
                'best_epoch': best_epoch
            }
        fabric.save(args.snapshot, snapshot)

        if epoch == max_epoch - 1: done_training = True
        if args.incremental: break


    # when training ends, write on disk the best epoch
    if fabric.global_rank == 0:
        with open(os.path.join(args.output_dir, "log.txt"), "a") as f:
            f.write("best epoch: %d" % best_epoch)

    # finally, evaluate the best model on the test set
    if done_training: 
        print("Training completed. Start testing", flush=True)

        # make sure processes are synchronized before loading the model
        fabric.barrier()

        # NOTE: here I load with fabric since the model is one the gpu already
        snapshot = fabric.load(os.path.join(args.output_dir, 'checkpoint_best.pt'))
        model.load_state_dict(snapshot['model_state'])
        score_test_i2t, score_test_t2i = evaluation(model, test_loader, tokenizer, fabric, config, debug_mode=args.debug)
        test_result = compute_metrics(score_test_i2t, score_test_t2i, dataset=test_dataset)
        print(test_result)

        # log test data on wandb
        test_dict = {f'test_{k}': v for k, v in test_result.items()}
        fabric.log_dict(test_dict)

        # log test data on disk
        if fabric.global_rank == 0:
            with open(os.path.join(args.output_dir, "log.txt"), "a") as f:
                f.write(json.dumps(test_result) + "\n")

    # display the total time and exit
    total_time = time.time() - start_time
    total_time_str = str(datetime.timedelta(seconds=int(total_time)))
    print('Total Time for Image-Text Retrieval Finetuning {}'.format(total_time_str))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', type=str, required=True, choices=['xvlm', 'blip'])
    parser.add_argument('-pre', '--pretraining_weights', type=str, required=True)
    parser.add_argument('-m', '--mask', type=str, required=False, 
                        help="Path to the pruning mask to load. If not provided, make sure to set --dense.")
    parser.add_argument('--dense', action='store_true', default=False, 
                        help="Train the dense model. This flag overrides any given pruning mask")
    parser.add_argument('--snapshot', type=str, required=False, default="snapshot.pt", 
                        help="Path to the snapshot to load and/or save. If not provided, the default is 'snapshot.pt'. "
                        "If the snapshot exists, the training will resume from there. If it doesn't, the training will start from scratch.")
    parser.add_argument('--config', type=str, required=True, 
                        help="Path to the .yaml configuration file of the script. For convenience, you can use "
                        "configs/xvlm/retrieval.yaml or configs/blip/retrieval.yaml.")
    parser.add_argument('--output_dir', type=str, required=True, 
                        help="Path to the output directory of the script. This includes the logs and the checkpoint of the best model on the validation set.") 
    parser.add_argument('--seed', default=42, type=int, 
                        help="Seed for reproducibility. Default is 42.")
    parser.add_argument('-wdb', '--wandb', action='store_true', default=False, required=False, 
                        help='Whether or not to log data on Weights & Biases. Please remember to login first, e.g., via `wandb login`')
    parser.add_argument('-exp', '--experiment_name', type=str, default=None, required=False, help='Name of the experiment on wandb. \
                        Will override the config if given.')
    parser.add_argument('--wdb_offline', action='store_true', default=False, required=False, help='Whether or not to log data on wandb. \
                        Remember to run wandb sync at the end of the training if this flag is active.')
    parser.add_argument('--devices', type=int, default=1, required=False, 
                        help='Number of devices (i.e. gpus) to use with Lightning Fabric and DDP. Default is 1.')
    parser.add_argument('--precision', type=str, default='bf16-mixed', required=False, choices=['32-true', 'bf16-mixed', '16-mixed'], 
                        help='Precision to use for training. Default is bf16-mixed.')
    parser.add_argument('--debug', action="store_true", 
                        help="Enable debugging mode to ensure you can run the script on this machine without errors. "
                        "Will only run a few training batches as well as a few validation batches per epoch. Default is False.")
    parser.add_argument('--incremental', action="store_true", 
                        help="Enable incremental training. Will only run one epoch and then stop. Default is False. "
                        "If given, ensure to correctly set the --snapshot flag to resume training. Note that snapshot code is given, but not tested. "
                        "This also holds for every other finetuning script.")

    # load the main config
    args = parser.parse_args()
    config = yaml.load(open(args.config, 'r'), Loader=yaml.Loader)
    
    # dump the config in the output folder for future reference
    Path(args.output_dir).mkdir(parents=True, exist_ok=True)    
    yaml.dump(config, open(os.path.join(args.output_dir, 'config.yaml'), 'w'))

    assert set(config.keys()) != set(vars(args).keys()), "Config and command line arguments must not overlap"
    
    # mixup command line arguments and config
    config.update(vars(args))
    
    # launch the main function
    main(args, config)