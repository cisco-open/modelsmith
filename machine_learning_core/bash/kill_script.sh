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

# Check if an argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <process_name_or_command_part>"
    exit 1
fi

# The name or part of the name of the process you want to search for
PROCESS_NAME="$1"

# Fetch all processes that have the name $PROCESS_NAME
PIDS=$(ps -ef | grep "$PROCESS_NAME" | grep -v grep | awk '{print $2}')

if [ -z "$PIDS" ]; then
    echo "No process found for $PROCESS_NAME"
else
    # Kill each PID found
    for pid in $PIDS; do
        echo "Killing process $pid"
        kill -9 $pid
    done
fi