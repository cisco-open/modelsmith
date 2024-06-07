# Configure ModelSmith with AutoAWQ

This guide provides instructions to configure ModelSmith to work with AutoAWQ, facilitating the process of model quantization using remote computational resources.

## Prerequisites

Before proceeding, ensure you have configured the project locally or on a VM.

1. **Activate the current Conda Environment**:

   ```bash
   conda activate modelsmith
   ```

2. **Install Required Libraries**:

   Navigate to the `autoawq` directory and install AutoAWQ:

   ```bash
   cd /path/to/machine_learning_core/autoawq
   pip install autoawq
   ```

3. **Configure AutoAWQ**:

   Edit the `quantize.py` file to include your login token:

   ```python
   # Inside machine_learning_core/autoawq/examples/quantize.py
   login(token="INSERT_TOKEN_HERE")
   ```

   To obtain the token:

   1. If you don't have a Hugging Face account, create one [here](https://huggingface.co/join).
   2. Request access to [Mistral-7B-Instruct-v0.2 on Hugging Face](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2).
   3. After gaining access, navigate to your Hugging Face account:
      - Go to [Profile/Settings](https://huggingface.co/settings/tokens).
      - Under the "Access Tokens" section, generate a new token with read permissions.

For further details on configuring AutoAWQ, refer to the [AutoAWQ documentation](https://github.com/casper-hansen/AutoAWQ).
