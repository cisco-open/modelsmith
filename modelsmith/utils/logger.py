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
        self.messages.append(self.serialize_obj(message))

    def serialize_obj(self, obj):
        if isinstance(obj, dict):
            return {k: self.serialize_obj(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [self.serialize_obj(v) for v in obj]
        elif hasattr(obj, "to_json"):
            return obj.to_json()  
        elif isinstance(obj, (str, int, float, bool)):
            return obj
        else:
            return str(obj)

    def set_parameters(self, params):
        self.parameters = self.serialize_obj(params)

    def add_statistic(self, key, value):
        self.statistics[key] = self.serialize_obj(value) 

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
