//   Copyright 2024 Cisco Systems, Inc.

//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at

//       http://www.apache.org/licenses/LICENSE-2.0

//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

//  SPDX-License-Identifier: Apache-2.0

const express = require('express');
const os = require('os');
const router = express.Router();
const getModelsByType = require('../constants/modelsConstants');
const { getActiveScriptDetails, getPreviousScriptDetails } = require('../state/scriptState');
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');
const { executeCommand } = require('../ssh/commandExecutionFacade');
const checkSshConnection = require('../ssh/checkSshConnectionMiddleware');
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../constants/httpStatusCodes');

const CHECKPOINT_PATHS = {
	[ALGORITHM_TYPES.QUANTIZATION]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_quant/models_checkpoints`,
	[ALGORITHM_TYPES.PRUNING]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_pruning/models_checkpoints`,
	[ALGORITHM_TYPES.MACHINE_UNLEARNING]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_unlearning/models_checkpoints`
};

router.get('/current-or-previous-selected-model/:type', (req, res) => {
	const requestedType = req.params.type;

	const script = getActiveScriptDetails() || getPreviousScriptDetails();

	const defaultValues = {
		[ALGORITHM_TYPES.QUANTIZATION]: 'resnet18',
		[ALGORITHM_TYPES.PRUNING]: 'ResNet18',
		[ALGORITHM_TYPES.MACHINE_UNLEARNING]: 'ResNet18',
		[ALGORITHM_TYPES.AWQ]: 'mistralai/Mistral-7B-Instruct-v0.2',
		Q_TRAIN: 'resnet18',
		P_TRAIN: 'ResNet18',
		MU_TRAIN: 'ResNet18'
	};

	let modelValue = defaultValues[requestedType];

	if (script && script.params && script.algorithm.type === requestedType) {
		if (requestedType === ALGORITHM_TYPES.AWQ) {
			modelValue = script.params.model || modelValue;
		} else {
			modelValue = script.params.arch || modelValue;
		}
	}

	res.status(OK).json({ model: modelValue });
});

/**
 * GET endpoint for retrieving a list of models filtered by a specific algorithm type ('type' parameter in the URL).
 * Each model in the list includes a flag indicating whether it has been trained (isTrained).
 *
 * The function first checks if the requested model type exists by attempting to retrieve a predefined list
 * of models associated with that type. If no models are found, a 404 Not Found status is returned with a message
 * indicating that the model type was not found.
 *
 * If the model type is 'AWQ', the function directly sets the 'isTrained' flag to true for each model, as these models
 * are pretrained and sourced from Hugging Face. It then responds with a status of 200 OK and the list of models.
 *
 * For other valid model types, the function constructs a file listing command based on a directory path that
 * corresponds to the model type. This path is determined from a mapping (CHECKPOINT_PATHS) that associates
 * algorithm types to their respective storage directories on the filesystem.
 *
 * The command executed lists all '.pt' files (PyTorch model files) in the designated directory. The output of this
 * command is processed to extract the model names, which are then compared against the list of models for the
 * requested type. For each model, a boolean flag 'isTrained' is set, indicating whether a corresponding '.pt' file
 * exists in the directory.
 *
 * Finally, the function responds with a status of 200 OK and a JSON payload containing the list of models for the
 * requested type, each annotated with its training status. In case of errors during command execution, a 500
 * Internal Server Error status is returned with an error message.
 *
 * @param {Request} req - The HTTP request object, containing the 'type' parameter specifying the algorithm type.
 * @param {Response} res - The HTTP response object used to send back the resulting data or error messages.
 */
router.get('/models-list/:type', checkSshConnection, (req, res) => {
	const type = req.params.type;
	const models = getModelsByType(type);

	if (!models || models.length === 0) {
		return res.status(NOT_FOUND).send({ error: 'Model type not found' });
	}

	if (type === ALGORITHM_TYPES.AWQ) {
		// For AWQ models are already pretrained. We take them from https://huggingface.co/
		const modelsAreTrained = models.map((modelName) => ({
			name: modelName,
			isTrained: true
		}));

		return res.status(OK).send(modelsAreTrained);
	}

	const directoryPath = CHECKPOINT_PATHS[type];
	if (!directoryPath) {
		return res.status(BAD_REQUEST).send({ error: 'Invalid model type specified' });
	}

	const listFilesCommand = `find ${directoryPath} -maxdepth 1 -name "*.pt"`;

	executeCommand(
		listFilesCommand,
		(output) => {
			const files = output
				.split('\n')
				.filter((line) => line.trim() !== '')
				.map((filename) => {
					const match = filename.match(/([^\/]+)\.pt$/);
					return match ? match[1] : null;
				})
				.filter((name) => name !== null);

			const modelsWithTrainingInfo = models.map((modelName) => ({
				name: modelName,
				isTrained: files.includes(modelName)
			}));

			return res.status(OK).send(modelsWithTrainingInfo);
		},
		() => {},
		(error) => {
			if (!error || error.includes('No such file or directory') || error.includes('File not found')) {
				const modelsWithTrainingInfo = models.map((modelName) => ({
					name: modelName,
					isTrained: false
				}));
				return res.status(OK).send(modelsWithTrainingInfo);
			} else {
				return res.status(INTERNAL_SERVER_ERROR).send({ error: `Error listing model checkpoint files: ${error}` });
			}
		}
	);
});

router.get('/model-metadata/:type/:arch', checkSshConnection, (req, res) => {
	const { type, arch } = req.params;
	const directoryPath = CHECKPOINT_PATHS[type];

	if (!directoryPath) {
		return res.status(BAD_REQUEST).send({ error: 'Invalid model type specified' });
	}

	const metadataFilePath = `${directoryPath}/${arch}_training_info.json`;

	let readJsonFileCommand;
	switch (os.platform()) {
		case 'win32':
			readJsonFileCommand = `type "${metadataFilePath}"`;
			break;
		case 'darwin':
		case 'linux':
			readJsonFileCommand = `cat "${metadataFilePath}"`;
			break;
		default:
			throw new Error(`Unsupported platform: ${os.platform()}`);
	}

	executeCommand(
		readJsonFileCommand,
		(output) => {
			try {
				const metadata = JSON.parse(output);
				res.status(OK).send(metadata);
			} catch (error) {
				res.status(INTERNAL_SERVER_ERROR).send({ error: `Error parsing JSON content: ${error.message}` });
			}
		},
		() => {},
		(error) => {
			if (error.includes('No such file or directory') || error.includes('The system cannot find the path specified.')) {
				res.status(OK).send({});
			} else {
				res.status(INTERNAL_SERVER_ERROR).send({ error: `Error reading model metadata file: ${error}` });
			}
		}
	);
});

module.exports = router;
