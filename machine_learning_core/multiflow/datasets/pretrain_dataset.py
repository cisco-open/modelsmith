# Adapted from the following paper :)

# Multi-Grained Vision Language Pre-Training: Aligning Texts with Visual Concepts (https://arxiv.org/abs/2111.08276)
# Github: https://github.com/zengyan-97/X-VLM
# Copyright (c) 2022, ByteDance Inc.
# All rights reserved.

import os
import sys
import json
import copy
import random
import traceback

from random import randint, shuffle
from random import random as rand

import torch
from torch.utils.data import Dataset
from torchvision.transforms.functional import resize
from transformers import BertTokenizer

from PIL import Image, ImageFile

from models.blip.blip_captioning import init_tokenizer
from datasets.utils import pre_caption

ImageFile.LOAD_TRUNCATED_IMAGES = True
Image.MAX_IMAGE_PIXELS = None


class TextMaskingGenerator:
    def __init__(self, tokenizer, mask_prob, mask_max, skipgram_prb=0.2, skipgram_size=3, mask_whole_word=True, use_roberta=False):
        self.id2token = {i: w for w, i in tokenizer.get_vocab().items()}

        self.use_roberta = use_roberta

        for i in range(len(self.id2token)):
            assert i in self.id2token.keys()  # check

        self.cls_token = tokenizer.cls_token
        self.mask_token = tokenizer.mask_token

        self.mask_max = mask_max
        self.mask_prob = mask_prob

        self.skipgram_prb = skipgram_prb
        self.skipgram_size = skipgram_size
        self.mask_whole_word = mask_whole_word

    def get_random_word(self):
        i = randint(0, len(self.id2token) - 1)
        return self.id2token[i]

    def __call__(self, tokens: list):  # tokens: [CLS] + ...
        n_pred = min(self.mask_max, max(1, int(round(len(tokens) * self.mask_prob))))

        # candidate positions of masked tokens
        assert tokens[0] == self.cls_token
        special_pos = set([0])  # will not be masked
        cand_pos = list(range(1, len(tokens)))

        shuffle(cand_pos)
        masked_pos = set()
        max_cand_pos = max(cand_pos)
        for pos in cand_pos:
            if len(masked_pos) >= n_pred:
                break
            if pos in masked_pos:
                continue

            def _expand_whole_word(st, end):
                new_st, new_end = st, end

                if self.use_roberta:
                    while (new_st > 1) and (tokens[new_st][0] != 'Ġ'):
                        new_st -= 1
                    while (new_end < len(tokens)) and (tokens[new_end][0] != 'Ġ'):
                        new_end += 1
                else:
                    # bert, WordPiece
                    while (new_st >= 0) and tokens[new_st].startswith('##'):
                        new_st -= 1
                    while (new_end < len(tokens)) and tokens[new_end].startswith('##'):
                        new_end += 1

                return new_st, new_end

            if (self.skipgram_prb > 0) and (self.skipgram_size >= 2) and (rand() < self.skipgram_prb):
                # ngram
                cur_skipgram_size = randint(2, self.skipgram_size)
                if self.mask_whole_word:
                    st_pos, end_pos = _expand_whole_word(
                        pos, pos + cur_skipgram_size)
                else:
                    st_pos, end_pos = pos, pos + cur_skipgram_size
            else:
                if self.mask_whole_word:
                    st_pos, end_pos = _expand_whole_word(pos, pos + 1)
                else:
                    st_pos, end_pos = pos, pos + 1

            for mp in range(st_pos, end_pos):
                if (0 < mp <= max_cand_pos) and (mp not in special_pos):
                    masked_pos.add(mp)
                else:
                    break

        masked_pos = list(masked_pos)
        n_real_pred = len(masked_pos)
        if n_real_pred > n_pred:
            shuffle(masked_pos)
            masked_pos = masked_pos[:n_pred]

        for pos in masked_pos:
            if rand() < 0.8:  # 80%
                tokens[pos] = self.mask_token
            elif rand() < 0.5:  # 10%
                tokens[pos] = self.get_random_word()

        return tokens, masked_pos


class XVLMPretrainDataset(Dataset):
    def __init__(self, config, transform, add_eos=False, mask_tokens=False, do_crop=True) -> None:
        super().__init__()

        # set the json files; each file should be a json containing a list of dicts
        self.annotations = []
        if 'coco_file' in config:
            self.coco_file = config['coco_file']
            self.coco_image_root = config['coco_image_root']
            
            # load the annotations into memory
            print(f"Loading COCO data from {self.coco_file}")
            self.coco_data = json.load(open(self.coco_file, 'r'))
            print(f"Loading successful! (loaded {len(self.coco_data)} files)\n")
            self.annotations += self.coco_data
        
        if 'vg_file' in config:
            self.vg_file = config['vg_file']
            self.vg_image_root = config['vg_image_root']

            print(f"Loading Visual Genome data from {self.vg_file}")
            self.vg_data = json.load(open(self.vg_file, 'r'))
            print(f"Loading successful! (loaded {len(self.vg_data)} files)\n")
            self.annotations += self.vg_data
        
        if 'cc3m_file' in config:
            self.cc3m_file = config['cc3m_file']
            self.cc3m_image_root = config['cc3m_image_root']

            print(f"Loading CC3M data from {self.cc3m_file}")
            self.cc3m_data = json.load(open(self.cc3m_file, 'r'))
            print(f"Loading successful! (loaded {len(self.cc3m_data)} files)\n")
            self.annotations += self.cc3m_data
        
        if 'sbu_file' in config:
            self.sbu_file = config['sbu_file']
            self.sbu_image_root = config['sbu_image_root']

            print(f"Loading SBU Captions data from {self.sbu_file}")
            self.sbu_data = json.load(open(self.sbu_file, 'r'))
            print(f"Loading successful! (loaded {len(self.sbu_data)} files)\n")
            self.annotations += self.sbu_data

        # setup the dictionary keys to retrieve data in __getitem__
        self.image_key = config['image_key']
        self.caption_key = config['caption_key']
        self.dataset_key = config['dataset_key']
        self.do_crop = do_crop

        # setup the transformations
        self.transform = transform
        self.add_eos = add_eos
        self.tokenizer = BertTokenizer.from_pretrained(config['text_encoder'])
        self.max_tokens = config['max_tokens']
        self.max_words = config['max_words']
        self.cls_token = self.tokenizer.cls_token
        self.eos_token = self.tokenizer.sep_token
        self.pad_token_id = self.tokenizer.pad_token_id

        # initialize the unique set of images of this dataset
        self.all_images = set([ann['image'] for ann in self.annotations])
        self.num_images = len(self.all_images)

        # flags which will decide what is returned by the __getitem__
        # the flag and code below sets everything for MLM
        self.mask_tokens = mask_tokens
        if self.mask_tokens:
            self.mask_generator = TextMaskingGenerator(
                self.tokenizer, config['mask_prob'],
                config['max_masks'], config['skipgram_prb'],
                config['skipgram_size'], config['mask_whole_word']
            )
            self.PAD_mask = -100 
            self.max_masks = config['max_masks']


        # this flag instruct to also return the index passed to __getitem__
        # it is useful for qualitative analysis
        self.return_index = config['return_index'] if 'return_index' in config else False
        self.image_res = config['image_res']


    def __mask_tokens__(self, tokens, text_ids):
        n_tokens = len(tokens)
        tokens_masked, masked_pos = self.mask_generator(copy.deepcopy(tokens))
        text_ids_masked = self.tokenizer.convert_tokens_to_ids(tokens_masked)  # list of int
        masked_ids = [text_ids[p] for p in masked_pos]

        # pad
        n_pad = self.max_tokens - n_tokens
        text_ids = text_ids + [self.pad_token_id] * n_pad
        text_atts = [1] * n_tokens + [0] * n_pad

        text_ids_masked = text_ids_masked + [self.pad_token_id] * n_pad
        n_pad = self.max_masks - len(masked_ids)
        masked_pos = masked_pos + [0] * n_pad
        masked_ids = masked_ids + [self.PAD_mask] * n_pad

        return text_ids, text_atts, text_ids_masked, masked_pos, masked_ids


    def get_image(self, index):
        # grab the correct annotation
        ann = self.annotations[index]

        # load the image into memory and transform it
        if ann[self.dataset_key] == "cc3m":
            image_root = self.cc3m_image_root
        elif ann[self.dataset_key] == "sbu":
            image_root = self.sbu_image_root
        elif ann[self.dataset_key] == "vg":
            image_root = self.vg_image_root
        elif ann[self.dataset_key] == "coco":
            image_root = self.coco_image_root
        
        image = Image.open(os.path.join(image_root, ann[self.image_key])).convert('RGB')

        # crop the image to the bounding box if needed
        if 'bb' in ann:
            [x, y, w, h] = [int(coord) for coord in ann['bb']]
            x_down, y_down = x + w, y + h
            image = image.crop(box=(x, y, x_down, y_down))

        return resize(image, size=(self.image_res, self.image_res), interpolation=Image.BICUBIC)


    def get_image_path(self, index):
        ann = self.annotations[index]
        # load the image into memory and transform it
        if ann[self.dataset_key] == "cc3m":
            image_root = self.cc3m_image_root
        elif ann[self.dataset_key] == "sbu":
            image_root = self.sbu_image_root
        elif ann[self.dataset_key] == "vg":
            image_root = self.vg_image_root
        elif ann[self.dataset_key] == "coco":
            image_root = self.coco_image_root
        return os.path.join(image_root, ann[self.image_key])


    def __private_getitem__(self, index):
        # grab the correct annotation
        ann = self.annotations[index]

        # load the image into memory and transform it
        if ann[self.dataset_key] == "cc3m":
            image_root = self.cc3m_image_root
        elif ann[self.dataset_key] == "sbu":
            image_root = self.sbu_image_root
        elif ann[self.dataset_key] == "vg":
            image_root = self.vg_image_root
        elif ann[self.dataset_key] == "coco":
            image_root = self.coco_image_root
        
        # prepend the root folder only if the image path is relative
        if not ann[self.image_key].startswith(image_root):
            image = Image.open(os.path.join(image_root, ann[self.image_key])).convert('RGB')
        else:
            image = Image.open(ann[self.image_key]).convert('RGB')

        # load the text into memory and transform it
        if isinstance(ann[self.caption_key], list):
            random_index = random.randint(0, len(ann[self.caption_key])-1)
            caption = ann[self.caption_key][random_index]
        elif isinstance(ann[self.caption_key], str):
            caption = ann[self.caption_key]
            random_index = None
        else:
            raise ValueError(f"{self.caption_key} is neither str or a list of str in {ann}. Please fix this.")

        # crop the image to the bounding box if configured
        if 'bb' in ann and self.do_crop:

            if random_index is not None:
                assert isinstance(ann['bb'], list)
                [x, y, w, h] = [int(coord) for coord in ann['bb'][random_index]]
            elif isinstance(ann['bb'][0], (int, float)):
                [x, y, w, h] = [int(coord) for coord in ann['bb']]
            else:
                raise ValueError(f"{ann['bb']} is neither a list of list or a list of int in {ann}. Please fix this.")
            
            x_down, y_down = x + w, y + h
            image = image.crop(box=(x, y, x_down, y_down))

        image = self.transform(image)
        
        caption = pre_caption(caption, self.max_words)
        tokens = self.tokenizer.tokenize(caption)
        tokens = [self.cls_token] + tokens[:self.max_tokens - 1]
        if self.add_eos:
            tokens = tokens[:self.max_tokens - 1]
            tokens += [self.eos_token]
        
        text_ids = self.tokenizer.convert_tokens_to_ids(tokens)
        
        if self.mask_tokens:
            text_ids, text_atts, text_ids_masked, masked_pos, masked_ids = self.__mask_tokens__(tokens, text_ids)
            if self.return_index:
                return image, torch.tensor(text_ids), torch.tensor(text_atts), torch.tensor(text_ids_masked), torch.tensor(masked_pos), torch.tensor(masked_ids), index
            else: 
                return image, torch.tensor(text_ids), torch.tensor(text_atts), torch.tensor(text_ids_masked), torch.tensor(masked_pos), torch.tensor(masked_ids)
        
        else:
            n_pad = self.max_tokens - len(tokens)
            text_ids = text_ids + [self.pad_token_id] * n_pad
            text_atts = [1] * len(tokens) + [0] * n_pad
            if self.return_index:
                return image, torch.tensor(text_ids), torch.tensor(text_atts), index
            else:
                return image, torch.tensor(text_ids), torch.tensor(text_atts)
            

    def __getitem__(self, index):
        # call the __private_getitem__ method, but make it
        # more robust to errors with try-catching, retries and logging
        for _ in range(10):
            try:
                return self.__private_getitem__(index)
            except Exception as e:
                print(traceback.format_exc())
                print('encounter broken data: %s' % e)
                print('-'*20)
                sys.stdout.flush()
        
        error_path = self.get_image_path(index)
        raise ValueError(f"Failed to load data from {error_path} after 10 retries. Please check the data.")
    

    def __len__(self):
        return len(self.annotations)


class BlipPretrainDataset(Dataset):
    def __init__(self, config, transform) -> None:
        super().__init__()

        # set the json files; each file should be a json containing a list of dicts
        self.annotations = []
        if 'vg_file' in config:
            self.vg_file = config['vg_file']
            self.vg_image_root = config['vg_image_root']

            print(f"Loading Visual Genome data from {self.vg_file}")
            self.vg_data = json.load(open(self.vg_file, 'r'))
            print(f"Loading successful! (loaded {len(self.vg_data)} files)\n")
            self.annotations += self.vg_data
        
        if 'coco_file' in config:
            self.coco_file = config['coco_file']
            self.coco_image_root = config['coco_image_root']
            
            # load the annotations into memory
            print(f"Loading COCO data from {self.coco_file}")
            self.coco_data = json.load(open(self.coco_file, 'r'))
            print(f"Loading successful! (loaded {len(self.coco_data)} files)\n")
            self.annotations += self.coco_data
        
        
        if 'cc3m_file' in config:
            self.cc3m_file = config['cc3m_file']
            self.cc3m_image_root = config['cc3m_image_root']

            print(f"Loading CC3M data from {self.cc3m_file}")
            self.cc3m_data = json.load(open(self.cc3m_file, 'r'))
            print(f"Loading successful! (loaded {len(self.cc3m_data)} files)\n")
            self.annotations += self.cc3m_data
        

        if 'sbu_file' in config:
            self.sbu_file = config['sbu_file']
            self.sbu_image_root = config['sbu_image_root']

            print(f"Loading SBU Captions data from {self.sbu_file}")
            self.sbu_data = json.load(open(self.sbu_file, 'r'))
            print(f"Loading successful! (loaded {len(self.sbu_data)} files)\n")
            self.annotations += self.sbu_data

        # setup the dictionary keys to retrieve data in __getitem__
        self.image_key = config['image_key']
        self.caption_key = config['caption_key']
        self.dataset_key = config['dataset_key']

        # setup the image transformations
        self.transform = transform
        
        # setup the text transformations
        self.max_tokens = config['max_tokens']
        self.max_words = config['max_words']
        self.tokenizer = init_tokenizer()
        
        self.cls_token = self.tokenizer.cls_token
        self.eos_token = self.tokenizer.sep_token
        self.pad_token_id = self.tokenizer.pad_token_id

        # initialize the unique set of images of this dataset
        self.all_images = set([ann['image'] for ann in self.annotations])
        self.num_images = len(self.all_images)

        # this flag instruct to also return the index passed to __getitem__
        # it is useful for qualitative analysis
        self.return_index = config['return_index'] if 'return_index' in config else False
        self.image_res = config['image_res']


    def get_image_path(self, index):
        ann = self.annotations[index]
        # load the image into memory and transform it
        if ann[self.dataset_key] == "cc3m":
            image_root = self.cc3m_image_root
        elif ann[self.dataset_key] == "sbu":
            image_root = self.sbu_image_root
        elif ann[self.dataset_key] == "vg":
            image_root = self.vg_image_root
        elif ann[self.dataset_key] == "coco":
            image_root = self.coco_image_root
        return os.path.join(image_root, ann[self.image_key])


    def __private_getitem__(self, index):
        # grab the correct annotation
        ann = self.annotations[index]

        # load the image into memory and transform it
        if ann[self.dataset_key] == "cc3m":
            image_root = self.cc3m_image_root
        elif ann[self.dataset_key] == "sbu":
            image_root = self.sbu_image_root
        elif ann[self.dataset_key] == "vg":
            image_root = self.vg_image_root
        elif ann[self.dataset_key] == "coco":
            image_root = self.coco_image_root
        
        # prepend the root folder only if the image path is relative
        if not ann[self.image_key].startswith(image_root):
            image = Image.open(os.path.join(image_root, ann[self.image_key])).convert('RGB')
        else:
            image = Image.open(ann[self.image_key]).convert('RGB')

        # load the text into memory and transform it
        if isinstance(ann[self.caption_key], list):
            random_index = random.randint(0, len(ann[self.caption_key])-1)
            caption = ann[self.caption_key][random_index]
        elif isinstance(ann[self.caption_key], str):
            caption = ann[self.caption_key]
        else:
            raise ValueError(f"{self.caption_key} is neither str or a list of str in {ann}. Please fix this.")

        image = self.transform(image)
        caption = pre_caption(caption, self.max_words)
        if self.return_index:
            return image, caption, index
        else:
            return image, caption
        

    def __getitem__(self, index):
        # call the __private_getitem__ method, but make it
        # more robust to errors with try-catching, retries and logging
        for _ in range(10):
            try:
                return self.__private_getitem__(index)
            except Exception as e:
                print(traceback.format_exc())
                print('encounter broken data: %s' % e)
                print('-'*20)
                sys.stdout.flush()
        
        # if we get here, it means the 10 retries failed
        error_path = self.get_image_path(index)
        raise ValueError(f"Failed to load data from {error_path} after 10 retries. Please check the data.")
    

    def __len__(self):
        return len(self.annotations)
    
    def collate_fn(self, batch):
        images = torch.stack([b[0] for b in batch])
        captions = [b[1] for b in batch]
        text_input = self.tokenizer(
            captions,
            padding='max_length', 
            truncation=True, 
            max_length=30, 
            return_tensors="pt"
        )
        
        if self.return_index:
            indices = [b[-1] for b in batch]
            return images, text_input.input_ids, text_input.attention_mask, torch.tensor(indices, dtype=torch.int64)
        else:
            return images, text_input.input_ids, text_input.attention_mask
