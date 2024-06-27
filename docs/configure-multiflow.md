# Multiflow Configuration Guide

This guide provides detailed steps to configure and set up the Multiflow project.

## Prerequisites

Before proceeding, ensure you have Conda installed on your system. If not, follow these steps to install it:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh  # Make sure to add it as a PATH variable
source ~/.bashrc
conda --version  # To check if it's installed
```

## Step-by-Step Configuration

### Step 1: Activate Conda Environment

```bash
conda activate modelsmith
```

### Step 2: Install Dependencies

```bash
pip install -r machine_learning_core/multiflow/deps/requirements.txt
```

### Step 3: Download Required Annotation Files

Run the provided script to download the required annotation files:

```bash
./machine_learning_core/multiflow/download_annots.sh
```

### Step 4: Install Additional Dependencies

```bash
pip install -r machine_learning_core/multiflow/deps/requirements.txt
```

### Step 5: Download and Prepare COCO Images

Download the COCO images from the [official website](https://cocodataset.org/#download). You need the `train2014`, `val2014`, and `test2015` images. Follow these step-by-step instructions:

1. Download and extract the `train2014` dataset:

   ```bash
   wget http://images.cocodataset.org/zips/train2014.zip -O coco_train2014.zip
   # If download is interrupted, use:
   curl -O -C - http://images.cocodataset.org/zips/train2014.zip -o coco_train2014.zip
   python3 -m zipfile -e coco_train2014.zip machine_learning_core/multiflow/images/coco/train2014
   rm coco_train2014.zip
   ```

2. Download and extract the `val2014` dataset:

   ```bash
   wget http://images.cocodataset.org/zips/val2014.zip -O coco_val2014.zip
   # If download is interrupted, use:
   curl -O -C - http://images.cocodataset.org/zips/val2014.zip -o coco_val2014.zip
   python3 -m zipfile -e coco_val2014.zip machine_learning_core/multiflow/images/coco/val2014
   rm coco_val2014.zip
   ```

3. Download and extract the `test2015` dataset:

   ```bash
   wget http://images.cocodataset.org/zips/test2015.zip -O coco_test2015.zip
   python3 -m zipfile -e coco_test2015.zip machine_learning_core/multiflow/images/coco/test2015
   rm coco_test2015.zip
   ```

### Step 6: Download and Prepare Visual Genome (VG) Images

1. Create the directory:

   ```bash
   mkdir -p machine_learning_core/multiflow/images/vg
   ```

2. Download and extract the VG images:

   ```bash
   wget https://cs.stanford.edu/people/rak248/VG_100K_2/images.zip -O vg_images_part1.zip
   python3 -m zipfile -e vg_images_part1.zip machine_learning_core/multiflow/images/vg
   rm vg_images_part1.zip

   wget https://cs.stanford.edu/people/rak248/VG_100K_2/images2.zip -O vg_images_part2.zip
   python3 -m zipfile -e vg_images_part2.zip machine_learning_core/multiflow/images/vg
   rm vg_images_part2.zip
   ```

3. Move the contents from `VG_100K` and `VG_100K_2` to the `machine_learning_core/multiflow/images/vg` directory:

   ```bash
   find machine_learning_core/multiflow/images/vg/VG_100K -type f -exec mv {} machine_learning_core/multiflow/images/vg/ \;
   find machine_learning_core/multiflow/images/vg/VG_100K_2 -type f -exec mv {} machine_learning_core/multiflow/images/vg/ \;

   # Remove the now empty directories
   rm -r machine_learning_core/multiflow/images/vg/VG_100K
   rm -r machine_learning_core/multiflow/images/vg/VG_100K_2
   ```

### Step 7: Download and Prepare Conceptual Captions 3M (CC3M) Dataset

1. Create the directory:

   ```bash
   mkdir -p machine_learning_core/multiflow/images/cc3m
   ```

2. Download and extract the archive:

   ```bash
   wget https://huggingface.co/datasets/liuhaotian/LLaVA-CC3M-Pretrain-595K/resolve/main/images.zip -O cc3m_images.zip
   python3 -m zipfile -e cc3m_images.zip machine_learning_core/multiflow/images/cc3m
   rm cc3m_images.zip
   ```

3. Download the CC3M annotation data inside `machine_learning_core/multiflow/data/pretrain`:

   ```bash
   wget https://huggingface.co/datasets/liuhaotian/LLaVA-CC3M-Pretrain-595K/resolve/main/metadata.json -O machine_learning_core/multiflow/data/pretrain/metadata.json
   ```

4. Transform the metadata:

   ```bash
   python transform_metadata.py machine_learning_core/multiflow/data/pretrain/metadata.json machine_learning_core/multiflow/data/pretrain/cc3m_pretrain.json cc3m
   ```

---

By following these steps, you will successfully configure and set up the Multiflow project.
