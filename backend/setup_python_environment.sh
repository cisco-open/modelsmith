#!/bin/bash

set -e

CONNECTION_TYPE=$1
PRIMARY_SSH_HOST=$2
PRIMARY_SSH_PORT=$3
PRIMARY_SSH_USERNAME=$4
PRIMARY_SSH_PASSWORD=$5

echo "CONNECTION_TYPE is set to: $CONNECTION_TYPE"

install_miniconda3() {
    echo "Installing Miniconda..."
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3.sh
    bash ~/miniconda3.sh -b -p ~/miniconda3
    rm ~/miniconda3.sh
    source ~/miniconda3/etc/profile.d/conda.sh
    conda init bash
    source ~/.bashrc
}

setup_local_environment() {
    if ! command -v conda &> /dev/null; then
        echo "Conda command not found. Installing Miniconda3..."
        install_miniconda3
    fi

    if conda info --envs | grep -q modelsmith; then
        echo "Conda environment 'modelsmith' already exists. Skipping setup."
        return 0
    fi

    echo "Creating Conda environment..."
    conda create -n modelsmith python=3.9 -y
    echo "Activating Conda environment..."
    conda activate modelsmith
    echo "Installing PyTorch and related libraries..."
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
}

copy_machine_learning_core_to_vm() {
    echo "Checking if machine_learning_core folder exists on VM..."
    if sshpass -p "$PRIMARY_SSH_PASSWORD" ssh -o StrictHostKeyChecking=no -p $PRIMARY_SSH_PORT $PRIMARY_SSH_USERNAME@$PRIMARY_SSH_HOST "test -d ~/machine_learning_core"; then
        echo "machine_learning_core folder already exists on VM. Skipping copy."
    else
        echo "Copying machine_learning_core folder to VM..."
        sshpass -p "$PRIMARY_SSH_PASSWORD" rsync -avz --progress -e "ssh -p $PRIMARY_SSH_PORT -o StrictHostKeyChecking=no" /app/machine_learning_core $PRIMARY_SSH_USERNAME@$PRIMARY_SSH_HOST:~/
    fi
}

setup_vm_environment() {
    copy_machine_learning_core_to_vm
    
    sshpass -p "$PRIMARY_SSH_PASSWORD" ssh -o StrictHostKeyChecking=no -p $PRIMARY_SSH_PORT $PRIMARY_SSH_USERNAME@$PRIMARY_SSH_HOST << 'EOF'
        set -e
        if [ -f ~/miniconda3/etc/profile.d/conda.sh ]; then
            source ~/miniconda3/etc/profile.d/conda.sh
        fi

        if ! command -v conda &> /dev/null; then
            echo "Conda command not found. Installing Miniconda3..."
            wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3.sh
            bash ~/miniconda3.sh -b -p ~/miniconda3
            rm ~/miniconda3.sh
            source ~/miniconda3/etc/profile.d/conda.sh
            conda init bash
            source ~/.bashrc
        else
            echo "Conda command found."
        fi

        if conda info --envs | grep -q modelsmith; then
            echo "Conda environment 'modelsmith' already exists. Skipping setup."
        else
            echo "Creating Conda environment..."
            conda create -n modelsmith python=3.9 -y
            echo "Activating Conda environment..."
            conda activate modelsmith
            echo "Installing PyTorch and related libraries..."
            pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
        fi
EOF
}

case $CONNECTION_TYPE in
    LOCAL)
        setup_local_environment
        ;;
    VM)
        setup_vm_environment
        ;;
    *)
        echo "Invalid CONNECTION_TYPE. Must be either 'LOCAL' or 'VM'."
        exit 1
        ;;
esac

echo "Python environment setup complete."
