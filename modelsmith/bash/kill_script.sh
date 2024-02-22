#!/bin/bash

# Check if an argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <process_name_or_command_part>"
    exit 1
fi

# The name or part of the name of the process you want to search for
PROCESS_NAME="$1"

# Fetch all processes that have the name $PROCESS_NAME
PIDS=$(ps aux | grep $PROCESS_NAME | grep -v grep | awk '{print $2}')

if [ -z "$PIDS" ]; then
    echo "No process found for $PROCESS_NAME"
else
    # Kill each PID found
    for pid in $PIDS; do
        echo "Killing process $pid"
        kill -9 $pid
    done
fi