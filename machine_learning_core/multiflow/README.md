# [CVPR 2024] MULTIFLOW: Shifting Towards Task-Agnostic Vision-Language Pruning
Official implementation of the paper "MULTIFLOW: Shifting Towards Task-Agnostic Vision-Language Pruning", CVPR 2024.  

[![arXiv](https://img.shields.io/badge/arXiv-2404.05621-b31b1b.svg)](https://arxiv.org/abs/2404.05621)

**Authors**: [Matteo Farina](https://scholar.google.com/citations?user=SxQwDD8AAAAJ&hl=it&oi=ao), [Massimiliano Mancini](https://scholar.google.com/citations?hl=it&user=bqTPA8kAAAAJ), [Elia Cunegatti](https://scholar.google.com/citations?hl=it&user=a2JJRjMAAAAJ), [Gaowen Liu](https://scholar.google.com/citations?hl=it&user=NIv_aeQAAAAJ), [Giovanni Iacca](https://scholar.google.com/citations?hl=it&user=qSw6YfcAAAAJ), [Elisa Ricci](https://scholar.google.com/citations?hl=it&user=xf1T870AAAAJ).

In this work we investigated the possibility of pruning Vision-Language Models *once* while maintaining transferability to *unknown* downstream tasks.
We also presented `MULTIFLOW`, a simple and fast pruning algorithm for Vision-Language Models.


Happy to see you here ✨

## Updates 🗞️
[April 29th, 2024] - The pruning masks for all models are now available [here](https://drive.google.com/drive/folders/11DDZsEFV86YsXHFvLqIXHL_prwsNaqpg?usp=drive_link) ✂️  
[April 9th, 2024] - Code Released! I am working on a tutorial on how to add support for arbitrary `nn.Module` instances. Stay tuned!  
[March 8th, 2024] - Public Repo online, the code will be out very soon!  

## Install all dependencies 💻
This project was developed with Python-3.10.8 and tested under Ubuntu-22.04. You can find all dependencies in the `deps` folder, both as a standard list of pip requirements and as a conda environment. To create a conda environment for this project, run `conda env create -f deps/environment.yaml`. To install dependencies using pip, run `pip install -r deps/requirements.txt`.

## Get the annotations  ✏️
Before going through the rest of this README, download all the `tar.gz` files you can find at this [public link](https://drive.google.com/drive/folders/1-9rgEtZfMwMpfdqaREewX32pRzCXu57D?usp=drive_link), put them under the root of this repo and extract them. To avoid downloading all of them manually, you can run `./download_annots.sh`. 

## Get the images 📸
To use this repo, you need to get quite some images from the web. 
I recommend you put all of the images you download under the `images` folder, such that your `images` folder has the following structure:  
```
images/
|   coco/
|   |   train2014/
|   |       # list of images
|   |   val2014/
|   |       # list of images
|   |   test2015/
|   |       # list of images
|
|   vg/
|   |   # list of images
|
|   cc3m/
|   |   # shards or list of images
|
|   sbu/
|   |   # shards or list of images

```

### COCO and Visual Genome
Please download the COCO Images from the [official website](https://cocodataset.org/#download). You need the `train2014`, `val2014` and `test2015` images. 
  
For Visual Genome, you can also rely on the [official website](https://homes.cs.washington.edu/~ranjay/visualgenome/api.html). For this dataset, you need all images from `v1.2`.  

For COCO and VisualGenome you don't need to create any annotation file as long as you organize the images as shown above. The ones you downloaded should do the work 🫡


### Sad caveat for SBU and CC3M 🥲
For SBU Captions and Conceptual Captions 3M, I recommend using [img2dataset](https://github.com/rom1504/img2dataset).  

**Important!** These datasets contains <url, caption> pairs, and some urls may expire over time. You cannot directly rely on the annotations I provided for these two datasets (`cc3m_pretrain.json` and `sbu_pretrain.json` in `data/pretrain`). 

However, you can use them to understand how to prepare your annotation files according to which images you were ultimately able to download. **For both datasets, you need to prepare a `.json` file containing a list of dictionaries, one for each <img, caption> pair**. Each dictionary must have the following simple structure:
```
{
    "image": "relative/path/to/the/image",
    "caption": "i think you get it",
    "dataset": "cc3m" || "sbu"
}
```

The "image" key must contain the relative path according to the `cc3m_image_root` and `sbu_image_root` variables in the .yaml files within the `configs`, which are by default set to `images/cc3m/` and `images/sbu/` as shown above.  


## Pruning ✂️
The entrypoint for pruning all models is `prune.py`.
By default, pruning runs with FP32 precision and with a single GPU device. All pruners work with a centralized function `Pruner.prune(*args, **kwargs)` which exposes a shared signature.  

### Supported Pruners 🧞‍♀️  
1. `SNIP`, from [Lee *et al.*](https://arxiv.org/abs/1810.02340)
2. `IterSNIP`, from [De Jorge *et al.*](https://arxiv.org/abs/2006.09081)
3. `OMP` and `LocalMP`: One-shot and Layer-wise Magnitude Pruning
4. `LayerWiseL2Norm`: a simple pruning strategy that normalizes the magnitude of each tensor by its Frobenius norm before global pruning (*i.e.*, $\ell_2$ norm of the flattened tensor)
4. `LAMP`: Layer-Adaptive Sparsity for Magnitude Pruning, from [Lee *et al.*](https://arxiv.org/abs/2010.07611)
1. `CHITA`: Combinatorial Hessian-free Iterative Thresholding Algorithm, from [Benbaki *et al.*](https://arxiv.org/pdf/2302.14623.pdf)
1. `CHITA++`, *i.e.*, the iterative version of (5), also from [Benbaki *et al.*](https://arxiv.org/pdf/2302.14623.pdf)
1. `TAMT`: Task-Agnostic Mask Training, from [Liu *et al.*](https://arxiv.org/abs/2204.11218)
1. `MULTIFLOW`, ours 🫡

### Supported Models 🧞‍♂️
1. `XVLM` from [Zeng *et al.*](https://arxiv.org/abs/2111.08276)
1. `BLIP` from [Li *et al.*](https://arxiv.org/abs/2201.12086)
1. `DINO` from [Caron *et al.*](https://arxiv.org/abs/2104.14294)

**Which data do I need for Pruning?** To reproduce the results of the paper, you need CC3M and VisualGenome to prune `XVLM` and `BLIP`, so make sure to follow [these instructions](#sad-caveat-for-sbu-and-cc3m-🥲). If you want to prune `DINO`, then you also need ImageNet. When following [Get the annotations](#get-the-annotations-✏️), you may have noticed that you now have a `data/imagenet` folder with some `annots`. You can now download images from this [Kaggle challenge](https://www.kaggle.com/c/imagenet-object-localization-challenge/data). For pruning you only need the train split, which is already organized for standard `ImageFolder` support.  When your download has finished, put the entire `train` folder under `data/imagenet`, such that you will have `data/imagenet/annots` and `data/imagenet/train`. The images in `data/imagenet/train` are organized in folders, each named after the WordNet synset of the class. A mapping from synset to the class name is handled by the code; you don't have to do anything other than downloading the images and putting them in the right place.

**Running the pruners.** I am working on a tutorial / guide on how to add support for arbitrary `torch.nn.Module` instances. Stay tuned!

This is what you see if you run `python prune.py --help`:
```
usage: prune.py [-h] -p {omp,rand,snip,itersnip,lamp,chita,tamt,l2,multiflow} -m {xvlm,blip,dino} [-s SPARSITIES] [--seed SEED] [--num_batches NUM_BATCHES]
                [-e EPOCHS] [--schedule {linear,exp,const}] [--output_dir OUTPUT_DIR] [--lambda_ LAMBDA_]

optional arguments:
  -h, --help            show this help message and exit
  -p {omp,rand,snip,itersnip,lamp,chita,tamt,l2,multiflow}, --pruner {omp,rand,snip,itersnip,lamp,chita,tamt,l2,multiflow}
  -m {xvlm,blip,dino}, --model {xvlm,blip,dino}
  -s SPARSITIES, --sparsities SPARSITIES
                        comma separated list of sparsities to prune at. Default: 63,75,90
  --seed SEED           Seed for the random number generator. Default: 42
  --num_batches NUM_BATCHES
                        number of batches to use. If epochs > 1, then these will be the batches used at each pruning iteration. If epochs == 1, then these
                        will be the total batches processed. Default: 3000.
  -e EPOCHS, --epochs EPOCHS
                        the total number of pruning iterations. This argument is only used by pruners relying on iterations, so IterSNIP and CHITA++. If you
                        select the pruner 'chita' and provide this value greater than 1, it will directly run CHITA++. Default: 1
  --schedule {linear,exp,const}
                        schedule for IterSNIP/CHITA++. Default: exp
  --output_dir OUTPUT_DIR
                        directory where to dump the pruned weights. Default: ./pruned_weights
  --lambda_ LAMBDA_     ridge penalty for CHITA and CHITA++, unused otherwise. Please see our Supp. Mat. on how to set this! Default: 1e-5
```  
The default arguments of the script let you run `MULTIFLOW` without modifications (~5 minutes). For example, to prune XVLM with `MULTIFLOW`, simply run:  
```
python prune.py --model xvlm --pruner multiflow
```

The script dumps pruning masks at all the given sparsities (default 63%, 75% and 90%) and saves them in `pruned_weights/<pruner_name>`. 
You will also find a .csv file with the runtime per execution, and the outcome of the scoring function for score-based pruning algorithms. You can then use the pruning masks for sparse model finetuning (SEE BELOW).


**Remark.** Please note that, in order to accurately reproduce the results in the paper, you cannot always use the default values in the script. For example, with `IterSNIP` and `CHITA++` you should set `--num_batches 50` and `--epochs 60`. For `CHITA` and `CHITA++` you must also pay lots of attention to the `--lambda_` argument; see our Supplementary Material. 

## Finetuning 🏋️ 
This repository supports dense or sparse model finetuning for 3 different Vision-Language tasks: Image-Text Retrieval, Image Captioning and Visual Question Answering. Additionally, it includes a simple unimodal experiment on Image Classification. 

All finetuning scripts support the following features:  
1. Seamless Distributed Training with [Lightning Fabric](https://lightning.ai/docs/fabric/stable/). To distribute on N devices, simply pass `--devices N` to the scripts, without any changes to the code or setting any environment variable. By default, scripts run with only one device. In all experiments, I have used single-node, multi-gpu training with 4 NVIDIA A100 GPUs;  
2. Logging with [Weights & Biases](https://wandb.ai). To activate it, pass the `--wandb` flag. Each .yaml file in the configs contains a `wandb_data` setting which you can edit. You can also pass `--wdb_offline` to avoid online syncing (*e.g.*, if you run on compute nodes without internet access).  
3. Sparse or Dense mode. If you pass a `--mask` argument, then it will be used as the pruning mask throughout training. If you pass the `--dense` flag, it will override any given pruning mask and the dense model will be trained.
4. A debugging mode, which you can activate passing `--debug`. You can use this feature to run every finetuning script for a few steps per epoch, making sure you have everything set up properly. In debugging mode, each finetuning takes approximately 20 minutes.

### Image-Text Retrieval 
For this task you must have downloaded the images from COCO. By default, the config files for finetuning are `configs/<model_name>/retrieval.yaml`, and the annotation files are `data/finetune/itr/coco_{train|val|test}.json`. If you followed [Get the annotations](#get-the-annotations-✏️) you should have everything at this stage.  

The entrypoint is `retrieval.py`. Please run `python retrieval.py --help` for the complete list of arguments.  

### Image Captioning  
This task also uses images from COCO, so you still don't need to prepare any annotation file. By default, the configs are `configs/<model_name>/captioning.yaml`, and the annotation files are in `data/finetune/ic/`. 

The entrypoint is `captioning.py`.

Evaluation for Image Captioning is done using the official [pycocotools APIs](https://github.com/cocodataset/cocoapi), which rely on a legacy implementation of Stanford's PTB Tokenizer in Java. Thus, you need to make sure a JRE is successfully installed on your machine. If you don't have one, you can install both a JRE and a JDK with the following commands:
```
sudo apt install default-jre
sudo apt install default-jdk
```
For convenience, you can generate captions and skip the evaluation by passing the `--skip_eval` flag. This is useful if, for instance, your compute nodes do not have a JRE/JDK, so you can transfer the generated captions to a different machine and evaluate everything when training has finished. 

**2-Stage Image Captioning.** Only for XVLM models, you can also run a warmup pretraining tailored to Image Captioning with `captioning_pretrain.py` for both dense or pruned models. In short, it optimizes a Language Modelling loss for 1epoch on the 4M Dataset. For this, **you also need annotations for SBU and CC3M**, so please follow [the instructions above](#sad-caveat-for-sbu-and-cc3m-🥲). The script will dump a `last.pt` checkpoint, which you shall then pass as the `--pretraining_weights` argument to `captioning.py`. If so, make sure to also set the `--load_capt_pretrain` flag to `captioning.py` when loading weights from the first stage of finetuning.

Please run `python captioning.py --help` and/or `python captioning_pretrain.py --help` for the complete lists of arguments.

### Visual Question Answering
For this task, you need all the images from COCO as well as from VisualGenome, so make sure you have followed [COCO and VisualGenome](#coco-and-visual-genome). You don't need to prepare any annotation file. The default configs are `configs/<model_name>/vqa.yaml`, and the annotation files are in `data/finetune/vqa/`. VQA is NOT performed with open-ended answer generation. Instead, it is implemented with answer ranking, which is why you have a `data/finetune/vqa/answer_list.json`. As it is customary for the evaluation for VQA, the training dataset includes:  
1. image-question pairs from the train and validation splits of the [VQA2.0 Dataset](https://arxiv.org/pdf/1612.00837.pdf) (`data/finetune/vqa/vqa_{train|val}.json`), which uses images from COCO;
2. image-question pairs from Visual Genome (`data/finetune/vqa/vg_qa.json`).  

The entrypoint is `vqa.py`.

The evaluation for VQA is done by answering to all questions in `data/finetune/vqa/vqa_test.json`, which contains the *test-dev* partition of the VQA2.0 dataset. **The groundtruth answers for this partition are NOT public!** You need to evaluate the generated answers against the official [evaluation website](https://eval.ai/web/challenges/challenge-page/830/overview) at EvalAI. You can do so by uploading the JSON file in the `<output_dir>/result` folder when the script terminates.  


## Unimodal Experiment: Image Classification with DINO
This section contains the instructions to run image classification with pruned DINO models. 
The entrypoint for this simple experiment is `image_classification.py`.  

By the time of code release, the script supports 3 datasets: CIFAR10, CIFAR100 and Flowers102. 
You can select which dataset you want to use by passing the `--dataset` argument. 

**Get the images (again).** For CIFAR10 and CIFAR100, both datasets are automatically downloaded via the standard torchvision APIs, so you don't have to do anything. If you want to use Flowers102, please download all the images from the [official website](https://www.robots.ox.ac.uk/~vgg/data/flowers/102/). If you have followed [Get the annotations](#get-the-annotations-✏️), you will now have a `data/flowers102/` folder which contains some `annots`. Once you have downloaded the images, put them all in `data/flowers102/images` and you're set 🤓

**Run the experiment.** You can now run `image_classification.py` passing an appropriate `--mask` argument or the `--dense` flag. If you use the default arguments, you should be able to reproduce the results in the paper. 

Unluckily, there is no support for logging with Weights & Biases for this script. However, the code is wrapped with Lightning Fabric, so you can use it as a template to build multi-device unimodal finetuning. Please bear in mind that I have always used only one GPU device for the experiments of the main paper.

### Citation
Thank you for taking an interest in our work! If you found our paper or some of this code useful, please consider citing:
```
@article{farina2024multiflow,
  title={MULTIFLOW: Shifting Towards Task-Agnostic Vision-Language Pruning},
  author={Farina, Matteo and Mancini, Massimiliano and Cunegatti, Elia and Liu, Gaowen and Iacca, Giovanni and Ricci, Elisa},
  journal={arXiv preprint arXiv:2404.05621},
  year={2024}
}
```

### Acknowledgements
We acknowledge the CINECA award under the ISCRA initiative for the availability of high-performance
computing resources and support. Elisa Ricci and Massimiliano Mancini are supported by the MUR PNRR project FAIR - Future AI Research (PE00000013), funded by NextGeneration EU. Elisa Ricci is also supported by the EU projects AI4TRUST (No.101070190) and ELIAS (No.01120237). Matteo Farina is supported by the PRIN project LEGO-AI (Prot.2020TA3K9N) and the PAT project “AI@TN”. This work was also partially sponsored by a Cisco Research Grant.

Matteo Farina publicly thanks Simone Caldarella for the help in testing and re-organizing the code, and Caterina Pomini for the precious help in designing Fig.1 of the paper. 

Parts of this code are based on [XVLM](https://github.com/zengyan-97/X-VLM), [BLIP](https://github.com/salesforce/BLIP) (VLMs), [SparseGPT](https://github.com/IST-DASLab/sparsegpt), [Wanda](https://github.com/locuslab/wanda) (LLM Pruning), [NTK-SAP](https://github.com/YiteWang/NTK-SAP) and [CHITA](https://github.com/mazumder-lab/CHITA) (Pruning of "medium-sized" models).
We deeply thank all authors for releasing their code! 🙏  

### Contact 📧
Feel free to contact me at *m.farina@unitn.it* or to open an issue if you need support to use this code, I will do my best to help. 
