import json
import os
import sys

import traceback
from torch.utils.data import Dataset

from PIL import Image
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True
Image.MAX_IMAGE_PIXELS = None

from datasets.utils import pre_caption


class RetrievalTrainDataset(Dataset):
    def __init__(self, ann_file, transform, image_root, max_words=30):
        self.ann = []
        for f in ann_file:
            self.ann += json.load(open(f, 'r'))
        self.transform = transform
        self.image_root = image_root
        self.max_words = max_words
        self.img_ids = {}

        n = 0
        for ann in self.ann:
            img_id = ann['image_id']
            if img_id not in self.img_ids.keys():
                self.img_ids[img_id] = n
                n += 1

    def __len__(self):
        return len(self.ann)

    def __private_getitem__(self, index):

        ann = self.ann[index]
        image_path = os.path.join(self.image_root, ann['image'])
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image)

        caption = pre_caption(ann['caption'], self.max_words)
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
        error_path = os.path.join(self.image_root, self.ann[index]['image'])
        raise RuntimeError(f"Failed to load data after 10 retries: {error_path}")


class RetrievalEvalDataset(Dataset):
    def __init__(self, ann_file, transform, image_root, max_words=30):
        self.ann = json.load(open(ann_file, 'r'))
        self.transform = transform
        self.image_root = image_root
        self.max_words = max_words

        # raw captions
        self.text = []

        # image paths
        self.image = []

        # indices for retrieval
        self.txt2img = {}
        self.img2txt = {}

        txt_id = 0
        for img_id, ann in enumerate(self.ann):
            
            self.image.append(ann['image'])
            self.img2txt[img_id] = []
            
            for i, caption in enumerate(ann['caption']):
                
                # store the current caption in the text database
                cleaned_caption = pre_caption(caption, self.max_words)
                self.text.append(cleaned_caption)

                # populate the indices in both directions
                self.img2txt[img_id].append(txt_id)
                self.txt2img[txt_id] = img_id
                
                # update the id count
                txt_id += 1

    def __len__(self):
        return len(self.image)

    def __private_getitem__(self, index):
        
        ann = self.ann[index]
        image_path = os.path.join(self.image_root, ann['image'])
        image = Image.open(image_path).convert('RGB')
        image = self.transform(image)

        return image, index
    
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
        
        error_path = os.path.join(self.image_root, self.ann[index]['image'])
        raise RuntimeError(f"Failed to load data after 10 retries: {error_path}")
