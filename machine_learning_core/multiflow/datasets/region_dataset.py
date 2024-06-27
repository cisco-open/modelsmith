import copy
import json
import random
import math
import traceback
import sys
from random import randint

import torch
from torch.utils.data import Dataset
from torchvision.transforms.functional import hflip, resize
from PIL import Image

from models.xvlm.tokenization_bert import BertTokenizer

from datasets.pretrain_dataset import TextMaskingGenerator
from datasets.utils import pre_caption



class RegionDataset(Dataset):
    def __init__(self, config, add_eos=False, box_transform=None):
        super(RegionDataset).__init__()

        assert 'region_files' in config, \
            "To use RegionDataset, you need to specify 'region_files' (a list) in the configuration file."
        
        # load the files into a unique list 
        self.annotations = []
        for region_file in config['region_files']:
            assert region_file.endswith('.json'), "Region file must be a json file."
            with open(region_file, 'r') as f:
                region_file_annotations = json.load(f)
                assert isinstance(region_file_annotations, list), "Each json file must contain a list of annotations."
                self.annotations.extend(region_file_annotations)
            print(f"Loaded {len(region_file_annotations)} annotations from {region_file}.")

        # setup the attributes of the class
        self.image_key = config['image_key']
        self.caption_key = config['caption_key']
        if 'batch_size' in config:
            self.batch_size = config['batch_size']
        elif 'batch_size_train' in config:
            self.batch_size = config['batch_size_train']
        else:
            raise ValueError("You must specify a batch size in the configuration file.")

        # setup text transformations
        self.add_eos = add_eos
        self.tokenizer = BertTokenizer.from_pretrained(config['text_encoder'])

        # grab special tokens from tokenizer
        self.cls_token = self.tokenizer.cls_token
        print("dataset.cls_token, ", self.cls_token, flush=True)
        self.eos_token = self.tokenizer.sep_token
        print("dataset.eos_token, ", self.eos_token, flush=True)
        self.pad_token_id = self.tokenizer.pad_token_id
        print("dataset.pad_token_id, ", self.pad_token_id, flush=True)
        self.mask_token_id = self.tokenizer.mask_token_id
        print("dataset.mask_token_id, ", self.mask_token_id, flush=True)

        # initialize the objects for MLM
        self.mask_generator = TextMaskingGenerator(self.tokenizer, config['mask_prob'],
                                                   config['max_masks'], config['skipgram_prb'],
                                                   config['skipgram_size'], config['mask_whole_word'])

        self.PAD_mask = -100
        self.max_words = config['max_words']
        self.max_tokens = config['max_tokens']
        self.max_masks = config['max_masks']

        # setup region transformations
        self.image_res = config['image_res']
        self.careful_hflip = config['careful_hflip'] if 'careful_hflip' in config else False
        self.box_transform = box_transform
        self.max_regions = config['max_regions']
        self.min_perc_in_image = config['min_perc_in_image']
        self.patch_size = config['patch_size']
        assert self.image_res % self.patch_size == 0
        self.num_patch = int(self.image_res / self.patch_size)


    def get_bbox(self, ann):
        x, y, w, h = ann['bb']
        return int(x), int(y), int(w), int(h)

    def left_or_right_in_caption(self, ann):
        """Check if the caption contains the words 'left' or 'right'"""
        def _in_it(elem):
            if isinstance(elem['caption'], list):
                for caption in elem['caption']:
                    if ('left' in caption) or ('right' in caption):
                        return True
            else:
                if ('left' in elem['caption']) or ('right' in elem['caption']):
                    return True

        if 'caption' in ann.keys():
            if _in_it(ann):
                return True

        for elem in ann['elems']:
            if _in_it(elem):
                return True

        return False

    def __private_getitem__(self, index):
        # grab the annotation
        ann = self.annotations[index]
        assert isinstance(ann, dict), "ann is not dict"

        # load the image
        image = Image.open(ann[self.image_key]).convert('RGB')
        W, H = image.size

        # randomly get one of the regions
        assert len(ann['elems']) > 0, "ann['elems'] is empty"
        random_elem = random.choice(ann['elems'])
        x, y, w, h = self.get_bbox(random_elem)
        assert (x >= 0) and (y >= 0) and (x + w <= W) and (y + h <= H) and (w > 0) and (h > 0), "elem invalid"

        # crop the image with some randomness
        x0, y0 = random.randint(0, math.floor(x)), random.randint(0, math.floor(y))
        x1, y1 = random.randint(min(math.ceil(x + w), W), W), random.randint(min(math.ceil(y + h), H), H)
        w0, h0 = x1 - x0, y1 - y0
        assert (x0 >= 0) and (y0 >= 0) and (x0 + w0 <= W) and (y0 + h0 <= H) and (w0 > 0) and (h0 > 0), "elem randomcrop, invalid"
        image = image.crop((x0, y0, x0 + w0, y0 + h0))
        W, H = image.size # this is needed since we changed the image, obviously

        # now we can start applying the transformations; the first is a random horizontal flip
        # however, we want to be careful to not flip the image if the caption contains the words 'left' or 'right'
        # since this would be confusing for the model
        do_hflip = False
        if random.random() < 0.5:
            if self.careful_hflip and self.left_or_right_in_caption(ann):
                pass
            else:
                image = hflip(image)
                do_hflip = True

        # finish the image transformation
        image = resize(image, [self.image_res, self.image_res], interpolation=Image.BICUBIC)
        image = self.box_transform(image)

        # now we can start processing the text
        text_ids_list = []
        text_ids_masked_list = []
        text_atts_list = []
        masked_pos_list = []
        masked_ids_list = []
        image_atts_list = []

        target_bbox_list = []
        is_image_list = []

        # if an image also has a full image caption, we add it to the list
        # this will force the model to understand that the caption refers to the whole image
        max_elems = self.max_regions
        if 'caption' in ann.keys():
            caption = random.choice(ann['caption']) if isinstance(ann['caption'], list) else ann['caption']
            text_ids, text_atts, text_ids_masked, masked_pos, masked_ids = self.preprocess(caption)

            text_ids_list.append(text_ids)
            text_atts_list.append(text_atts)
            text_ids_masked_list.append(text_ids_masked)
            masked_pos_list.append(masked_pos)
            masked_ids_list.append(masked_ids)

            image_atts_list.append([1] * (self.num_patch ** 2 + 1))
            target_bbox_list.append(torch.tensor([0.5, 0.5, 1, 1], dtype=torch.float))
            is_image_list.append(1)

            max_elems -= 1

        # shuffle elements
        elems = random.sample(ann['elems'], len(ann['elems']))

        # now we can add the regions themselves
        for elem in elems:
            if max_elems <= 0:
                break
            
            # grab the bbox
            x, y, w, h = self.get_bbox(elem)

            # check if the bbox is inside the cropped image
            xx, yy = max(x0, x), max(y0, y)
            xm, ym = min(x0 + w0, x + w), min(y0 + h0, y + h)
            if (xm > xx) and (ym > yy):
                if (xm - xx) * (ym - yy) / (w * h) > self.min_perc_in_image:
                    
                    # part inside the cropped image
                    x, y, w, h = xx, yy, xm - xx, ym - yy  

                    # axis transform: after crop
                    x = x - x0
                    y = y - y0

                    if do_hflip:  # flipped applied
                        x = (W - x) - w  # W is w0

                    # resize applied
                    x = self.image_res / W * x
                    w = self.image_res / W * w
                    y = self.image_res / H * y
                    h = self.image_res / H * h

                    # sample a random region annotation and augment it with a random attribute
                    caption = random.choice(elem['caption']) if isinstance(elem['caption'], list) else elem['caption']
                    if 'attributes' in elem.keys():
                        elem_attr = random.choice(elem['attributes']) if isinstance(elem['attributes'], list) else elem['attributes']
                        caption = elem_attr + ' ' + caption

                    # apply the text preprocessing to the region caption
                    text_ids, text_atts, text_ids_masked, masked_pos, masked_ids = self.preprocess(caption)
                    image_atts = self.get_image_attns(x, y, w, h)

                    text_ids_list.append(text_ids)
                    text_atts_list.append(text_atts)
                    text_ids_masked_list.append(text_ids_masked)
                    masked_pos_list.append(masked_pos)
                    masked_ids_list.append(masked_ids)
                    image_atts_list.append(image_atts)

                    # generate normalized bbox coordinates
                    center_x = x + 1 / 2 * w
                    center_y = y + 1 / 2 * h
                    target_bbox_list.append(torch.tensor([center_x / self.image_res, center_y / self.image_res,
                                                            w / self.image_res, h / self.image_res],
                                                            dtype=torch.float))

                    is_image_list.append(0)
                    max_elems -= 1

        # returned the cropped image, along with
        # - a list of text_ids (one for the full image caption, if any, and one for each region)
        # - a list of text_atts (one for the full image caption, if any, and one for each region)
        # - a list of text_ids_masked (one for the full image caption, if any, and one for each region)
        # - a list of masked_pos (one for the full image caption, if any, and one for each region)
        # - a list of masked_ids (one for the full image caption, if any, and one for each region)
        # - a list of image_atts (one for each region)
        # - a list of target_bbox (one for each region)
        # - a list of is_image (1 for the full image caption, if any, and 0 for each region)
        image_list = [image] if len(text_ids_list) else []
        return image_list, text_ids_list, text_atts_list, text_ids_masked_list, masked_pos_list, \
                masked_ids_list, image_atts_list, target_bbox_list, is_image_list
    
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
        error_path = self.annotations[index][self.image_key]
        raise ValueError(f"Failed to load image at {error_path} after 10 retries.")

    def __len__(self):
        return len(self.annotations)

    def get_image_attns(self, x, y, w, h):
        x_min = min(math.floor(x / self.patch_size), self.num_patch - 1)
        x_max = max(x_min+1, min(math.ceil((x+w) / self.patch_size), self.num_patch))  # exclude

        y_min = min(math.floor(y / self.patch_size), self.num_patch - 1)
        y_max = max(y_min+1, min(math.ceil((y+h) / self.patch_size), self.num_patch))  # exclude

        image_atts = [0] * (1 + self.num_patch ** 2)
        image_atts[0] = 1  # always include [CLS]
        for j in range(x_min, x_max):
            for i in range(y_min, y_max):
                index = self.num_patch * i + j + 1
                assert (index > 0) and (index <= self.num_patch ** 2), f"patch index out of range, index: {index}"
                image_atts[index] = 1

        return image_atts

    def collate_fn(self, batch_sample):
        batch = []
        for x in zip(*batch_sample):
            batch.append(x)

        images, batch = batch[0], batch[1:]

        idx_to_group_img = []
        img_idx = -1
        for sample in batch[0]:
            n_elems = len(sample)
            if n_elems > 0:
                img_idx += 1
                idx_to_group_img.extend([img_idx] * n_elems)  # flatten

        batch_size = self.batch_size
        n_elems = len(idx_to_group_img)
        to_keep = list(range(n_elems))
        if n_elems >= batch_size:
            to_keep = random.sample(to_keep, batch_size)
        else:
            # fixed batch_size is required. otherwise, the process will be blocked. so, i do pad here.
            # but pad causes wrong calculation for contrastive learning.
            # Set appropriate batch_size, max_images, and max_regions to avoid frequent padding.
            try:
                to_pad = random.sample(to_keep, batch_size - n_elems)
                to_keep += to_pad
                print("### warning: pad region_batch by sampling, ", len(to_pad), flush=True)

            except ValueError:
                print("### warning: pad region_batch by expanding, ", batch_size-len(to_keep), flush=True)
                to_keep = (to_keep * math.ceil(batch_size/len(to_keep)))[:batch_size]

        images = torch.stack(sum(images, []))  # flatten
        idx_to_group_img = torch.tensor([idx_to_group_img[index] for index in to_keep], dtype=torch.long)

        batch_tensors = [images, idx_to_group_img]
        for x in [sum(x, []) for x in batch]:

            x = [x[index] for index in to_keep]

            if x[0] is None:
                batch_tensors.append(None)
            elif isinstance(x[0], torch.Tensor):
                batch_tensors.append(torch.stack(x))
            else:
                batch_tensors.append(torch.tensor(x, dtype=torch.long))

        return batch_tensors

    def preprocess(self, text):
        text = pre_caption(text, self.max_words) 
        tokens = self.tokenizer.tokenize(text)
        tokens = [self.cls_token] + tokens[:self.max_tokens - 1]

        if self.add_eos:
            tokens = tokens[:self.max_tokens - 1]
            tokens += [self.eos_token]

        n_tokens = len(tokens)
        assert n_tokens >= 2, "len(word tokens) < 2"

        text_ids = self.tokenizer.convert_tokens_to_ids(tokens)  # list of int

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
    
