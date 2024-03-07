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

# We allow dynamic uploading of models from the FE.
# In order to use them everywhere, after each new model upload, we need to update the __init__.py to export the newly added model, making it available for other algorithms.
# This utility function is called from the BE after each file upload to dynamically rewrite the __init__.py.

# Set the path to the models directory
MODELS_DIR=$(dirname "$0")

# Remove the existing __init__.py file
rm "$MODELS_DIR/__init__.py"

# Create a new __init__.py file and populate it with imports
for file in $MODELS_DIR/*.py; do
    base=$(basename "$file" .py)
    if [ "$base" != "__init__" ]; then
        # Replace hyphen with underscore for valid module naming
        sanitized_name=$(echo "$base" | sed 's/-/_/g')
        # Rename the file if it contains a hyphen
        if [ "$base" != "$sanitized_name" ]; then
            mv "$MODELS_DIR/$base.py" "$MODELS_DIR/$sanitized_name.py"
        fi
        echo "from .$sanitized_name import *" >> "$MODELS_DIR/__init__.py"
    fi
done