# ModelSmith Setup Guide

This guide provides detailed steps for setting up the ModelSmith environment on a virtual machine (VM). Follow these
steps to ensure a smooth and efficient setup.

## Step 1: Copy ModelSmith Folder

Start by updating the SSH path in the copy:modelsmith npm command to ensure proper access to your virtual machine. Once
the SSH path is set, use the following command to copy the ModelSmith folder into your virtual machine:

```bash
npm run copy:modelsmith
```

## Step 2: Copy kill_script.sh

Start by updating the SSH path in the copy:kill_script npm command to ensure proper access to your virtual machine. Once
the SSH path is set, use the following command to copy the kill_script file that it's beeing used to stop a process into
your virtual machine:

```bash
npm run copy:kill_script
```

## Step 3: Install Miniconda

Miniconda is a minimal installer for Conda, which we will use to manage our Python environments.

### Downloading Miniconda:

1. Use the following `wget` command to download the Miniconda installer script for Linux. This script is compatible with
   Python 3.9 and x86_64 architecture.

   ```bash
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
   ```

### Running the Installer:

2. Execute the downloaded script to install Miniconda on your VM:

   ```bash
   bash Miniconda3-latest-Linux-x86_64.sh
   ```

   - Follow the instructions in the installer.
   - Accept the default settings unless you have specific preferences.
   - Ensure that you allow the installer to add Conda to your PATH.

## Step 4: Restart Your Terminal

After installation, restart your terminal to refresh the environment settings.

## Step 5: Verify Miniconda Installation

Check that Miniconda is installed correctly:

```bash
conda --version
```

## Step 6: Create and Activate Virtual Environment

Create and activate a new virtual environment named 'pruning':

```bash
conda create -n pruning python=3.9
conda activate pruning
```

## Step 7: Install PyTorch

Install PyTorch within your 'pruning' environment:

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

## Step 8: Training the Model

To begin training the model, follow these steps:

1. Navigate to the `examples` directory within the `modelsmith` folder:

```bash
cd modelsmith/examples
```

2. Execute the training script or command located in this directory.

```bash
python train.py
```

Once these steps are completed, your ModelSmith environment will be ready for use on your VM.
