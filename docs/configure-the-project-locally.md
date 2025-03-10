# Configure ModelSmith Locally

This guide will walk you through the process of configuring ModelSmith to run on your local machine, specifically for those who wish to utilize their own GPU for running the Python scripts. The configuration process is divided into three main phases.

## Prerequisites

Before you can use this application, please ensure that you have the following installed on your system:

- Node.js v20.15.1
- npm v10.7.0

If you don't have Node.js and npm installed, you can follow these steps to install them:

**Node.js:**

- Visit the [Node.js v20.15.0 website](https://nodejs.org/en/blog/release/v20.15.0).
- Download the installer for your operating system.
- Run the installer and follow the on-screen instructions.

To verify that you have successfully installed Node.js and npm, you can run the following commands in your terminal:

```bash
node -v
```
Ensure it displays v20.15.0.

**npm:**

```bash
npm install --global npm@10.7.0
```
Ensure it displays v10.7.0.

## Phase 1: Configure ModelSmith Python Environment

To get started, you need to set up the Python environment for ModelSmith. This involves creating a new Conda environment and installing the necessary packages. Follow these steps:

1. **Install Miniconda**: Miniconda is a minimal installer for Conda, which is an open-source package management system and environment management system. Installing Miniconda on the VM will help manage the Python environment and dependencies required for the ModelSmith project. Here's how to download and install Miniconda:

   1.1. Download the Miniconda installer for Linux:

   ```bash
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
   ```

   1.2. Make the installer script executable:

   ```bash
   chmod +x Miniconda3-latest-Linux-x86_64.sh
   ```

   1.3. Run the installer script:

   ```bash
   ./Miniconda3-latest-Linux-x86_64.sh
   ```

   Follow the on-screen prompts to complete the installation. It is generally safe to accept the default installation settings. Make sure to agree to initialize Miniconda by running `conda init`.

   1.4. After installation, restart your terminal or source your `.bashrc` file to make the `conda` command available:

   ```bash
   source ~/.bashrc
   ```

   1.5. Verify the installation by checking the Conda version:

   ```bash
   conda --version
   ```

2. **Create and Activate a New Conda Environment**
   Open a terminal and run the following commands:

   ```bash
   conda create -n modelsmith python=3.9
   conda activate modelsmith
   ```

3. **Install PyTorch and Related Libraries**
   With the environment activated, install PyTorch, torchvision, and torchaudio for CUDA 11.8 by running:

   ```bash
   pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
   ```

4. **Configure Pruning, Quantization, Machine Unlearning Python Projects**:

   Please refer to the [Pruning, Quantization, Machine Unlearning Configuration Guide](configure-pruning-quant-ml.md) for detailed instructions.

5. **Configure AutoAWQ for Model Quantization**:

   Please refer to the [AutoAWQ Configuration Guide](configure-autoawq.md) for detailed instructions.

6. **Configure Multiflow Python Project**:

   Please refer to the [Multiflow Configuration Guide](configure-multiflow.md) for detailed instructions.

## Phase 2: Run the Environment Setup Script

After configuring the Python environment, the next step involves setting up the project environment. This is done by executing the `setup_environment.sh` script located in the `backend` directory. The script performs several tasks, including setting up the `.env` file for the backend server.

Execute the script by running:

```bash
bash backend/setup_environment.sh
```

When asked about "Select the environment for model training:" -> choose 1. Local

### Example .env Configuration for Local GPU Usage

Below is an example configuration for the `.env` file, tailored for users intending to utilize a local GPU:

```
PORT=3000
MACHINE_LEARNING_CORE_PATH=../machine_learning_core
CONDA_SH_PATH=~/miniconda3/etc/profile.d/conda.sh
HUGGING_FACE_ACCESS_TOKEN=insert_token_here

CONNECTION_TYPE=LOCAL
```

### .env file configuration explained

The `.env` file is crucial for defining environment-specific variables that configure how the backend server operates. Here's a breakdown of each property within the `.env` file for local GPU usage:

- **PORT**: Specifies the port number on which the backend server will listen. For instance, `3000` indicates that the server will be accessible at `http://localhost:3000`.

- **MACHINE_LEARNING_CORE_PATH**: Defines the path path to the modelsmith python project directory on the VM. The example `../machine_learning_core` suggests that the python directory is located one level up from the current directory.

- **CONDA_SH_PATH**: Indicates the path to the Conda environment script. This path is necessary for the script to activate the Conda environment correctly. In the given example, `~/miniconda3/etc/profile.d/conda.sh` points to the Conda initialization script for Miniconda installations.

- **HUGGING_FACE_ACCESS_TOKEN**: This token is necessary for authenticating and accessing Hugging Face's model repositories. To obtain the token, please check: [FAQ](configure-faq.md)

- **CONNECTION_TYPE**: Determines the connection type for the model training environment. Setting this to `LOCAL` specifies that all operations, including model training and inference, will be performed on the local machine, utilizing the local GPU if available.

## Phase 3: Start the Project

Finally, to start ModelSmith:

1. Run the `start_modelsmith.sh` script to start both the frontend and backend servers:

   ```bash
   bash start_modelsmith.sh
   ```

2. Access the application by visiting `http://localhost:4200` in your web browser.

Congratulations! You have successfully configured ModelSmith to run locally. Enjoy optimizing your machine learning models with the power of your GPU.
