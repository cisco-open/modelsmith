# Refer to README.md in examples folder for more details

## Environment

```
# create and prepare a virtual environment
conda create -n pruning python=3.9
conda activate pruning
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

# Post-training Quantization on CIFAR10 with PyTorch

## Quantizing

```
cd examples_quant
# first, train an initial model
python train.py

# second, start post-training quantization with:
python basic-ptq-example.py --n_bits_w 8 --channel_wise --n_bits_a 8 --order together --wwq --waq --awq --aaq --weight 0.01 --input_prob 0.5 --prob 0.5 --iters_w 100 --num_samples 128
python basic-minmax-ptq-example.py --data_path ./data --checkpoint_path ./models_checkpoints
python brecq-example.py
```
# Prune CIFAR10 with PyTorch
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

```
# Start training with:
python train.py

# You can manually resume the training with:
python train.py --resume --lr=0.01
```
