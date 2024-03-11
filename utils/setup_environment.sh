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

#!/bin/bash

cd "$(dirname "$0")/.."
PROJECT_ROOT="$(pwd)"
backend_path="$PROJECT_ROOT/backend"
env_file="$backend_path/.env"

# ANSI color codes
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
NC="\033[0m" # No Color

prompt_ssh_details() {
    local prefix="$1"
    echo -e "${GREEN}Enter details for $prefix SSH connection:${NC}"
    read -p "$prefix SSH Host: " ssh_host
    read -p "$prefix SSH Port (default 22): " ssh_port
    read -p "$prefix SSH Username: " ssh_username
    read -p "$prefix SSH Password (if applicable): " ssh_password
    read -p "$prefix SSH Private Key Path (if applicable): " ssh_private_key_path

    ssh_port=${ssh_port:-22} 

    {
        echo ""
        echo "${prefix}_SSH_HOST=$ssh_host"
        echo "${prefix}_SSH_PORT=$ssh_port"
        echo "${prefix}_SSH_USERNAME=$ssh_username"
        echo "${prefix}_SSH_PASSWORD=$ssh_password"
        echo "${prefix}_SSH_PRIVATE_KEY_PATH=$ssh_private_key_path"
    } >> "$env_file"
}

create_update_env_file() {
    local env_choice="$1"

    if [ -f "$env_file" ]; then
        echo -e "${YELLOW}.env file already exists at $env_file.${NC}"
        read -p "Do you want to overwrite it? (y/n): " confirm_overwrite
        [[ $confirm_overwrite =~ ^[Yy]$ ]] || return
    fi

    echo -e "${GREEN}Creating/updating .env file for the selected environment...${NC}"
    mkdir -p "$backend_path"

    local modelsmith_path="../modelsmith"
    echo -e "${YELLOW}Enter CONDA_SH_PATH:${NC}"
    read -p "(e.g., ~/miniconda3/etc/profile.d/conda.sh): " conda_sh_path

    if [[ $env_choice == "2" ]]; then
        echo -e "${YELLOW}Enter MODELSMITH_PATH for VM:${NC}"
        read -p "(e.g., /path/to/modelsmith on VM): " modelsmith_vm_path
        modelsmith_path="$modelsmith_vm_path"
    fi

    {
        echo "PORT=3000"
        echo "MODELSMITH_PATH=$modelsmith_path"
        echo "CONDA_SH_PATH=$conda_sh_path"
        echo ""
    } > "$env_file"

    if [[ $env_choice == "2" ]]; then
        echo "CONNECTION_TYPE=VM" >> "$env_file"
        prompt_ssh_details "PRIMARY"

        read -p "Do you want to support a backup VM? (y/n): " support_backup
        if [[ $support_backup =~ ^[Yy]$ ]]; then
            prompt_ssh_details "BACKUP"
        fi
    else
        echo "CONNECTION_TYPE=LOCAL" >> "$env_file"
    fi

    echo -e "${GREEN}Environment configuration added/updated in .env file.${NC}"
}

echo -e "${YELLOW}Select the environment for model training:${NC}"
echo "1. Local"
echo "2. VM"
read -p "Enter your choice (1/2): " env_choice

create_update_env_file "$env_choice"