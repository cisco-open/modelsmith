# Configure ModelSmith with AutoAWQ

This guide provides instructions to configure ModelSmith to work with [AutoAWQ](https://github.com/mit-han-lab/llm-awq), facilitating the process of model quantization using remote computational resources.

## References

- [Original Paper: AutoAWQ](https://arxiv.org/pdf/2306.00978)
- [Main Repository: AutoAWQ](https://github.com/mit-han-lab/llm-awq)

## Steps

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
   
For further details on configuring AutoAWQ, refer to the [AutoAWQ documentation](https://github.com/casper-hansen/AutoAWQ).
