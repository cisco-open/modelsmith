# Frequently Asked Questions

## 1. **How to obtain the hugging face access token?**:

   In this step, you need to obtain an access token from Hugging Face and add it to your `.env` configuration file.

   1.1. **Obtain the Access Token:**

      1.1.1. If you don't have a Hugging Face account, create one [here](https://huggingface.co/join).
      
      1.1.2. Request access to [Mistral-7B-Instruct-v0.2 on Hugging Face](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2).
      
       1.1.3. After gaining access, navigate to your Hugging Face account:
        - Go to [Profile/Settings](https://huggingface.co/settings/tokens).
        - Under the "Access Tokens" section, generate a new token with read permissions.

   1.2. **Add the Access Token to the `.env` File:**

      Open your `.env` file and add the following line, replacing `insert_token_here` with your actual Hugging Face access token:

      ```bash
      HUGGING_FACE_ACCESS_TOKEN=insert_token_here
      ```
