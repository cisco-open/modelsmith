import os
import time
import torch
import pandas as pd
import ruamel.yaml as yaml
import lightning as L
from argparse import ArgumentParser


from pruners import available_pruners, get_pruner_by_name
from datasets import create_dataset, create_loader, create_sampler

from utils.misc import millions
from utils.prune_utils import save_prunable_model
from utils.model_utils import available_models, model_factory
from utils.functions import get_unprunable_parameters

# ignore warnings
import warnings
warnings.filterwarnings("ignore")


def main(args):

    # pruning is always done with fp32 precision
    # however, if tensor cores are available, enable matrix multiplications with tf32
    torch.set_float32_matmul_precision("high")
    
    # by default, model pruning is wrapped with Lightning Fabric
    # as per the code release, this is unnecessary, as only one GPU with the default datatype of fp32 is used
    # however, I find it convenient to maintain Fabric here, s.t. you can easily rely on it to implement your multi-device pruners
    # by modifying the source code in pruners/<pruner_name>.py
    fabric = L.Fabric(
        accelerator='cuda',
        devices=1,
        precision="32-true",
    )

    # try to force reproducibility 
    # NOTE: to date (i.e., March 2024), sorting operations do not have deterministic CUDA implementations in PyTorch.
    # Examples are "torch.topk" or "torch.kthvalue". This forces us to use the flag "warn_only", or both operations will crash. 
    # If you know a workaround, you're welcome to contribute :)
    fabric.seed_everything(args.seed)
    torch.backends.cudnn.benchmark = False
    torch.use_deterministic_algorithms(True, warn_only=True)

    # initialize the model via the central model factory (use this function to add your own models!)
    model = model_factory(model_name=args.model)

    # attach a Pruner class to a module
    init_args = [model]

    # define the kwargs for the pruner, according to which model gets pruned
    init_kwargs = {'keys_to_exclude': get_unprunable_parameters(args.model)}

    # some pruning algorithms do not need data
    if args.pruner in ("rand", "omp", "lamp", "l2"):
        score_args = {}
        score_kwargs = {}

    # ... while some others do :)
    elif args.pruner in ("snip", "itersnip", "chita", "multiflow", "tamt"):  
        
        # each dataset is initialized via a .yaml config file, you can find these in 'configs/prune/general_loader_{model_name}' 
        dataset_config_path = f'configs/prune/general_loader_{args.model}.yaml'
        print(f"Loading dataset config from {dataset_config_path}.")
        config_for_dataset = yaml.load(open(dataset_config_path, 'r'), Loader=yaml.Loader)
        
        # you can regard the 'general' dataset as out-of-domain data (i.e., CC3M in our case) 
        # and the 'region' dataset as in-domain data (Visual Genome). This distinction was first made 
        # in the UNITER paper. Both are used for pruning. 
        general_dataset, region_dataset = create_dataset(f'pretrain_{args.model}', config=config_for_dataset)
        
        # this is here for compatibility with lightning fabric; since only one rank is used, the behaviour will be transparent
        # keeping it to help with any custom implementation of multi-device pruners
        general_sampler, region_sampler = create_sampler(
            datasets=[general_dataset, region_dataset], 
            shuffles=[True, True], 
            num_replicas=fabric.world_size, 
            global_rank=fabric.global_rank, 
            is_eval=[True, True]
        )

        # understandable, I hope... please note that the number of workers is manually fixed to 8 (feel free to change it)
        [general_loader, region_loader] = create_loader(
            [general_dataset, region_dataset], 
            samplers=[general_sampler, region_sampler], 
            batch_size=[config_for_dataset['batch_size'], config_for_dataset['batch_size']],
            num_workers=[8, 8], 
            is_trains=[False, False], 
            collate_fns=[getattr(general_dataset, "collate_fn", None), getattr(region_dataset, "collate_fn", None)]
        )

        # setup everything to the correct rank (dummy op for fabric)
        general_loader, region_loader = fabric.setup_dataloaders(general_loader, region_loader, use_distributed_sampler=False)
        model = fabric.setup_module(model)

        # mixup args and config in a single dict
        config_for_dataset.update(vars(args))

        # args and kwargs to be passed to the "prune" function of each Pruner instance
        score_args = [model]
        score_kwargs = {
            'dataloader': general_loader,
            'region_loader': region_loader if model.name != 'dino' else None,
            'device': fabric.device,
            'config': config_for_dataset,
            'fabric': fabric,
            'num_batches_per_step': args.num_batches,
            'pruning_steps': args.epochs,
            'schedule': args.schedule,
            'lambda_': args.lambda_,
        }
    
    # get the pruner by name and use it to compute the scores
    pruner = get_pruner_by_name(args.pruner, *init_args, **init_kwargs)

    # set the model in the correct mode according to the pruner
    if hasattr(pruner, 'requires_training') and pruner.requires_training:
        pruner.model.train()
    else:
        pruner.model.eval()

    # start pruning at all comma/separated sparsity levels (must be provided in the range 1-100)
    runtimes = {'sparsity': [], 'runtime': []}
    for sparsity_string in args.sparsities.split(','):
        
        # grab the sparsity from the string split
        sparsity = int(sparsity_string) / 100

        # track the time and prune
        # NOTE: the sparsity is always the first positional argument for the 'prune' method of each Pruner
        time_start = time.time()
        pruner.prune(sparsity, *score_args, **score_kwargs)
        time_end = time.time()
        runtimes['runtime'].append(time_end - time_start)
        runtimes['sparsity'].append(sparsity_string)
        
        # when done, save the mask
        last_folder = args.output_dir.split('/')[-1]
        if last_folder != str(pruner):
            args.output_dir = os.path.join(args.output_dir, str(pruner))
            os.makedirs(args.output_dir, exist_ok=True)
        pruned_model_path = os.path.join(args.output_dir, f"{args.model}_{pruner}_{sparsity_string}_seed{args.seed}.pth")
        params_path, mask_path = save_prunable_model(model, pruned_model_path, mask_only=not pruner.modifies_weights)
        
        # some pruners (CHITA and CHITA++ in this repo), also update the unpruned weights. 
        # If that's the case, then also the new weights are dumped
        print(f"Saved mask at {mask_path}")
        if pruner.modifies_weights:
            print(f"Saved params at {params_path}")

        # log the stats about sparsity to make sure everything is fine
        remaining_params, total_params = pruner.stats()
        print(
            f"Sparsity: {sparsity_string}%",
            f"Remaining params (M): {millions(remaining_params, decimals=2)}",
            f"Total params (M): {millions(total_params, decimals=2)}",
            f"Remaining: {remaining_params/total_params*100:.2f}%\n\n",
            sep='\n',
            end='\n\n'
        )

        # reset the pruner and proceed with the next sparsity
        pruner.reset()
    
    # if the pruner is a score-based one, then it may be useful to 
    # dump the outcome of the scoring function itself, so you can use it for many things later on. 
    # Examples are computing a mask at a different sparsity, or analyzing the similarity of the scores between algorithms :)
    if pruner.is_one_shot:
        scores_path = os.path.join(args.output_dir, f"{args.model}_{args.pruner}_scores.pth")
        torch.save(pruner.state_dict(), scores_path)
        print(f"Saved scores at {scores_path}. Finished!")
    
    # dump on disk the total runtime
    runtimes = pd.DataFrame(runtimes)
    runtimes.to_csv(os.path.join(args.output_dir, f"{args.model}_{args.pruner}_seed{args.seed}_runtimes.csv"), index=False)

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('-p', '--pruner', type=str, required=True, choices=available_pruners)
    parser.add_argument('-m', '--model', type=str, required=True, choices=available_models)
    parser.add_argument('-s', '--sparsities', type=str, default="63,75,90", 
                        help="comma separated list of sparsities to prune at. Default: 63,75,90")
    parser.add_argument('--seed', type=int, default=42, help="Seed for the random number generator. Default: 42")
    
    parser.add_argument('--num_batches', default=3000, type=int, 
                        help="number of batches to use. " 
                        "If epochs > 1, then these will be the batches used at each pruning iteration. "
                        "If epochs == 1, then these will be the total batches processed. Default: 3000.")
    parser.add_argument('-e', '--epochs', type=int, default=1, 
                        help="the total number of pruning iterations. "
                        " This argument is only used by pruners relying on iterations, so IterSNIP and CHITA++. "
                        "If you select the pruner 'chita' and provide this value greater than 1, it will directly run CHITA++. " 
                        "Default: 1")
    parser.add_argument('--schedule', type=str, default='exp', choices=['linear', 'exp', 'const'], help='schedule for IterSNIP/CHITA++. Default: exp')
    parser.add_argument('--output_dir', default="pruned_weights", help="directory where to dump the pruned weights. Default: ./pruned_weights")
    parser.add_argument('--lambda_', type=float, default=1e-5, 
                        help='ridge penalty for CHITA and CHITA++, unused otherwise. Please see our Supp. Mat. on how to set this! Default: 1e-5')
    args = parser.parse_args()

    os.makedirs(args.output_dir, exist_ok=True)
    main(args)

