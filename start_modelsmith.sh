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

# ANSI color codes for better formatting
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
NC="\033[0m" # No color

# Absolute path to the project root directory
PROJECT_ROOT="$(pwd)"
TAIL_PID=""

# Function to install dependencies if necessary
install_dependencies() {
    local project_path="$1"
    echo "Checking dependencies in $project_path"
    if [ ! -d "$project_path/node_modules" ] || [ "$project_path/package.json" -nt "$project_path/node_modules" ]; then
        echo -e "${YELLOW}Installing dependencies in $project_path${NC}"
        (cd "$project_path" && npm install)
    else
        echo "Dependencies are up to date in $project_path."
    fi
}

# Function to start the backend server
start_backend() {
    local project_path="$1"
    echo "Starting backend server in $project_path"

    # Change working directory to the backend directory
    cd "$project_path" || exit 1

    # Start the backend server using npm
    nohup npm run start:prod > "backend.log" 2>&1 &
    echo -e "${GREEN}Backend server started and logging to backend.log${NC}"

    tail -f "backend.log" &
    TAIL_PID=$!
}

# Function to start the frontend server (Express)
start_frontend() {
    local project_path="$1"
    echo "Starting frontend server in $project_path"

    # Change working directory to the frontend directory
    cd "$project_path" || exit 1

    # Start the frontend server using npm
    nohup npm start > "frontend.log" 2>&1 &
    echo -e "${GREEN}Frontend server started and logging to frontend.log${NC}"
}

# Function to perform cleanup
cleanup() {
    echo -e "${GREEN}Stopping Backend and Frontend...${NC}"
    if [ -n "$TAIL_PID" ]; then
        kill "$TAIL_PID"
        echo -e "${GREEN}Stopped tailing backend logs.${NC}"
    fi
}

# Trap SIGINT, SIGTERM, and SIGHUP
trap cleanup SIGINT SIGTERM SIGHUP

# Path to the .env file
env_file="$PROJECT_ROOT/backend/.env"

# Check if .env file exists and call setup_environment.sh if needed
if [ ! -f "$env_file" ]; then
    # Call the setup script from the utils directory
    bash "$PROJECT_ROOT/utils/setup_environment.sh"
fi


echo -e "${GREEN}Setting up Backend...${NC}"
install_dependencies "$PROJECT_ROOT/backend"
start_backend "$PROJECT_ROOT/backend"

echo -e "${GREEN}Setting up Frontend...${NC}"
install_dependencies "$PROJECT_ROOT/frontend/server"
start_frontend "$PROJECT_ROOT/frontend/server"

# Wait for all background processes to finish
echo -e "${GREEN}Backend and Frontend are running. Press Ctrl+C to stop.${NC}"
echo "Go to http://localhost:4200/ to use the app."
wait