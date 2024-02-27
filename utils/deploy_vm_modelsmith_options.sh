#!/bin/bash

# ANSI color codes
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# Navigate to the backend directory to source the .env file
cd ../backend

# Load environment variables
if [ -f .env ]; then
    source .env
    echo -e "${GREEN}.env file loaded successfully.${NC}"
else
    echo -e "${RED}.env file not found.${NC}"
    exit 1
fi

# Navigate back to the utils directory
cd ../utils

echo -e "${YELLOW}Select the deployment option:${NC}"
echo "1) Update the entire modelsmith project"
echo "2) Update bash folder"
echo "3) Update iterative_magnitude_pruning.py script"
echo "4) Update block_recon.py"
echo "5) Update utils.py"
echo "6) Update pruner.py"
echo "7) Update basic-ptq-example.py"
echo "8) Update quantization train.py"
read -p "Enter your choice: " choice

case $choice in
  1)
    echo -e "${GREEN}Updating the entire modelsmith project... (warning: this will update the entire folder in the VM but preserve data, checkpoint, and models_checkpoint folders)${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "mkdir -p /home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}"
    rsync -avz --exclude 'data/' --exclude 'checkpoint/' --exclude 'models_checkpoint/' ../modelsmith/ ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}
    ;;
  2)
    echo -e "${GREEN}Updating bash folder...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "find /home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/bash -maxdepth 1 -type f -delete"
    scp -r ../modelsmith/bash ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}
    ;;
  3)
    echo -e "${GREEN}Updating iterative_magnitude_pruning.py script...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "rm -f /home/${PRIMARY_SSH_USERNAME}/modelsmith/examples_pruning/iterative_magnitude_pruning.py"
    scp ../modelsmith/examples_pruning/iterative_magnitude_pruning.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/examples
    ;;
  4)
    echo -e "${GREEN}Updating block_recon.py...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "rm -f /home/${PRIMARY_SSH_USERNAME}/modelsmith/utils/quant/block_recon.py"
    scp ../modelsmith/utils/quant/block_recon.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/utils/quant
    ;;
  5)
    echo -e "${GREEN}Updating utils.py...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "rm -f /home/${PRIMARY_SSH_USERNAME}/modelsmith/utils/utils.py"
    scp ../modelsmith/utils/utils.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/utils/
    ;;
  6)
    echo -e "${GREEN}Updating pruner.py...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "rm -f /home/${PRIMARY_SSH_USERNAME}/modelsmith/utils/pruner.py"
    scp ../modelsmith/utils/pruner.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/utils/
    ;;
  7)
    echo -e "${GREEN}Updating basic-ptq-example.py...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "rm -f /home/${PRIMARY_SSH_USERNAME}/modelsmith/examples_quant/basic-ptq-example.py"
    scp ../modelsmith/examples_quant/basic-ptq-example.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/examples_quant/
    ;;
  8)
    echo -e "${GREEN}Updating quantization train.py...${NC}"
    ssh ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST} "rm -f /home/${PRIMARY_SSH_USERNAME}/modelsmith/examples_quant/train.py"
    scp ../modelsmith/examples_quant/train.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MODELSMITH_PATH}/examples_quant/
    ;;
  *)
    echo -e "${RED}Invalid choice.${NC}"
    ;;
esac

echo -e "${GREEN}Deployment complete.${NC}"