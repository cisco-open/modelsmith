import argparse
import logging
import os
import sys
from huggingface_hub import login
from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer
from datetime import datetime
import io

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Create a logging handler that writes to stdout and flushes immediately
class FlushHandler(logging.StreamHandler):
    def emit(self, record):
        super().emit(record)
        self.flush()

handler = FlushHandler(sys.stdout)
formatter = logging.Formatter('%(message)s')  # Only include the message in the format
handler.setFormatter(formatter)
logger.addHandler(handler)

class StreamToLogger(io.StringIO):
    def __init__(self, logger, level):
        super().__init__()
        self.logger = logger
        self.level = level

    def write(self, message):
        if message.strip():  # Avoid logging empty messages
            self.logger.log(self.level, message.strip())

    def flush(self):
        pass

# Redirect stdout and stderr to logging
sys.stdout = StreamToLogger(logger, logging.INFO)
sys.stderr = StreamToLogger(logger, logging.ERROR)

# Define directory paths
script_dir = os.path.dirname(os.path.realpath(__file__))
quantization_dir = os.path.join(script_dir, 'quantization')

def generate_quant_path(model_path: str) -> str:
    model_name = model_path.split('/')[-1]
    current_datetime = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    return os.path.join(quantization_dir, f"{model_name}-quantized-{current_datetime}")

def quantize_and_save_model(model_path: str, token: str, quant_config: dict):
    # Login to Hugging Face
    login(token=token)

    # Generate quant_path based on model_path and current date
    quant_path = generate_quant_path(model_path)
    if not os.path.exists(quant_path):
        os.makedirs(quant_path)

    # Load model
    model = AutoAWQForCausalLM.from_pretrained(
        model_path, low_cpu_mem_usage=True, use_cache=False
    )
    tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)

    # Quantize
    model.quantize(tokenizer, quant_config=quant_config)

    # Save quantized model
    model.save_quantized(quant_path)
    tokenizer.save_pretrained(quant_path)

    logger.info(f'Model is quantized and saved at "{quant_path}"')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Quantize a Hugging Face model and save it.")

    # Supported Model Paths

    # mosaicml/mpt-7b ( https://huggingface.co/mosaicml/mpt-7b )
    # decapoda-research/llama-7b-hf ( https://huggingface.co/baffo32/decapoda-research-llama-7B-hf )
    # facebook/opt-1.3b ( https://huggingface.co/facebook/opt-1.3b )
    # tiiuae/falcon-7b ( https://huggingface.co/tiiuae/falcon-7b )
    # bigscience/bloom-560m ( https://huggingface.co/bigscience/bloom-560m )
    # EleutherAI/gpt-j-6B ( https://huggingface.co/EleutherAI/gpt-j-6b )
    # bigcode/gpt_bigcode-santacoder ( https://huggingface.co/bigcode/gpt_bigcode-santacoder )
    # mistralai/Mistral-7B-v0.3 ( https://huggingface.co/mistralai/Mistral-7B-v0.3 )
    # mistralai/Mistral-7B-Instruct-v0.3 ( https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3 )
    # EleutherAI/gpt-neox-20b ( https://huggingface.co/EleutherAI/gpt-neox-20b )
    # Qwen/Qwen-7B ( https://huggingface.co/Qwen/Qwen-7B )
    # baichuan-inc/Baichuan-7B ( https://huggingface.co/baichuan-inc/Baichuan-7B )
    # liuhaotian/llava-v1.5-13b ( https://huggingface.co/liuhaotian/llava-v1.5-13b )
    # stabilityai/stablelm-tuned-alpha-7b ( https://huggingface.co/stabilityai/stablelm-tuned-alpha-7b )
    # bigcode/starcoder ( https://huggingface.co/bigcode/starcoder )

    parser.add_argument("--model", type=str, required=True, help="Path to the pre-trained model")
    parser.add_argument("--token", type=str, help="Hugging Face token for login")
    parser.add_argument("--w_bit", type=int, choices=[4, 8, 16], default=4, help="Bit width for weights (4, 8, 16)")
    parser.add_argument("--zero_point", type=bool, choices=[True, False], default=True, help="Use zero-point quantization (True, False)")
    parser.add_argument("--q_group_size", type=int, choices=[32, 64, 128, 256], default=128, help="Quantization group size (32, 64, 128, 256)")
    parser.add_argument("--version", type=str, choices=["GEMM", "DEFAULT"], default="GEMM", help="Quantization version/algorithm (GEMM, DEFAULT)")
    args = parser.parse_args()

    quant_config = {
        "zero_point": args.zero_point,
        "q_group_size": args.q_group_size,
        "w_bit": args.w_bit,
        "version": args.version
    }

    quantize_and_save_model(args.model, args.token, quant_config)
