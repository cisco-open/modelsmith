import os
import torch
from torch.utils.data import DataLoader
from torchvision import transforms
from PIL import Image
from copy import deepcopy

from datasets.pretrain_dataset import XVLMPretrainDataset, BlipPretrainDataset
from datasets.region_dataset import RegionDataset
from datasets.utils import DistributedEvalSampler
from datasets.retrieval_dataset import RetrievalTrainDataset, RetrievalEvalDataset
from datasets.vqa_dataset import VQADataset
from datasets.vision_datasets import ImageNet

from datasets.coco_karpathy_dataset import CocoCaptionTrainDataset, CocoCaptionEvalDataset
from datasets.randaugment import RandomAugment


def create_dataset(dataset, config):
    normalize = transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))

    pretrain_transform = transforms.Compose([
        transforms.RandomResizedCrop(config['image_res'], scale=(0.2, 1.0),
                                     interpolation=Image.BICUBIC),
        transforms.RandomHorizontalFlip(),
        RandomAugment(2, 7, isPIL=True, augs=['Identity', 'AutoContrast', 'Equalize', 'Brightness', 'Sharpness',
                                              'ShearX', 'ShearY', 'TranslateX', 'TranslateY', 'Rotate']),
        transforms.ToTensor(),
        normalize,
    ])

    train_transform = transforms.Compose([
        transforms.RandomResizedCrop(config['image_res'], scale=(0.5, 1.0),
                                     interpolation=Image.BICUBIC),
        transforms.RandomHorizontalFlip(),
        RandomAugment(2, 7, isPIL=True, augs=['Identity', 'AutoContrast', 'Equalize', 'Brightness', 'Sharpness',
                                              'ShearX', 'ShearY', 'TranslateX', 'TranslateY', 'Rotate']),
        transforms.ToTensor(),
        normalize,
    ])

    train_transform_wohflip = transforms.Compose([
        transforms.RandomResizedCrop(config['image_res'], scale=(0.5, 1.0), interpolation=Image.BICUBIC),
        RandomAugment(2, 7, isPIL=True, augs=['Identity', 'AutoContrast', 'Equalize', 'Brightness', 'Sharpness',
                                              'ShearX', 'ShearY', 'TranslateX', 'TranslateY', 'Rotate']),
        transforms.ToTensor(),
        normalize,
    ])

    box_transform = transforms.Compose([
        RandomAugment(2, 7, isPIL=True, augs=['Identity', 'AutoContrast', 'Equalize', 'Brightness', 'Sharpness']),
        transforms.ToTensor(),
        normalize,
    ])

    test_transform = transforms.Compose([
        transforms.Resize((config['image_res'], config['image_res']), interpolation=Image.BICUBIC),
        transforms.ToTensor(),
        normalize,
    ])



    if dataset == 'pretrain_xvlm':
        general_dataset = XVLMPretrainDataset(config, pretrain_transform, add_eos=False, mask_tokens=True)
        region_dataset = RegionDataset(config, add_eos=False, box_transform=box_transform)
        return general_dataset, region_dataset

    elif dataset == 'pretrain_blip':
        ood_config = deepcopy(config)
        if 'coco_file' in ood_config: ood_config.pop('coco_file')
        if 'vg_file' in ood_config: ood_config.pop('vg_file')
        general_dataset = BlipPretrainDataset(ood_config, transform=pretrain_transform)
        
        id_config = deepcopy(config)
        if 'cc3m_file' in id_config: id_config.pop('cc3m_file')
        if 'sbu_file' in id_config: id_config.pop('sbu_file')
        region_dataset = BlipPretrainDataset(id_config, transform=pretrain_transform)
        return general_dataset, region_dataset

    elif dataset == 'pretrain_dino':
        general_dataset = ImageNet(config.get('root', 'data/imagenet'), split='train', transform=pretrain_transform)
        region_dataset = ImageNet(config.get('root', 'data/imagenet'), split='train', transform=pretrain_transform) # dummy op
        return general_dataset, region_dataset
    
    elif dataset == 'captioning_pretrain':
        dataset = XVLMPretrainDataset(config, transform=pretrain_transform, add_eos=True, do_crop=True)
        return dataset

    elif dataset == 'retrieval':
        train_dataset = RetrievalTrainDataset(
            ann_file=config['train_file'], 
            transform=train_transform, 
            image_root=config['image_root'],
        )
        
        val_dataset = RetrievalEvalDataset(
            ann_file=config['val_file'], 
            transform=test_transform, 
            image_root=config['image_root']
        )

        test_dataset = RetrievalEvalDataset(
            ann_file=config['test_file'], 
            transform=test_transform, 
            image_root=config['image_root']
        )
        return train_dataset, val_dataset, test_dataset


    elif dataset == 'vqa':

        train_dataset = VQADataset(
            config['train_file'], 
            train_transform_wohflip, 
            config['vqa_root'], 
            config['vg_root'],
            split='train',
            text_encoder=config.get('text_encoder', None), 
            use_roberta=config.get('use_roberta', False)
        )

        val_dataset = VQADataset(
            config['val_file'],
            test_transform,
            config['vqa_root'],
            config['vg_root'],
            split='test', 
            answer_list=config['answer_list'],
            text_encoder=config.get('text_encoder', None),
            use_roberta=config.get('use_roberta', False)
        )

        test_dataset = VQADataset(
            config['test_file'], 
            test_transform, 
            config['vqa_root'], 
            config['vg_root'],
            split='test', 
            answer_list=config['answer_list'],
            text_encoder=config.get('text_encoder', None),
            use_roberta=config.get('use_roberta', False)
        )

        return train_dataset, val_dataset, test_dataset

    elif dataset == 'captioning':
        train_dataset = CocoCaptionTrainDataset(
            config['train_file'], 
            train_transform, 
            config['image_root'], 
            max_words=config['max_tokens'], 
            prompt=config['prompt']
        )

        val_dataset = CocoCaptionEvalDataset(
            config['val_file'], 
            test_transform, 
            config['image_root']
        )

        test_dataset = CocoCaptionEvalDataset(
            config['test_file'], 
            test_transform, 
            config['image_root']
        )

        return train_dataset, val_dataset, test_dataset
    
    else:
        raise NotImplementedError(f"dataset == {dataset}")


def create_sampler(datasets, shuffles, num_replicas, global_rank, is_eval):
    samplers = []
    for dataset, shuffle, is_eval_ in zip(datasets, shuffles, is_eval):
        if not is_eval_:
            sampler = torch.utils.data.DistributedSampler(
                dataset, 
                num_replicas=num_replicas, 
                rank=global_rank, 
                shuffle=shuffle
            )
        else:
            sampler = DistributedEvalSampler(
                dataset,
                num_replicas=num_replicas, 
                rank=global_rank, 
                shuffle=shuffle
            )
        samplers.append(sampler)
    return samplers


def create_loader(datasets, samplers, batch_size, num_workers, is_trains, collate_fns):
    loaders = []
    for dataset, sampler, bs, n_worker, is_train, collate_fn in zip(datasets, samplers, batch_size, num_workers,
                                                                    is_trains, collate_fns):
        if is_train:
            shuffle = (sampler is None)
            drop_last = True
        else:
            shuffle = False
            drop_last = False
        loader = DataLoader(
            dataset,
            batch_size=bs,
            num_workers=n_worker,
            pin_memory=True,
            sampler=sampler,
            shuffle=shuffle,
            collate_fn=collate_fn,
            drop_last=drop_last
        )
        loaders.append(loader)

    if len(loaders) <= 1:
        print(f"### be careful: func create_loader returns a list length of {len(loaders)}")

    return loaders