# Configure ModelSmith with AutoAWQ

This guide provides instructions to configure ModelSmith to work with [AutoAWQ](https://github.com/mit-han-lab/llm-awq), facilitating the process of model quantization using remote computational resources.

## References

- [Original Paper: AutoAWQ](https://arxiv.org/pdf/2306.00978)
- [Main Repository: AutoAWQ](https://github.com/mit-han-lab/llm-awq)

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

   In this step, you need to obtain an access token from Hugging Face and add it to your `.env` configuration file.

   1. **Obtain the Access Token:**

      - If you don't have a Hugging Face account, create one [here](https://huggingface.co/join).
      - Request access to [Mistral-7B-Instruct-v0.2 on Hugging Face](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2).
      - After gaining access, navigate to your Hugging Face account:
        - Go to [Profile/Settings](https://huggingface.co/settings/tokens).
        - Under the "Access Tokens" section, generate a new token with read permissions.

   2. **Add the Access Token to the `.env` File:**

      Open your `.env` file and add the following line, replacing `insert_token_here` with your actual Hugging Face access token:

      ```bash
      HUGGING_FACE_ACCESS_TOKEN=insert_token_here
      ```

For further details on configuring AutoAWQ, refer to the [AutoAWQ documentation](https://github.com/casper-hansen/AutoAWQ).
