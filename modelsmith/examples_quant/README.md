# Quantization with PyTorch

Refer to README.md in examples folder for more details

## Environment

```
# create and prepare a virtual environment
conda create -n quantization_env python=3.9
conda activate quantization_env
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

# Post-training Quantization on CIFAR10 with PyTorch

## Quantizing

```
cd examples_quant
# first, train an initial model
python3 train.py

# second, start post-training quantization with:
python3 basic-ptq-example.py --n_bits_w 8 --channel_wise --n_bits_a 8 --order together --wwq --waq --awq --aaq --weight 0.01 --input_prob 0.5 --prob 0.5 --iters_w 100 --num_samples 128
python3 minmax-ptq-example.py --data_path ./data --checkpoint_path ./models_checkpoints
python3 brecq-example.py
```
