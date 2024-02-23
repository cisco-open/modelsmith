# Configure Modelsmith on a VM

This guide outlines the process of configuring Modelsmith to run on a Virtual Machine (VM), suitable for scenarios where leveraging cloud or remote computational resources is preferred. This setup allows for the utilization of VMs for running Python scripts and training machine learning models. The configuration process is similar to the local setup but requires some adjustments, particularly for environment setup and SSH configuration.

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

The initial phase involves preparing the VM environment for Modelsmith. Perform the following steps directly on your VM:

1. **Copy the Modelsmith Project to the VM**: Transfer the Modelsmith project files to your VM. This can be done via SCP, FTP, or any file transfer method of your preference.

2. **Install Miniconda**: Download and install Miniconda on the VM. Miniconda will manage the Python environment and dependencies required for Modelsmith.

3. **Create and Activate a New Conda Environment**: With Miniconda installed, create a new Conda environment and activate it:

   ```bash
   conda create -n modelsmith python=3.9
   conda activate modelsmith
   ```

4. **Install PyTorch and Related Libraries**: Install the necessary Python packages including PyTorch, torchvision, and torchaudio:

   ```bash
   pip install torch torchvision torchaudio
   ```

5. **Train the Models**: Navigate to the respective directories (`examples_quant`, `examples`, `examples_unlearning`) and execute the `train.py` scripts to train your models.

- From `examples_quant` directory:

  ```python
  python3 train.py
  ```

- From `examples` directory:

  ```python
  python3 train.py
  ```

- From `examples_unlearning` directory:
  ```python
  python3 train.py
  ```

## Phase 2: Configure the Environment

On your local machine, run the `setup_environment.sh` script located in the `utils` directory of the repository. This script configures the `.env` file for the backend server. When prompted for the environment for model training, select "2. VM" and provide the necessary SSH details for the primary and, optionally, backup VMs.

### Example .env Configuration for VM Usage

```
PORT=3000
MODELSMITH_PATH=modelsmith
CONDA_SH_PATH=miniconda3/etc/profile.d/conda.sh

CONNECTION_TYPE=VM

PRIMARY_SSH_HOST=vm-host
PRIMARY_SSH_PORT=22
PRIMARY_SSH_USERNAME=myusername
PRIMARY_SSH_PASSWORD=mypassword
PRIMARY_SSH_PRIVATE_KEY_PATH=

BACKUP_SSH_HOST=vm-host-backup-if-primary-fails
BACKUP_SSH_PORT=22
BACKUP_SSH_USERNAME=myusername
BACKUP_SSH_PASSWORD=
BACKUP_SSH_PRIVATE_KEY_PATH=myprivatekeypaty
```

### .env File Configuration for VM Explained

- **PORT**: The port number where the backend server listens. (default = 3000)
- **MODELSMITH_PATH**: The path to the Modelsmith project directory on the VM.
- **CONDA_SH_PATH**: Path to the Conda environment script on the VM.

- **CONNECTION_TYPE**: Set to `VM` to indicate the project is configured to use virtual machines for model training.

- **PRIMARY_SSH_HOST**: The hostname or IP address of the primary VM.
- **PRIMARY_SSH_PORT**: SSH port for the primary VM, typically `22`.
- **PRIMARY_SSH_USERNAME**: SSH username for the primary VM.
- **PRIMARY_SSH_PASSWORD**: Password for SSH authentication (if applicable).
- **PRIMARY_SSH_PRIVATE_KEY_PATH**: Path to the private SSH key for key-based authentication (if applicable).

- **BACKUP_SSH_HOST, BACKUP_SSH_PORT, BACKUP_SSH_USERNAME, BACKUP_SSH_PASSWORD, BACKUP_SSH_PRIVATE_KEY_PATH**: Similar to the primary settings, these are for the backup VM (if configured).

## Phase 3: Start the Project

To start Modelsmith:

1. Execute the `start_modelsmith.sh` script to launch both the frontend and backend servers.
2. Visit `http://localhost:4200` in your web browser to access the application.

Successfully configuring Modelsmith on a VM allows you to leverage remote computational resources for training and deploying machine learning models.
