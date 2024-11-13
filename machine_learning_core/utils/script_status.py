import os
import json
import signal
import sys
from datetime import datetime

STATUS_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'script_status.json')

def update_status_file(status, args=None, pid=None):
    """Create or update a global status file with the current script state, including log file handling."""

    # Define the log file path based on the process ID and timestamp
    log_file_path = os.path.join(os.path.dirname(STATUS_FILE_PATH), f'process_{pid}_{datetime.now().strftime("%Y%m%d%H%M%S")}.log')

    # Redirect stdout and stderr to the log file if status is "running"
    if status == "running":
        sys.stdout = open(log_file_path, 'a')
        sys.stderr = open(log_file_path, 'a')
    
    # Define a cleanup function to remove the status file on interruption
    def cleanup(signum, frame):
        remove_status_file()
        exit(0)

    # Register cleanup for SIGINT (Ctrl+C) and SIGTERM (termination signal)
    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)

    # Prepare and write the status data to the file
    status_data = {
        "status": status,
        "pid": pid,
        "args": vars(args) if args else None,
        "start_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S") if status == "running" else None,
        "log_file": log_file_path if status == "running" else None  # Include log file path
    }
    with open(STATUS_FILE_PATH, 'w') as f:
        json.dump(status_data, f, indent=4)

def remove_status_file():
    """Remove the global status file and the corresponding log file."""
    if os.path.exists(STATUS_FILE_PATH):
        with open(STATUS_FILE_PATH, 'r') as f:
            status_data = json.load(f)
            log_file_path = status_data.get("log_file")

        if log_file_path and os.path.exists(log_file_path):
            os.remove(log_file_path)
        
        os.remove(STATUS_FILE_PATH)
        