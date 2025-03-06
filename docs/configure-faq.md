# Frequently Asked Questions

## 1. How do I obtain and configure my Hugging Face access token?

To use Mistral-7B-Instruct-v0.2 (or other private Hugging Face models), you must have a **Hugging Face access token** with the necessary permissions. Follow the steps below to acquire and add this token to your `.env` configuration file.

---

### 1.1. Obtain the Access Token

1. **Create or Log In to Hugging Face**  
   - If you don't already have an account, sign up at [huggingface.co/join](https://huggingface.co/join).

2. **Request Model Access**  
   - Go to the [Mistral-7B-Instruct-v0.2 page](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2) and request access if it’s required.

3. **Generate a Token**  
   - After you have access to the model, log in to your Hugging Face account.  
   - Navigate to your [Profile/Settings](https://huggingface.co/settings/tokens).  
   - Under **Access Tokens**, select **New token**.  
   - Give it a name and ensure it has at least **read** permissions.

---

### 1.2. Add the Token to the `.env` File

1. **Locate Your `.env`**  
   - This file can be found in the `backend` folder or wherever you keep your environment variables.

2. **Insert the Token**  
   - Open `.env` in your favorite text editor.  
   - Add the following line (or update it if it already exists), making sure to replace `insert_token_here` with your actual Hugging Face token:

     ```bash
     HUGGING_FACE_ACCESS_TOKEN=insert_token_here
     ```

3. **Save and Close**  
   - Save your changes to `.env`.  
   - Your application will now have the necessary credentials to access and interact with Hugging Face models.

---

**Need more help?**  
- Check the official Hugging Face [documentation](https://huggingface.co/docs) for additional details on token management, or reach out to your team or community forums if you encounter any issues.
