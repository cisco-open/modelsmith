# Configure ModelSmith on a VM

This guide outlines the process of configuring ModelSmith to run on a Virtual Machine (VM), suitable for scenarios where leveraging cloud or remote computational resources is preferred. This setup allows for the utilization of VMs for running Python scripts and training machine learning models. The configuration process is similar to the local setup but requires some adjustments, particularly for environment setup and SSH configuration.

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
Ensure it displays v20.10.1.

**npm:**

```bash
npm install --global npm@10.7.0
```
Ensure it displays v10.7.0.

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

2.6. (Optional) If `conda` is not found

If you see a `command not found: conda` error when opening a new terminal, you may need to manually add Miniconda to your PATH. Follow these steps:

2.6.1. **Open your `~/.bashrc` file using vi:**

   ```bash
   vi ~/.bashrc
   ```

2.6.2. **Enter Insert Mode:**  
   Press `i` to enter insert mode.

2.6.3. **Add the following line** (replace `username` with your actual username):

   ```bash
   export PATH="/home/username/miniconda/bin:$PATH"
   ```

2.6.4. **Save and Exit:**  
   Press `Esc`, then type `:wq` and hit Enter.

2.6.5. **Reload your `.bashrc`:**

   ```bash
   source ~/.bashrc
   ```

2.6.6. **Verify the installation:**

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

5. **Configure Pruning, Quantization, Machine Unlearning Python Projects**:

   Please refer to the [Pruning, Quantization, Machine Unlearning Configuration Guide](configure-pruning-quant-ml.md) for detailed instructions.

6. **Configure AutoAWQ for Model Quantization**:

   Please refer to the [AutoAWQ Configuration Guide](configure-autoawq.md) for detailed instructions.

7. **Configure Multiflow Python Project**:

   Please refer to the [Multiflow Configuration Guide](configure-multiflow.md) for detailed instructions.

8. **Configure Diffusion Model Python Project**:

   Please refer to the [Diffusion Model Configuration Guide](configure-diffusion-model.md) for detailed instructions.

## Phase 2: Configure the Environment on Local Machine

After configuring the Python environment, the next step involves setting up the project environment. This is done by executing the `setup_environment.sh` script located in the `backend` directory. The script performs several tasks, including setting up the `.env` file for the backend server.

Execute the script by running:

```bash
bash backend/setup_environment.sh
```

When asked about "Select the environment for model training:" -> choose 2. VM

### Example .env Configuration for VM Usage

```
PORT=3000
MACHINE_LEARNING_CORE_PATH=$HOME/machine_learning_core
CONDA_SH_PATH=$HOME/miniconda3/etc/profile.d/conda.sh
HUGGING_FACE_ACCESS_TOKEN=insert_token_here

CONNECTION_TYPE=VM

PRIMARY_SSH_HOST=vm-host
PRIMARY_SSH_PORT=22
PRIMARY_SSH_USERNAME=myusername
PRIMARY_SSH_PASSWORD=mypassword
PRIMARY_SSH_PRIVATE_KEY_PATH=

# Proxy for Primary
PRIMARY_PROXY_SSH_HOST=proxy-host
PRIMARY_PROXY_SSH_PORT=22
PRIMARY_PROXY_SSH_USER=proxy-user
PRIMARY_PROXY_SSH_PRIVATE_KEY_PATH=/path/to/proxy/private/key

# Backup SSH
BACKUP_SSH_HOST=vm-host-backup-if-primary-fails
BACKUP_SSH_PORT=22
BACKUP_SSH_USERNAME=myusername
BACKUP_SSH_PASSWORD=
BACKUP_SSH_PRIVATE_KEY_PATH=/path/to/backup/private/key

# Proxy for Backup
BACKUP_PROXY_SSH_HOST=proxy-backup-host
BACKUP_PROXY_SSH_PORT=22
BACKUP_PROXY_SSH_USER=proxy-backup-user
BACKUP_PROXY_SSH_PRIVATE_KEY_PATH=/path/to/proxy/backup/private/key
```

### .env file Configuration for VM Explained

- **PORT**: The port number where the backend server listens. (default = 3000)
- **MACHINE_LEARNING_CORE_PATH**: The path to the modelsmith python project directory on the VM. It needs to be an absolute path from the $HOME.
- **CONDA_SH_PATH**: Path to the Conda environment script on the VM. It needs to be an absolute path from the $HOME.
- **HUGGING_FACE_ACCESS_TOKEN**: This token is necessary for authenticating and accessing Hugging Face's model repositories. To obtain the token, please check: [AutoAWQ Configuration Guide](configure-autoawq.md)

- **CONNECTION_TYPE**: Set to `VM` to indicate the project is configured to use virtual machines for model training.

#### Primary SSH Connection

- **PRIMARY_SSH_HOST**: The hostname or IP address of the primary VM.
- **PRIMARY_SSH_PORT**: SSH port for the primary VM, typically `22`.
- **PRIMARY_SSH_USERNAME**: SSH username for the primary VM.
- **PRIMARY_SSH_PASSWORD**: Password for SSH authentication (if applicable).
- **PRIMARY_SSH_PRIVATE_KEY_PATH**: Path to the private SSH key for key-based authentication (if applicable).

#### Primary SSH Proxy Configuration

If a proxy is required to access the primary VM, the following fields should be configured:

- **PRIMARY_PROXY_SSH_HOST**: The hostname or IP address of the proxy server used to connect to the primary VM.
- **PRIMARY_PROXY_SSH_PORT**: SSH port for the proxy server, typically `22`.
- **PRIMARY_PROXY_SSH_USER**: The username for SSH authentication on the proxy server.
- **PRIMARY_PROXY_SSH_PRIVATE_KEY_PATH**: Path to the private key for authenticating to the proxy (if applicable).

#### Backup SSH Connection

- **BACKUP_SSH_HOST, BACKUP_SSH_PORT, BACKUP_SSH_USERNAME, BACKUP_SSH_PASSWORD, BACKUP_SSH_PRIVATE_KEY_PATH**: These settings mirror the primary configuration, except for the backup VM that will be used if the primary VM connection fails.

#### Backup SSH Proxy Configuration

If a proxy is required to access the backup VM, configure these fields:

- **BACKUP_PROXY_SSH_HOST**: The hostname or IP address of the proxy server used to connect to the backup VM.
- **BACKUP_PROXY_SSH_PORT**: SSH port for the proxy server, typically `22`.
- **BACKUP_PROXY_SSH_USER**: The username for SSH authentication on the proxy server.
- **BACKUP_PROXY_SSH_PRIVATE_KEY_PATH**: Path to the private key for authenticating to the proxy (if applicable).

### Notes:

- Any fields that are not used can be left as empty strings (e.g., for proxy or backup settings).
- Make sure to replace the placeholder values with your actual configuration details.
- MACHINE_LEARNING_CORE_PATH and CONDA_SH_PATH needs to be set from $HOME directory.

## Phase 3: Start the Project

To start ModelSmith:

1. Execute the `start_modelsmith.sh` script to launch both the frontend and backend servers.
2. Visit `http://localhost:4200` in your web browser to access the application.

Successfully configuring ModelSmith on a VM allows you to leverage remote computational resources for training and deploying machine learning models.
