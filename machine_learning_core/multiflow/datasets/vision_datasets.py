import os
import torch
import torchvision
import pandas as pd

from PIL import Image
from pathlib import Path
from torchvision.datasets import CIFAR10, CIFAR100
from torch.utils.data import default_collate


class Flowers102(torch.utils.data.Dataset):
    def __init__(self, root, split, transform, merge_with_val=False):
        super().__init__()

        assert split in ["train", "val", "test"]

        self.root = root
        self.image_root = Path(self.root, "images")
        self.split = split
        self.transform = transform
        self.merge_with_val = merge_with_val

        # load the dataframe and build a mapping from image path to label
        self.split_df = pd.read_csv(Path(self.root, "annots", "split.csv"))
        self.split_df = self.split_df[self.split_df["split"] == self.split]

        # also collate the validation set to the training set if merge_with_val is True
        if self.split == "train" and self.merge_with_val:
            val_df = pd.read_csv(Path(self.root, "annots", "split.csv"))[pd.read_csv(Path(self.root, "annots", "split.csv"))["split"] == "val"]
            self.split_df = pd.concat([self.split_df, val_df])
        
        # load the metadata, which contain the class names together with the class indices, and build a mapping from class index to class name
        self.metadata = pd.read_csv(Path(self.root, "annots", "metadata.csv"))
        self.idx2name = {}
        self.name2idx = {}
        for i, row in self.metadata.iterrows():
            self.idx2name[row["idx"]] = row["class_name"]
            self.name2idx[row["class_name"]] = row["idx"]

        # build a mapping from image to label
        self.img2label = {}
        for i, row in self.split_df.iterrows():
            image_path = Path(self.image_root, row["filename"])
            class_idx = self.name2idx[row["class"]]
            self.img2label[image_path] = class_idx
        
        self.classes = list(self.idx2name.values())
        self.images = list(self.img2label.keys())

        self.collate_fn = default_collate

    def __len__(self):
        return len(self.images)
    
    def __getitem__(self, index):
        image_path = self.images[index]
        image = Image.open(image_path).convert("RGB")
        label = self.img2label[image_path]
        if self.transform is not None:
            image = self.transform(image)
        return image, label
    
    def __repr__(self):
        return f"Flowers102 Dataset ({self.split} split {'(merged with val samples)' if self.merge_with_val else ''}), {len(self.images)} images)"


class ImageNet(torchvision.datasets.ImageFolder):
    def __init__(self, root, split, transform):
        
        self.child_root = root
        self.split = split
        self.root_for_image_folder = Path(self.child_root, self.split)
        super().__init__(root=self.root_for_image_folder, transform=transform)

        # given that we are subclassing ImageFolder, we our "get item" method is already implemented
        # here, we only need to map the folder names (e.g. "n01440764") to the class names (e.g. "tench")
        # however, initializing the "ImageFolder" parent class will override the "root" attribute, so we handle this here
        self.metadata = pd.read_csv(Path(self.child_root, "annots", "metadata.csv"))
        self.folder2class = {}
        for i, row in self.metadata.iterrows():
            self.folder2class[row['folder_name']] = row['class_name']

        self.collate_fn = default_collate



def get_dataset(dataset_name, data_dir, train_transform, test_transform, **kwargs):
    if dataset_name == "cifar100":
        train_dataset = CIFAR100(data_dir, train=True, download=True, transform=train_transform)
        test_dataset = CIFAR100(data_dir, train=False, download=True, transform=test_transform)
        classes = train_dataset.classes
        num_classes = len(classes)
    elif dataset_name == "cifar10":
        train_dataset = CIFAR10(data_dir, train=True, download=True, transform=train_transform)
        test_dataset = CIFAR10(data_dir, train=False, download=True, transform=test_transform)
        classes = train_dataset.classes
        num_classes = len(classes)
    elif dataset_name == "flowers102":
        train_dataset = Flowers102(data_dir, split="train", transform=train_transform, merge_with_val=kwargs.get("merge_with_val", True))
        test_dataset = Flowers102(data_dir, split="test", transform=test_transform)
        classes = train_dataset.classes
        num_classes = len(classes)
    elif dataset_name == "imagenet":
        train_dataset = ImageNet(data_dir, split="train", transform=train_transform)
        test_dataset = ImageNet(data_dir, split="val", transform=test_transform)
        classes = train_dataset.classes
        num_classes = len(classes)
    else:
        raise NotImplementedError(f"Dataset {dataset_name} not implemented")
    
    return train_dataset, test_dataset, classes, num_classes