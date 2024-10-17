# Docker Configuration Guide for ModelSmith

This guide will walk you through the process of setting up ModelSmith using Docker, including how to configure the necessary environment variables.

## Prerequisites

Before you begin, make sure you have Docker and Docker Compose installed on your system. If you haven't installed them yet, follow these steps:

1. Install Docker:

   - For Windows and Mac: Download and install Docker Desktop from the [official Docker website](https://www.docker.com/products/docker-desktop).
   - For Linux: Follow the installation instructions for your specific distribution on the [Docker documentation](https://docs.docker.com/engine/install/).

2. Install Docker Compose:
   - Docker Desktop for Windows and Mac includes Docker Compose by default.
   - For Linux, follow the installation instructions in the [Docker Compose documentation](https://docs.docker.com/compose/install/).

## Setting up ModelSmith with Docker

Once you have Docker and Docker Compose installed, follow these steps to set up ModelSmith:

### Step 1: Build the Docker images

First, build the Docker images for both the frontend and backend:

```shell
cd modelsmith
docker-compose build
```

This command will create the necessary images based on the configurations in your `docker-compose.yml` file.

### Step 2: Run the Frontend Container

Start the frontend container with the following command:

```shell
docker run -d --name ms-frontend-container -p 4200:4200 ms-frontend
```

This command runs the frontend container in detached mode (`-d`), names it `ms-frontend-container`, and maps port 4200 of the container to port 4200 on your host machine.

### Step 3: Configure and Run the Backend Container

Before running the backend container, you need to set up the environment variables. These variables configure various aspects of the backend, including paths, access tokens, and connection details. Here's an explanation of each variable:

- `MACHINE_LEARNING_CORE_PATH`: Path to the machine learning core within the container. The default value is `"machine_learning_core"`.
- `CONDA_SH_PATH`: Path to the Conda shell script for environment activation. The default value is `"miniconda3/etc/profile.d/conda.sh"`.
- `HUGGING_FACE_ACCESS_TOKEN`: Your Hugging Face access token for model downloads. Please refer to the [AutoAWQ Configuration Guide](configure-autoawq.md).
- `CONNECTION_TYPE`: Type of connection, e.g., `"VM"` for a virtual machine.
- `PRIMARY_SSH_HOST`: Hostname or IP address of the primary SSH server.
- `PRIMARY_SSH_PORT`: Port number for SSH connection.
- `PRIMARY_SSH_USERNAME`: Username for SSH authentication.
- `PRIMARY_SSH_PASSWORD`: Password for SSH authentication (use with caution, consider using SSH keys instead).
- `PRIMARY_SSH_PRIVATE_KEY_PATH`: Path to the SSH private key file (if using key-based authentication).
- **Proxy Configuration for Primary SSH (optional):**
  - `PRIMARY_PROXY_SSH_HOST`: Hostname or IP address of the proxy server for the primary SSH connection (leave empty if not using a proxy).
  - `PRIMARY_PROXY_SSH_PORT`: Port number for proxy SSH connection (default is usually `22`, leave empty if not using a proxy).
  - `PRIMARY_PROXY_SSH_USER`: Username for the proxy server authentication (leave empty if not using a proxy).
  - `PRIMARY_PROXY_SSH_PRIVATE_KEY_PATH`: Path to the SSH private key file for proxy authentication (leave empty if not using a proxy).
- **Backup SSH Configuration (optional):**
  - `BACKUP_SSH_HOST`: Hostname or IP address of the backup SSH server (leave empty if no backup is used).
  - `BACKUP_SSH_PORT`: Port number for the backup SSH connection (leave empty if no backup is used).
  - `BACKUP_SSH_USERNAME`: Username for backup SSH authentication (leave empty if no backup is used).
  - `BACKUP_SSH_PASSWORD`: Password for backup SSH authentication (leave empty if no backup is used).
  - `BACKUP_SSH_PRIVATE_KEY_PATH`: Path to the SSH private key for backup SSH (leave empty if no backup is used).
- **Proxy Configuration for Backup SSH (optional):**
  - `BACKUP_PROXY_SSH_HOST`: Hostname or IP address of the proxy server for the backup SSH connection (leave empty if not using a proxy).
  - `BACKUP_PROXY_SSH_PORT`: Port number for proxy backup SSH connection (default is usually `22`, leave empty if not using a proxy).
  - `BACKUP_PROXY_SSH_USER`: Username for proxy server authentication for the backup (leave empty if not using a proxy).
  - `BACKUP_PROXY_SSH_PRIVATE_KEY_PATH`: Path to the SSH private key file for proxy backup authentication (leave empty if not using a proxy).

### Running the Backend Container

Now, you can run the backend container with the following command. Make sure to replace the placeholder values with your actual configuration. Any fields that are not used (such as proxy settings or backup settings) can be left as empty values.

```shell
docker run -d --name ms-backend-container \
  -e "MACHINE_LEARNING_CORE_PATH=machine_learning_core" \
  -e "CONDA_SH_PATH=miniconda3/etc/profile.d/conda.sh" \
  -e "HUGGING_FACE_ACCESS_TOKEN=your_hugging_face_token_here" \
  -e "CONNECTION_TYPE=VM" \
  -e "PRIMARY_SSH_HOST=your_ssh_host_here" \
  -e "PRIMARY_SSH_PORT=22" \
  -e "PRIMARY_SSH_USERNAME=your_ssh_username" \
  -e "PRIMARY_SSH_PASSWORD=your_ssh_password" \
  -e "PRIMARY_SSH_PRIVATE_KEY_PATH=/path/to/your/private/key/or_empty" \
  -e "PRIMARY_PROXY_SSH_HOST=" \
  -e "PRIMARY_PROXY_SSH_PORT=" \
  -e "PRIMARY_PROXY_SSH_USER=" \
  -e "PRIMARY_PROXY_SSH_PRIVATE_KEY_PATH=" \
  -e "BACKUP_SSH_HOST=" \
  -e "BACKUP_SSH_PORT=" \
  -e "BACKUP_SSH_USERNAME=" \
  -e "BACKUP_SSH_PASSWORD=" \
  -e "BACKUP_SSH_PRIVATE_KEY_PATH=" \
  -e "BACKUP_PROXY_SSH_HOST=" \
  -e "BACKUP_PROXY_SSH_PORT=" \
  -e "BACKUP_PROXY_SSH_USER=" \
  -e "BACKUP_PROXY_SSH_PRIVATE_KEY_PATH=" \
  -p 3000:3000 \
  ms-backend
```

### Notes:

- Any fields that are not used can be left as empty strings (e.g., for proxy or backup settings).
- Make sure to replace the placeholder values with your actual configuration details.

### Step 4: Configure AutoAWQ for Model Quantization

To enable AutoAWQ model quantization features, please refer to the [AutoAWQ Configuration Guide](configure-autoawq.md) for detailed instructions.

### Step 5: Configure Multiflow Python Project

To enable multiflow functionalities, please refer to the [Multiflow Configuration Guide](configure-multiflow.md) for detailed instructions.

These configurations are necessary to enable 100% of the application's functionalities. If skipped, only machine learning, quantization, and pruning features will work.

### Backend Container Initialization

The backend container will perform the following initialization steps:

1. **VM Initialization**: If the \`machine_learning_core\` folder is not already copied to the container, it will copy it from the specified path.
2. **Conda Environment Setup**: If the Conda environment is not found, it will install and configure it for the project.

This ensures that all necessary dependencies and configurations are set up correctly before starting the backend services.

## Accessing ModelSmith

After running these commands, you should be able to access:

- The frontend at `http://localhost:4200`
- The backend at `http://localhost:3000`

## Troubleshooting

If you encounter any issues:

1. Ensure all required ports (4200 and 3000) are available and not in use by other applications.
2. Check Docker logs for any error messages:
   ```shell
   docker logs ms-frontend-container
   docker logs ms-backend-container
   ```
3. Verify that all environment variables are correctly set in the backend container command.

For further assistance, please refer to our FAQ section or contact our support team.
