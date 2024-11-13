#!/bin/bash

#    Copyright 2024 Cisco Systems, Inc. and its affiliates

#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at

#        http://www.apache.org/licenses/LICENSE-2.0

#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

#   SPDX-License-Identifier: Apache-2.0


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

# Check if proxy details are set
SSH_PROXY_OPTIONS=""
if [ -n "$PRIMARY_PROXY_SSH_HOST" ] && [ -n "$PRIMARY_PROXY_SSH_PORT" ] && [ -n "$PRIMARY_PROXY_SSH_USER" ] && [ -n "$PRIMARY_PROXY_SSH_PRIVATE_KEY_PATH" ]; then
    SSH_PROXY_OPTIONS="-o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -o ForwardAgent=yes"
fi

# SSH and SCP commands with proxy options included if set
SSH_CMD="ssh ${SSH_PROXY_OPTIONS} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} -p ${PRIMARY_SSH_PORT} ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}"

# Navigate back to the utils directory
cd ../utils

echo -e "${YELLOW}Select the deployment option:${NC}"
echo "1) Update the entire modelsmith project"
echo "2) Copy the entire modelsmith project without data, checkpoint, and models_checkpoint folders"
echo "3) Update bash folder"
echo "4) Update iterative_magnitude_pruning.py script"
echo "5) Update block_recon.py"
echo "6) Update utils.py"
echo "7) Update pruner.py"
echo "8) Update basic-ptq-example.py"
echo "9) Update quantization train.py"
read -p "Enter your choice: " choice

case $choice in
  1)
    echo -e "${GREEN}Updating the entire modelsmith project... (warning: this will update the entire folder in the VM but preserve data, checkpoint, and models_checkpoint folders)${NC}"
    $SSH_CMD "mkdir -p /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}"
    rsync -avz -e "ssh -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ${SSH_PROXY_OPTIONS}" --exclude 'data/' --exclude 'checkpoint/' --exclude 'models_checkpoints/' ../${MACHINE_LEARNING_CORE_PATH}/ ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}
    ;;
  2)
    echo -e "${GREEN}Copying the entire modelsmith project excluding data, checkpoint and models_checkpoint folders...${NC}"
    rsync -avz -e "ssh -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ${SSH_PROXY_OPTIONS}" --exclude 'data' --exclude 'checkpoint' --exclude 'models_checkpoints' ../${MACHINE_LEARNING_CORE_PATH}/ ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}
    ;;
  3)
    echo -e "${GREEN}Updating bash folder...${NC}"
    $SSH_CMD "find /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/bash -maxdepth 1 -type f -delete"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} -r ../${MACHINE_LEARNING_CORE_PATH}/bash ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}
    ;;
  4)
    echo -e "${GREEN}Updating iterative_magnitude_pruning.py script...${NC}"
    $SSH_CMD "rm -f /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/examples_pruning/iterative_magnitude_pruning.py"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ../${MACHINE_LEARNING_CORE_PATH}/examples_pruning/iterative_magnitude_pruning.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/examples_pruning/
    ;;
  5)
    echo -e "${GREEN}Updating block_recon.py...${NC}"
    $SSH_CMD "rm -f /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/utils/quant/block_recon.py"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ../${MACHINE_LEARNING_CORE_PATH}/utils/quant/block_recon.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/utils/quant/
    ;;
  6)
    echo -e "${GREEN}Updating utils.py...${NC}"
    $SSH_CMD "rm -f /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/utils/utils.py"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ../${MACHINE_LEARNING_CORE_PATH}/utils/utils.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/utils/
    ;;
  7)
    echo -e "${GREEN}Updating pruner.py...${NC}"
    $SSH_CMD "rm -f /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/utils/pruner.py"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ../${MACHINE_LEARNING_CORE_PATH}/utils/pruner.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/utils/
    ;;
  8)
    echo -e "${GREEN}Updating basic-ptq-example.py...${NC}"
    $SSH_CMD "rm -f /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/examples_quant/basic-ptq-example.py"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ../${MACHINE_LEARNING_CORE_PATH}/examples_quant/basic-ptq-example.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/examples_quant/
    ;;
  9)
    echo -e "${GREEN}Updating quantization train.py...${NC}"
    $SSH_CMD "rm -f /home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/examples_quant/train.py"
    scp -o ProxyJump=${PRIMARY_PROXY_SSH_USER}@${PRIMARY_PROXY_SSH_HOST} -i ${PRIMARY_SSH_PRIVATE_KEY_PATH} ../${MACHINE_LEARNING_CORE_PATH}/examples_quant/train.py ${PRIMARY_SSH_USERNAME}@${PRIMARY_SSH_HOST}:/home/${PRIMARY_SSH_USERNAME}/${MACHINE_LEARNING_CORE_PATH}/examples_quant/
    ;;
  *)
    echo -e "${RED}Invalid choice.${NC}"
    ;;
esac

echo -e "${GREEN}Deployment complete.${NC}"z