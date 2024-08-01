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

This command will create the necessary images based on the configurations in your \`docker-compose.yml\` file.

### Step 2: Run the Frontend Container

Start the frontend container with the following command:

```shell
docker run -d --name ms-frontend-container -p 4200:4200 ms-frontend
```

This command runs the frontend container in detached mode (\`-d\`), names it \`ms-frontend-container\`, and maps port 4200 of the container to port 4200 on your host machine.

### Step 3: Run the Backend Container

Before running the backend container, you need to set up the environment variables. These variables configure various aspects of the backend, including paths, access tokens, and connection details. Here's an explanation of each variable:

- `MACHINE_LEARNING_CORE_PATH`: Path to the machine learning core within the container.
- `CONDA_SH_PATH`: Path to the Conda shell script for environment activation.
- `HUGGING_FACE_ACCESS_TOKEN`: Your Hugging Face access token for model downloads. Please refer to the [AutoAWQ Configuration Guide](configure-autoawq.md)
- `CONNECTION_TYPE`: Type of connection (e.g., "LOCAL" for virtual machine).

Now, run the backend container with the following command, replacing the placeholder values with your actual configuration:

```shell
docker run -d --name ms-backend-container \
  -e MACHINE_LEARNING_CORE_PATH=machine_learning_core \
  -e CONDA_SH_PATH=miniconda3/etc/profile.d/conda.sh \
  -e HUGGING_FACE_ACCESS_TOKEN=your_hugging_face_token_here \
  -e CONNECTION_TYPE=LOCAL \
  -p 3000:3000 \
  ms-backend
```

Make sure to replace the placeholder values with your actual configuration details.

### Step 4: Enter the Backend Container

To configure the necessary features, enter the backend container:

```shell
docker exec -it ms-backend-container /bin/bash
```

This command opens a bash shell inside the running backend container.

### Step 5: Configure AutoAWQ for Model Quantization

Inside the backend container, configure AutoAWQ by following the instructions in the [AutoAWQ Configuration Guide](configure-autoawq.md):

### Step 6: Configure Multiflow Python Project

Still inside the backend container, configure Multiflow by following the instructions in the [Multiflow Configuration Guide](configure-multiflow.md):

These configurations are necessary to enable 100% of the application's functionalities. If skipped, only machine learning, quantization, and pruning features will work.

### Backend Container Initialization

The backend container will perform the following initialization steps:

1. **VM Initialization**: If the \`machine_learning_core\` folder is not already copied to the container, it will copy it from the specified path.
2. **Conda Environment Setup**: If the Conda environment is not found, it will install and configure it for the project.

This ensures that all necessary dependencies and configurations are set up correctly before starting the backend services.

## Accessing ModelSmith

After running these commands, you should be able to access:

- The frontend at \`http://localhost:4200\`
- The backend at \`http://localhost:3000\`

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
