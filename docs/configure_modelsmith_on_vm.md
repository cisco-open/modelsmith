# Configure ModelSmith on a VM

This guide outlines the process of configuring ModelSmith to run on a Virtual Machine (VM), suitable for scenarios where leveraging cloud or remote computational resources is preferred. This setup allows for the utilization of VMs for running Python scripts and training machine learning models. The configuration process is similar to the local setup but requires some adjustments, particularly for environment setup and SSH configuration.

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

## Phase 1: Setup on the VM

The initial phase involves preparing the VM environment for ModelSmith. Perform the following steps directly on your VM:

1. **Copy the ModelSmith Python Project to the VM**: It's important to transfer only the Python project files located within the ModelSmith folder to your VM. This can be achieved using SCP (Secure Copy Protocol), FTP (File Transfer Protocol), or any file transfer method you prefer. Here's how you can do it with SCP, which securely transfers files between hosts on a network:

```bash
scp -r /path/to/local/your_repository/machine_learning_core user@vm_host:/path/to/remote/directory/
```

Replace:

- `/path/to/local/your_repository/machine_learning_core` with the actual path where the machine_learning_core folder is located within your local repository.
- `user` with your username on the VM.
- `vm_host` with the hostname or IP address of your VM.
- `/path/to/remote/directory/` with the path on the VM where you want to store the ModelSmith project.

2. **Install Miniconda**: Miniconda is a minimal installer for Conda, which is an open-source package management system and environment management system. Installing Miniconda on the VM will help manage the Python environment and dependencies required for the ModelSmith project. Here's how to download and install Miniconda:

2.1. Download the Miniconda installer for Linux:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

2.2. Make the installer script executable:

```bash
chmod +x Miniconda3-latest-Linux-x86_64.sh
```

2.3. Run the installer script:

```bash
./Miniconda3-latest-Linux-x86_64.sh
```

Follow the on-screen prompts to complete the installation. It is generally safe to accept the default installation settings. Make sure to agree to initialize Miniconda by running `conda init`.

2.4. After installation, restart your terminal or source your `.bashrc` file to make the `conda` command available:

```bash
source ~/.bashrc
```

2.5. Verify the installation by checking the Conda version:

```bash
conda --version
```

3. **Create and Activate a New Conda Environment**: With Miniconda installed, create a new Conda environment and activate it:

   ```bash
   conda create -n modelsmith python=3.9
   conda activate modelsmith
   ```

4. **Install PyTorch and Related Libraries**: Install the necessary Python packages including PyTorch, torchvision, and torchaudio:

   ```bash
   pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
   ```

5. **Train the Models**: While beeing in the modelsmith environment (conda activate modelsmith), train your models located within the 'examples_quant', 'examples_pruning' and 'examples_unlearning' directories by specifying the number of epochs using the --epochs flag and specify the model architecture using the --arch parameter.

- From `examples_quant` directory:

  - Predefined models to train: resnet18, resnet34, resnet50, resnet101, resnet152, resnext50_32x4d, resnext101_32x8d, wide_resnet50_2, wide_resnet101_2

  ```python
  python3 machine_learning_core/examples_quant/train.py --arch=resnet18 --epochs=100
  ```

- From `examples_pruning` directory:

  - Predefined models to train: ResNet18, ResNet34, ResNet50, ResNet101, ResNet152, VGG11, VGG13, VGG16, VGG19

  ```python
  python3 machine_learning_core/examples_pruning/train.py --arch=ResNet18 --epochs=100
  ```

- From `examples_unlearning` directory:

  - Predefined models to train: ResNet18, ResNet34, ResNet50, ResNet101, ResNet152, VGG11, VGG13, VGG16, VGG19

  ```python
  python3 machine_learning_core/examples_unlearning/train.py --arch=ResNet18 --epochs=100
  ```

6. **Configure AutoAWQ for Model Quantization**:

   Please refer to the [AutoAWQ Configuration Guide](configure-autoawq.md) for detailed instructions on setting up AutoAWQ.

## Phase 2: Configure the Environment

On your local machine, run the `setup_environment.sh` script located in the `utils` directory of the repository. This script configures the `.env` file for the backend server. When prompted for the environment for model training, select "2. VM" and provide the necessary SSH details for the primary and, optionally, backup VMs.

### Example .env Configuration for VM Usage

```
PORT=3000
MACHINE_LEARNING_CORE_PATH=machine_learning_core
CONDA_SH_PATH=miniconda3/etc/profile.d/conda.sh
HUGGING_FACE_ACCESS_TOKEN=insert_token_here

CONNECTION_TYPE=VM

PRIMARY_SSH_HOST=vm-host
PRIMARY_SSH_PORT=22
PRIMARY_SSH_USERNAME=myusername
PRIMARY_SSH_PASSWORD=mypassword
PRIMARY_SSH_PRIVATE_KEY_PATH=

# Backend it's optional, can be skipped
BACKUP_SSH_HOST=vm-host-backup-if-primary-fails
BACKUP_SSH_PORT=22
BACKUP_SSH_USERNAME=myusername
BACKUP_SSH_PASSWORD=
BACKUP_SSH_PRIVATE_KEY_PATH=myprivatekeypaty
```

### .env File Configuration for VM Explained

- **PORT**: The port number where the backend server listens. (default = 3000)
- **MACHINE_LEARNING_CORE_PATH**: The path to the modelsmith python project directory on the VM.
- **CONDA_SH_PATH**: Path to the Conda environment script on the VM.
- **HUGGING_FACE_ACCESS_TOKEN**: This token is necessary for authenticating and accessing Hugging Face's model repositories. To obtain the token, please check: [AutoAWQ Configuration Guide](configure-autoawq.md)

- **CONNECTION_TYPE**: Set to `VM` to indicate the project is configured to use virtual machines for model training.

- **PRIMARY_SSH_HOST**: The hostname or IP address of the primary VM.
- **PRIMARY_SSH_PORT**: SSH port for the primary VM, typically `22`.
- **PRIMARY_SSH_USERNAME**: SSH username for the primary VM.
- **PRIMARY_SSH_PASSWORD**: Password for SSH authentication (if applicable).
- **PRIMARY_SSH_PRIVATE_KEY_PATH**: Path to the private SSH key for key-based authentication (if applicable).

- **BACKUP_SSH_HOST, BACKUP_SSH_PORT, BACKUP_SSH_USERNAME, BACKUP_SSH_PASSWORD, BACKUP_SSH_PRIVATE_KEY_PATH**: Similar to the primary settings, these are for the backup VM (if configured).

## Phase 3: Start the Project

To start ModelSmith:

1. Execute the `start_modelsmith.sh` script to launch both the frontend and backend servers.
2. Visit `http://localhost:4200` in your web browser to access the application.

Successfully configuring ModelSmith on a VM allows you to leverage remote computational resources for training and deploying machine learning models.
