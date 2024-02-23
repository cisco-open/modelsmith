# Modelsmith

ModelSmith serves as a toolkit for compressing machine learning models, designed to enhance their speed, reduce their size, and improve energy efficiency. This toolbox addresses the demands for smaller model sizes, minimal memory usage, quicker inference times, energy-saving operations, and scenarios conforming to bandwidth limitations.

ModelSmith makes it ideal for deploying on a diverse array of devices and platforms, ensuring satisfactory performance. Its main features encompass post-training quantization, machine unlearning and a range of pruning algorithms, essential for optimizing models.

ModelSmith is developed by researchers and engineers working at Cisco Research.

## Table of Contents

- [Getting Started](#getting-started)
- [FAQ](#faq)
- [Features](#features)
- [Supported features](#supported-technologies)
- [Contributions](#contributions)
- [License](#license)

## Getting Started

To get started with Modelsmith, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/modelsmith.git
   ```

## FAQ

### 1. How do I configure Modelsmith to run locally?

For detailed instructions on how to configure Modelsmith to run locally on your machine, including utilizing your own GPU for running Python scripts, check the guide [here](readme/configure-the-project-locally.md).

## Features

- **Frontend Server**: Modelsmith's frontend is built using Angular and is deployed as a production build to the 'frontend/server/modelsmith-build' folder. The frontend server, powered by Express.js, serves the web application in to users in optimized mode on port 4200. It provides a user interface for interacting with the application.

- **Backend Server**: Modelsmith includes a backend server built using Node.js, which serves as the core of the application. The backend server handles various tasks such as model optimization, deployment, and management. It is accessible on port 3000. The backend offers APIs and services to support the frontend's functionality and communicates with a VM for running the python scripts.

- **Modelsmith Project - Python Files for Model Training**: This feature includes a comprehensive collection of Python scripts designed for the training of machine learning models. These scripts are fine-tuned for high efficiency and can be executed on local machines with GPU support or on virtual machines (VMs), offering flexibility for users to train models using their own hardware or cloud resources.

## Supported technologies

- Post Training Quantization

  Visit the source code [PTQ](https://wwwin-github.cisco.com/gaoliu/ModelSmith/tree/master/modelsmith/examples_quant)

- Model Pruning

  Visit the source code [Pruning](https://wwwin-github.cisco.com/gaoliu/ModelSmith/tree/master/modelsmith/examples)

- Machine Unlearning

  Visit the source code [Unlearning](https://wwwin-github.cisco.com/gaoliu/ModelSmith/tree/master/modelsmith/examples_unlearning)

## Contributions

ModelSmith strives to maintain a more up-to-date fork and encourages contributions from all individuals.

## Maintainers and contributors

Yuguang Yao

Ioan Pop (John)

Yuzhang Shang

Gaowen Liu

## License

[Apache License 2.0](LICENSE.md).
