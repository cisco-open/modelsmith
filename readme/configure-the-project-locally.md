# Configure ModelSmith Locally

This guide will walk you through the process of configuring ModelSmith to run on your local machine, specifically for those who wish to utilize their own GPU for running the Python scripts. The configuration process is divided into three main phases.

## Prerequisites

Before you can use this application, please ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.17.1 or higher)

If you don't have Node.js and npm installed, you can follow these steps to install them:

**Node.js:**

- Visit the [Node.js website](https://nodejs.org/).
- Download the installer for your operating system.
- Run the installer and follow the on-screen instructions.

To verify that you have successfully installed Node.js and npm, you can run the following commands in your terminal:

```bash
node -v
```

## Phase 1: Configure ModelSmith Python Environment

To get started, you need to set up the Python environment for ModelSmith. This involves creating a new Conda environment and installing the necessary packages. Follow these steps:

1. **Create and Activate a New Conda Environment**
   Open a terminal and run the following commands:

   ```bash
   conda create -n modelsmith python=3.9
   conda activate modelsmith
   ```

2. **Install PyTorch and Related Libraries**
   With the environment activated, install PyTorch, torchvision, and torchaudio for CUDA 11.8 by running:

   ```bash
   pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
   ```

3. **Train the Models**
   While beeing in the modelsmith environment (conda activate modelsmith), navigate to each of the following directories and run the `train.py` script with the epochs and arch parameters:

   - From `examples_quant` directory:

     - Predefined models to train: resnet18, resnet34, resnet50, resnet101, resnet152, resnext50_32x4d, resnext101_32x8d, wide_resnet50_2, wide_resnet101_2

     ```python
     python3 modelsmith/examples_quant/train.py --arch=resnet18 --epochs=100
     ```

   - From `examples_pruning` directory:

     - Predefined models to train: ResNet18, ResNet34, ResNet50, ResNet101, ResNet152, VGG11, VGG13, VGG16, VGG19

     ```python
     python3 modelsmith/examples_pruning/train.py --arch=ResNet18 --epochs=100
     ```

   - From `examples_unlearning` directory:

     - Predefined models to train: ResNet18, ResNet34, ResNet50, ResNet101, ResNet152, VGG11, VGG13, VGG16, VGG19

     ```python
     python3 modelsmith/examples_unlearning/train.py --arch=ResNet18 --epochs=100
     ```

## Phase 2: Run the Environment Setup Script

After configuring the Python environment, the next step involves setting up the project environment. This is done by executing the `setup_environment.sh` script located in the `utils` directory. The script performs several tasks, including setting up the `.env` file for the backend server.

Execute the script by running:

```bash
bash utils/setup_environment.sh
```

When asked about "Select the environment for model training:" -> choose 1. Local

### Example .env Configuration for Local GPU Usage

Below is an example configuration for the `.env` file, tailored for users intending to utilize a local GPU:

```
PORT=3000
MODELSMITH_PATH=../modelsmith
CONDA_SH_PATH=~/miniconda3/etc/profile.d/conda.sh
CONNECTION_TYPE=LOCAL
```

### .env file configuration explained

The `.env` file is crucial for defining environment-specific variables that configure how the backend server operates. Here's a breakdown of each property within the `.env` file for local GPU usage:

- **PORT**: Specifies the port number on which the backend server will listen. For instance, `3000` indicates that the server will be accessible at `http://localhost:3000`.

- **MODELSMITH_PATH**: Defines the path to the ModelSmith project directory. The example `../modelsmith` suggests that the ModelSmith directory is located one level up from the current directory.

- **CONDA_SH_PATH**: Indicates the path to the Conda environment script. This path is necessary for the script to activate the Conda environment correctly. In the given example, `~/miniconda3/etc/profile.d/conda.sh` points to the Conda initialization script for Miniconda installations.

- **CONNECTION_TYPE**: Determines the connection type for the model training environment. Setting this to `LOCAL` specifies that all operations, including model training and inference, will be performed on the local machine, utilizing the local GPU if available.

## Phase 3: Start the Project

Finally, to start ModelSmith:

1. Run the `start_modelsmith.sh` script to start both the frontend and backend servers:

   ```bash
   bash start_modelsmith.sh
   ```

2. Access the application by visiting `http://localhost:4200` in your web browser.

Congratulations! You have successfully configured ModelSmith to run locally. Enjoy optimizing your machine learning models with the power of your GPU.
