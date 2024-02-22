# Modelsmith

ModelSmith serves as a toolkit for compressing machine learning models, designed to enhance their speed, reduce their size, and improve energy efficiency. This toolbox addresses the demands for smaller model sizes, minimal memory usage, quicker inference times, energy-saving operations, and scenarios conforming to bandwidth limitations.

ModelSmith makes it ideal for deploying on a diverse array of devices and platforms, ensuring satisfactory performance. Its main features encompass post-training quantization, machine unlearning and a range of pruning algorithms, essential for optimizing models.

ModelSmith is developed by researchers and engineers working at Cisco Research.

## Table of Contents

- [Features](#features)
- [Prerequisities](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Supported features](#supported-technologies)
- [Contributions](#contributions)
- [License](#license)

## Features

- **Frontend Server**: Modelsmith's frontend is built using Angular and is deployed as a production build to the 'frontend/server/modelsmith-build' folder. The frontend server, powered by Express.js, serves the web application in to users in optimized mode on port 4200.

- **Backend Server**: Modelsmith includes a backend server built using Node.js, which serves as the core of the application. The backend server handles various tasks such as model optimization, deployment, and management. It is accessible on port 3000.

## Prerequisites

Before you can use this application, please ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.17.1 or higher)

Node.js includes npm by default, so you don't need to install npm separately.

If you don't have Node.js and npm installed, you can follow these steps to install them:

**Node.js:**

- Visit the [Node.js website](https://nodejs.org/).
- Download the installer for your operating system.
- Run the installer and follow the on-screen instructions.

To verify that you have successfully installed Node.js and npm, you can run the following commands in your terminal:

```bash
node -v
```

## Getting Started

To get started with Modelsmith, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/modelsmith.git
   ```

2. Navigate to the project's root directory:

   ```shell
   cd modelsmith
   ```

3. Run start_modelsmith.sh to install project dependencies for both the frontend and backend and start both servers:

   ```bash
   bash start_modelsmith.sh
   ```

4. Access `http://localhost:4200` from the URLs in your web browser to start the app.

## Usage

- The frontend provides a user interface for interacting with the application.

- The backend offers APIs and services to support the frontend's functionality and communicates with a VM for running the python scripts.

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
