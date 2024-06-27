# Configure ModelSmith with Pruning, Quantization, and Machine Unlearning

This guide provides detailed steps to configure and train models using ModelSmith for pruning, quantization, and machine unlearning.

## Prerequisites

Before proceeding, ensure you have configured the project either locally or on a VM. Activate the `modelsmith` Conda environment as follows:

```bash
conda activate modelsmith
```

## Training the Models

In the `modelsmith` environment, train your models located within the `examples_quant`, `examples_pruning`, and `examples_unlearning` directories. Specify the number of epochs using the `--epochs` flag and the model architecture using the `--arch` parameter.

### Training for Quantization

Navigate to the `examples_quant` directory and use the following predefined models: `resnet18`, `resnet34`, `resnet50`, `resnet101`, `resnet152`, `resnext50_32x4d`, `resnext101_32x8d`, `wide_resnet50_2`, `wide_resnet101_2`.

Example command:

```bash
python3 machine_learning_core/examples_quant/train.py --arch=resnet18 --epochs=100
```

### Training for Pruning

Navigate to the `examples_pruning` directory and use the following predefined models: `ResNet18`, `ResNet34`, `ResNet50`, `ResNet101`, `ResNet152`, `VGG11`, `VGG13`, `VGG16`, `VGG19`.

Example command:

```bash
python3 machine_learning_core/examples_pruning/train.py --arch=ResNet18 --epochs=100
```

### Training for Machine Unlearning

Navigate to the `examples_unlearning` directory and use the following predefined models: `ResNet18`, `ResNet34`, `ResNet50`, `ResNet101`, `ResNet152`, `VGG11`, `VGG13`, `VGG16`, `VGG19`.

Example command:

```bash
python3 machine_learning_core/examples_unlearning/train.py --arch=ResNet18 --epochs=100
```
