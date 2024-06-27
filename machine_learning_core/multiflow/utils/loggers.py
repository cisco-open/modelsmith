from copy import deepcopy
from lightning.pytorch.loggers import WandbLogger


def init_wandb_logger(config):
    new_cfg = deepcopy(config)
    wandb_data = new_cfg.pop('wandb_data')

    if 'experiment_name' in new_cfg and new_cfg['experiment_name'] is not None:
        wandb_data['name'] = new_cfg['experiment_name']

    if 'wdb_offline' in new_cfg and new_cfg['wdb_offline']:
        wandb_data['offline'] = new_cfg['wdb_offline']
    
    logger = WandbLogger(**wandb_data, config=new_cfg)
    return logger