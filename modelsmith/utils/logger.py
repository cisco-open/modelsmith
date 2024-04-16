import json
import os
import time

class RunLogger:
    def __init__(self, log_directory, create_dir=True):
        self.messages = []
        self.parameters = None
        self.statistics = {}
        self.log_directory = log_directory
        if create_dir:
            os.makedirs(log_directory, exist_ok=True)

    def log(self, message):
        print(message, flush=True)
        self.messages.append(message)

    def set_parameters(self, params):
        self.parameters = params

    def add_statistic(self, key, value):
        self.statistics[key] = value

    def save_run_record(self, filename):
        timestamp = time.strftime('%Y_%m_%d_%H:%M:%S')
        full_filename = os.path.join(self.log_directory, f"{timestamp}_{filename}.json")
        record = {
            "parameters": self.parameters,
            "messages": self.messages,
            "statistics": self.statistics
        }
        with open(full_filename, 'w') as f:
            json.dump(record, f, indent=4)
        return full_filename
