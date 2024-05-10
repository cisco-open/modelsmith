# Prune CIFAR10 with PyTorch

## Environtment

```
# create and prepare a virtual environment
conda create -n modelsmith python=3.9
conda activate modelsmith
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

## Pruning

```
# Pruning at initialization with random pruning
# init_pruning_random.ipynb

# Pruning at initialization with magnitude-based pruning
# init_pruning_magnitude.ipynb

# Pruning at initialization with Grasp
# init_pruning_grasp.ipynb

# Iterative pruning + retraining
# iterative_magnitude_pruning.ipynb

# oneshot pruning + retraining
# oneshot_magnitude_pruning.ipynb
```

## Training

- Predefined models to train: ResNet18, ResNet34, ResNet50, ResNet101, ResNet152, VGG11, VGG13, VGG16, VGG19

```
# Start training with:
python3 train.py --arch=ResNet18 --epochs=100

# You can manually resume the training with:
python3 train.py --resume --lr=0.01
```
