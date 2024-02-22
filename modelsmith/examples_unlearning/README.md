# Sparse Unlearn CIFAR10 with PyTorch

## Environtment
```
# create and prepare a virtual environment
conda create -n pruning python=3.9
conda activate pruning
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

## Training to get a pretrained model
```
# Start training with: 
python train.py
```

## Sparse Unlearning
```
# Sparse Unlearning the pretrained model with:
python main_forget.py

# You will see retain accuracy, forget accuracy, validation acc, and test acc in the final output
```


