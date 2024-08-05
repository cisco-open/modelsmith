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

# Function to check if a port is already in use and kill the process
check_port_occupancy() {
    local port="$1"
    local pid
    if pid=$(lsof -ti:"$port"); then
        echo "Port $port is already in use by process: $pid"
        echo "Killing process listening on port $port..."
        kill "$pid"
        echo "Process killed."
    fi
}

# Function to start the backend server
start_backend() {
    local project_path="$1"
    echo "Starting backend server in $project_path"

    # Change working directory to the backend directory
    cd "$project_path" || exit 1

    # Call the function to check port occupancy for port 3000
    check_port_occupancy 3000

    # Start the backend server using npm
    nohup npm run start:prod > "backend.log" 2>&1 &
    BACKEND_PID=$!
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

    # Call the function to check port occupancy for port 4200
    check_port_occupancy 4200

    # Start the frontend server using npm
    nohup npm start > "frontend.log" 2>&1 &
    FRONTEND_PID=$!
    echo -e "${GREEN}Frontend server started and logging to frontend.log${NC}"
}

# Function to perform cleanup
cleanup() {
    echo -e "${GREEN}Stopping Backend and Frontend...${NC}"
    if [ -n "$TAIL_PID" ]; then
        kill "$TAIL_PID"
        echo -e "${GREEN}Stopped tailing backend logs.${NC}"
    fi
    if [ -n "$BACKEND_PID" ]; then
        kill "$BACKEND_PID"
        echo -e "${GREEN}Backend server stopped.${NC}"
    fi
    if [ -n "$FRONTEND_PID" ]; then
        kill "$FRONTEND_PID"
        echo -e "${GREEN}Frontend server stopped.${NC}"
    fi
}

# Trap SIGINT, SIGTERM, and SIGHUP
trap 'cleanup; exit 1' SIGINT SIGTERM SIGHUP SIGTSTP

# Path to the .env file
env_file="$PROJECT_ROOT/backend/.env"

# Check if .env file exists and call setup_environment.sh if needed
if [ ! -f "$env_file" ]; then
    # Call the setup script from the utils directory
    bash "$PROJECT_ROOT/backend/setup_environment.sh"
fi

# Start backend and frontend servers
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