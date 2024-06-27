import torch.distributed as dist


def millions(num, decimals=2):
    return round(num / (10**6), ndigits=decimals)

def billions(num, decimals=2):
    return round(num / (10**9), ndigits=decimals)

def dict2str(dict, prefix='', precision=5):
    out = ""
    for k, v in dict.items():
        out += f'{prefix}_{k} = {v:.{precision}f}\n'
    return out

def num_params(model):
    return sum([p.numel() for p in model.parameters() if p.requires_grad])

def update_config_for_vit(config):
    config['use_clip_vit'] = True
    config['use_swin'] = False
    config['vision_config'] = 'configs/xvlm/config_clipvitB.json'
    config['patch_size'] = 16
    return config

def mprint(*args, **kwargs):
    if dist.is_initialized():
        if dist.get_rank() == 0:
            print(*args, **kwargs)
    else:
        print(*args, **kwargs)