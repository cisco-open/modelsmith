# PTQ4DiT Configuration Guide

This guide provides detailed steps to configure and set up the **PTQ4DiT (Post-training Quantization for Diffusion Transformers)** project.

## Step-by-Step Configuration

### Step 1: Navigate to the PTQ4DiT Directory

Change your current directory to the `PTQ4DiT` project folder.

```bash
cd ~/machine_learning_core/diffusion_model/PTQ4DiT
```

### Step 2: Activate the Conda Environment

Activate your existing Conda environment named `modelsmith`.

```bash
conda activate modelsmith
```

### Step 3: Update the Conda Environment

Ensure that all necessary dependencies for PTQ4DiT are installed by updating the Conda environment using the provided `environment.yml` file.

```bash
conda env update --file environment.yml --name modelsmith
```

### Step 4: Create Necessary Directories

Create directories for calibration data and pre-trained model checkpoints.

```bash
mkdir calib
mkdir -p pretrained_models
```

### Step 5: Download Pre-trained DiT Checkpoints

Navigate to the `pretrained_models` directory and download the required DiT checkpoints.

```bash
cd pretrained_models

# Download 256×256 DiT checkpoint
wget https://dl.fbaipublicfiles.com/DiT/models/DiT-XL-2-256x256.pt

# Download 512×512 DiT checkpoint
wget https://dl.fbaipublicfiles.com/DiT/models/DiT-XL-2-512x512.pt
```

**Note:** If you encounter any issues with `wget`, you can use `curl` as an alternative.

```bash
# Using curl to download 256×256 DiT checkpoint
curl -L https://dl.fbaipublicfiles.com/DiT/models/DiT-XL-2-256x256.pt -o DiT-XL-2-256x256.pt

# Using curl to download 512×512 DiT checkpoint
curl -L https://dl.fbaipublicfiles.com/DiT/models/DiT-XL-2-512x512.pt -o DiT-XL-2-512x512.pt
```

### Step 6: Generate Calibration Data (can be done from the Diffusion Model page)

Return to the `PTQ4DiT` directory and generate the calibration datasets. Replace `256` with `512` in the `--image-size` parameter if you wish to generate calibration data for 512×512 images.

```bash
cd ~/machine_learning_core/diffusion_model/PTQ4DiT

python get_calibration_set.py --model DiT-XL/2 --image-size 256 \
--ckpt pretrained_models/DiT-XL-2-256x256.pt \
--num-sampling-steps 50 \
--outdir calib/ --filename imagenet_DiT-256_sample4000_50steps_allst.pt \
--cfg-scale 1.5 --seed 1
```

**Parameters Explanation:**

- `--model`: Specifies the model variant (e.g., `DiT-XL/2`).
- `--image-size`: Image resolution (256 or 512).
- `--ckpt`: Path to the pre-trained checkpoint.
- `--num-sampling-steps`: Number of sampling steps.
- `--outdir`: Output directory for calibration data.
- `--filename`: Name of the output calibration file.
- `--cfg-scale`: Configuration scale parameter.
- `--seed`: Random seed for reproducibility.

### Step 7: Perform Quantization (can be done from the Diffusion Model page)

After generating the calibration data, perform quantization using the `quant_sample.py` script. You can specify different bit-widths and sampling steps as needed.

#### Example 1: Quantize to W8A8 for 256×256 Images

```bash
python quant_sample.py --model DiT-XL/2 --image-size 256 \
--ckpt pretrained_models/DiT-XL-2-256x256.pt \
--num-sampling-steps 50 \
--weight_bit 8 --act_bit 8 --cali_st 25 --cali_n 64 --cali_batch_size 32 --sm_abit 8 \
--cali_data_path calib/imagenet_DiT-256_sample4000_50steps_allst.pt --outdir output/ \
--cfg-scale 1.5 --seed 1 --ptq --recon
```

#### Example 2: Quantize to W4A8 for 512×512 Images

```bash
python quant_sample.py --model DiT-XL/2 --image-size 512 \
--ckpt pretrained_models/DiT-XL-2-512x512.pt \
--num-sampling-steps 50 \
--weight_bit 4 --act_bit 8 --cali_st 10 --cali_n 128 --cali_batch_size 16 --sm_abit 8 \
--cali_data_path calib/imagenet_DiT-512_sample4000_50steps_allst.pt --outdir output/ \
--cfg-scale 1.5 --seed 1 --ptq --recon
```

**Parameters Explanation:**

- `--weight_bit` & `--act_bit`: Specify the bit-width for weights and activations.
- `--cali_st`, `--cali_n`, `--cali_batch_size`: Calibration parameters.
- `--sm_abit`: Additional quantization parameter.
- `--cali_data_path`: Path to the calibration data.
- `--outdir`: Output directory for quantized models.
- `--ptq`: Enables post-training quantization.
- `--recon`: Enables reconstruction during quantization.

### Step 8: Perform Inference (can be done from the Diffusion Model page)

Use the quantized models for inference by resuming the calibration and running the inference algorithm.

#### Example 1: Inference with W8A8 for 256×256 Images

```bash
python quant_sample.py --model DiT-XL/2 --image-size 256 \
--ckpt pretrained_models/DiT-XL-2-256x256.pt \
--num-sampling-steps 50 \
--weight_bit 8 --act_bit 8 --cali_st 25 --cali_n 64 --cali_batch_size 32 --sm_abit 8 \
--cali_data_path calib/imagenet_DiT-256_sample4000_50steps_allst.pt --outdir output/ \
--cfg-scale 1.5 --seed 1 \
--resume --cali_ckpt output/256_88_50/ckpt.pth \
--ptq \
--inference --n_c 10
```

#### Example 2: Inference with W4A8 for 512×512 Images

```bash
python quant_sample.py --model DiT-XL/2 --image-size 512 \
--ckpt pretrained_models/DiT-XL-2-512x512.pt \
--num-sampling-steps 50 \
--weight_bit 4 --act_bit 8 --cali_st 10 --cali_n 128 --cali_batch_size 16 --sm_abit 8 \
--cali_data_path calib/imagenet_DiT-512_sample4000_50steps_allst.pt --outdir output/ \
--cfg-scale 1.5 --seed 1 \
--resume --cali_ckpt output/512_48_50/ckpt.pth \
--ptq \
--inference --n_c 5
```

## Troubleshooting

If you encounter issues, ensure:

- **Correct paths:** File paths exist and are accessible.
- **Matching versions:** PyTorch and diffusers are compatible.

---
