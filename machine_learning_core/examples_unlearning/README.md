# Sparse Unlearn CIFAR10 with PyTorch

This is modified and sourced from NeurIPS 2023 spotlight paper repo [Model Sparsity Can Simplify Machine Unlearning](https://github.com/OPTML-Group/Unlearn-Sparse) from MSU [OPTML Group](https://github.com/OPTML-Group).

## Environment

```
# create and prepare a virtual environment
conda create -n modelsmith python=3.9
conda activate modelsmith
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

## Training to get a pretrained model

- Predefined models to train: ResNet18, ResNet34, ResNet50, ResNet101, ResNet152, VGG11, VGG13, VGG16, VGG19

```
# Start training with:
python train.py --arch=ResNet18 --epochs=100
```

## Sparse Unlearning

```
# Sparse Unlearning the pretrained model with:
python main_forget.py

# You will see retain accuracy, forget accuracy, validation acc, and test acc in the final output
```
