//   Copyright 2024 Cisco Systems, Inc. and its affiliates

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
const router = express.Router();
const { broadcastTerminal, broadcastStatus } = require('../services/websocketService');
const checkSshConnection = require('../middlewares/checkSshConnection');
const checkIfNoScriptRunning = require('../middlewares/checkIfNoScriptRunning');
const checkIfScriptRunning = require('../middlewares/checkIfScriptRunning');
const ALGORITHMS = require('../constants/algorithmsConstants');
const MESSAGE_TYPES = require('../constants/messageTypes');
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require('../constants/httpStatusCodes');
const logger = require('../utils/logger');
const {
	getScriptState,
	setScriptState,
	ScriptState,
	setActiveScriptDetails,
	getActiveScriptDetails,
	getPreviousScriptDetails
} = require('../state/scriptState');
const ALGORITHM_PARAMETERS = require('../constants/parametersConstants');
const { executeCommand } = require('../facades/commandExecutionFacade');
const { executorFactory } = require('../facades/algorithmExecutionFacade');

router.get('/current-or-last-active-script-details', (_, res) => {
	let script = getActiveScriptDetails() || getPreviousScriptDetails();

	if (!script) {
		return res.status(OK).send(JSON.stringify('No script has run yet.'));
	}

	let lastActiveScript = JSON.parse(JSON.stringify(script));

	if (lastActiveScript.algorithm) {
		lastActiveScript['type'] = lastActiveScript.algorithm.type;
		delete lastActiveScript['algorithm'];
	}

	res.status(OK).send(lastActiveScript);
});

router.post('/run-script', checkSshConnection, checkIfScriptRunning, async (req, res) => {
	const { alg = '', params = [] } = req.body;

	const scriptDetails = ALGORITHMS[alg];
	if (!scriptDetails) {
		return res.status(BAD_REQUEST).send({ error: 'Invalid algorithm provided.' });
	}

	const { mergedParams, args } = buildArgsString(alg, params);

	setActiveScriptDetails({
		algKey: alg,
		algorithm: scriptDetails,
		params: mergedParams
	});

	changeAndBroadcastScriptState(ScriptState.RUNNING);

	const executor = executorFactory[scriptDetails.type];
	if (!executor) {
		return res.status(BAD_REQUEST).send({ error: 'Unsupported algorithm type.' });
	}

	try {
		await executor.execute(
			`${process.env.MACHINE_LEARNING_CORE_PATH}/${scriptDetails.path}`,
			scriptDetails.fileName,
			args
		);
		res.status(OK).send({ message: 'Script execution ended successfully.' });
		broadcastTerminal('Script execution ended successfully.', MESSAGE_TYPES.SUCCESS);
	} catch (error) {
		logger.error(`Error executing command: ${error}`);
		res.status(INTERNAL_SERVER_ERROR).send({
			error: 'The script has errors and failed to start automatically. Please check the terminal.'
		});
		broadcastTerminal(error, MESSAGE_TYPES.ERROR);
	} finally {
		setActiveScriptDetails(null);
		changeAndBroadcastScriptState(ScriptState.NOT_RUNNING);
	}
});

router.post('/execute-command', (req, res) => {
	const { command } = req.body;

	if (!command) {
		return res.status(BAD_REQUEST).send({ error: 'No command provided.' });
	}

	try {
		executeCommand(
			command,
			(data) => {
				broadcastTerminal(data.toString(), MESSAGE_TYPES.INFO);
			},
			() => {},
			(error) => {
				broadcastTerminal(`Error: ${error}`, MESSAGE_TYPES.ERROR);
			}
		);
		res.status(OK).send({ message: 'Command execution started.' });
	} catch (error) {
		broadcastTerminal(`Execution failed: ${error.message}`, MESSAGE_TYPES.ERROR);
		res.status(BAD_REQUEST).send({ error: error.message });
	}
});

router.get('/script-status', (req, res) => {
	const scriptStatus = getScriptState();
	const response = { status: scriptStatus };
	res.status(OK).send(response);
});

router.post('/stop-script', checkSshConnection, checkIfNoScriptRunning, (req, res) => {
	const activeDetails = getActiveScriptDetails();
	const fileName = activeDetails ? activeDetails.algorithm.fileName : null;

	if (!fileName) {
		return res.status(BAD_REQUEST).send({ error: 'Unable to fetch script details.' });
	}

	const killCommand = `bash ${process.env.MACHINE_LEARNING_CORE_PATH}/bash/kill_script.sh ${fileName}`;
	let responseSent = false;

	broadcastTerminal('Stopping script started.');
	setScriptState(ScriptState.STOPPING);

	executeCommand(
		killCommand,
		(data) => {
			if (responseSent) return;
			logger.info(`kill_script.sh output: ${data.toString()}`);
		},
		() => {
			if (responseSent) return;
			setScriptState(ScriptState.NOT_RUNNING);
			setActiveScriptDetails(null);
			broadcastTerminal('Script stopped successfully.', MESSAGE_TYPES.SUCCESS);
			res.status(OK).send({ message: 'Script stopped successfully.' });
			responseSent = true;
		},
		() => {
			if (responseSent) return;
			setScriptState(ScriptState.NOT_RUNNING);
			setActiveScriptDetails(null);
			responseSent = true;
		}
	);
});

// Helper functions
const buildArgsString = (alg, providedParams) => {
	const defaultParamsArray = ALGORITHM_PARAMETERS[alg] || [];
	const defaultParameters = defaultParamsArray.reduce((acc, param) => {
		acc[param.argName] = param.defaultValue;
		return acc;
	}, {});
	const mergedParams = { ...defaultParameters, ...providedParams };
	if (alg === 'AWQ_Q') {
		const token = process.env.HUGGING_FACE_ACCESS_TOKEN;
		if (token) {
			mergedParams.token = token;
		}
	}
	return {
		mergedParams,
		args: Object.entries(mergedParams)
			.map(([key, value]) => `--${key}=${value}`)
			.join(' ')
	};
};

const changeAndBroadcastScriptState = (newState) => {
	setScriptState(newState);
	broadcastStatus();
};

module.exports = router;
