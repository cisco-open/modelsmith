import os
import sys
from random import randint
import json

import traceback
import torch
from torch.utils.data import Dataset

from PIL import Image

from datasets.utils import pre_caption


def coco_karpathy_train_collate_fn(batch, tokenizer, max_tokens):
    # unravel the batch
    images, captions, ids = [], [], []
    for img, cap, img_id in batch:
        images.append(img)
        captions.append(cap)
        ids.append(img_id)

    # generate the individual tensors
    images = torch.stack(images)
    captions = tokenizer(
        captions,
        padding='longest',
        truncation=True,
        max_length=max_tokens,
        return_tensors="pt"
    )
    ids = torch.tensor(ids)
    return images, captions, ids


class CocoCaptionTrainDataset(Dataset):
    def __init__(self, ann_file_list, transform, image_root='images/coco', max_words=30, prompt=''):

        # load all the json files containing the annotations
        self.annotation = []
        for f in ann_file_list:
            self.annotation += json.load(open(f, 'r'))

        # setup useful class attributes
        self.transform = transform
        self.image_root = image_root
        self.max_words = max_words
        self.prompt = prompt

        # create a dictionary where the keys are the image ids,
        # and the values are ordered integers replacing the ids
        self.img_ids = {}
        n = 0
        for ann in self.annotation:
            img_id = ann['image_id']
            if img_id not in self.img_ids.keys():
                self.img_ids[img_id] = n
                n += 1

    def __len__(self):
        return len(self.annotation)

    def __private_getitem__(self, index):
        # load the annotation data
        ann = self.annotation[index]

        # load the image and apply transformations on top
        image_path = os.path.join(self.image_root, ann['image'])
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image)

        # preprocess the caption and prepend the prompt
        caption = self.prompt + pre_caption(ann['caption'], self.max_words)
        return image, caption, self.img_ids[ann['image_id']]

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
        error_path = os.path.join(
            self.image_root, self.annotation[index]['image'])
        raise RuntimeError(
            f"Failed to load data after 10 retries: {error_path}")


class CocoCaptionEvalDataset(Dataset):
    def __init__(self, ann_file, transform, image_root='images/coco'):
        self.annotation = json.load(open(ann_file, 'r'))
        self.transform = transform
        self.image_root = image_root

    def __len__(self):
        return len(self.annotation)

    def grab_image_id_from_image_path(self, image_path):
        # equivalent to the following commented code, but keeping the old
        # one for consistency
        # >>> img_basename = os.path.basename(image_path)
        # >>> img_name, ext = os.path.splitext(img_basename)
        # >>> id_as_a_string = img_name.split('_')[-1]
        # >>> return id_as_a_string
        return image_path.split('/')[-1].strip('.jpg').split('_')[-1]

    def __private_getitem__(self, index):

        ann = self.annotation[index]

        image_path = os.path.join(self.image_root, ann['image'])
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image)

        img_id = self.grab_image_id_from_image_path(image_path=ann['image'])
        return image, int(img_id)

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

        error_path = os.path.join(
            self.image_root, self.annotation[index]['image'])
        raise RuntimeError(
            f"Failed to load data after 10 retries: {error_path}")


