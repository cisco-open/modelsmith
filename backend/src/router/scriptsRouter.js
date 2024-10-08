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
const { broadcastStatus } = require('../websockets/websocketService');
const checkSshConnection = require('../ssh/checkSshConnectionMiddleware');
const checkIfNoScriptRunning = require('../middlewares/checkIfNoScriptRunning');
const checkIfScriptRunning = require('../middlewares/checkIfScriptRunning');
const ALGORITHMS = require('../constants/algorithmsConstants');
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
const TerminalWebSocketService = require('../websockets/terminalWebsocketService');
const { getParserForAlgorithmType } = require('../utils/parserUtils');
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');

const SCRIPT_START_MARKER = '===SCRIPT_START===';
const SCRIPT_END_MARKER = '===SCRIPT_END===';

const wrapCommandWithMarkers = (command) => {
	return `echo "${SCRIPT_START_MARKER}" && (${command}) ; echo "${SCRIPT_END_MARKER}"`;
};

const buildArgsString = (alg, providedParams) => {
	const defaultParamsArray = ALGORITHM_PARAMETERS[alg] || [];
	const defaultParameters = Object.fromEntries(defaultParamsArray.map((param) => [param.argName, param.defaultValue]));
	const mergedParams = { ...defaultParameters, ...providedParams };

	if (alg === 'AWQ_Q' && process.env.HUGGING_FACE_ACCESS_TOKEN) {
		mergedParams.token = process.env.HUGGING_FACE_ACCESS_TOKEN;
	}

	const args = Object.entries(mergedParams)
		.map(([key, value]) => `--${key}=${value}`)
		.join(' ');

	return { mergedParams, args };
};

const buildCommand = (scriptDetails, args) => {
	const scriptPath = `${process.env.MACHINE_LEARNING_CORE_PATH}/${scriptDetails.path}`;
	const algorithm = scriptDetails.fileName;

	if (scriptDetails.type === ALGORITHM_TYPES.MULTIFLOW) {
		return `source ${process.env.CONDA_SH_PATH} && cd ${process.env.MACHINE_LEARNING_CORE_PATH}/multiflow && conda activate modelsmith && python3 ${algorithm} ${args}`;
	}

	return `source ${process.env.CONDA_SH_PATH} && conda activate modelsmith && python3 ${scriptPath}${algorithm} ${args}`;
};

const changeAndBroadcastScriptState = (newState) => {
	setScriptState(newState);
	broadcastStatus();
};

const getCurrentOrLastActiveScriptDetails = (_, res) => {
	const script = getActiveScriptDetails() || getPreviousScriptDetails();

	if (!script) {
		return res.status(OK).send(JSON.stringify('No script has run yet.'));
	}

	const lastActiveScript = JSON.parse(JSON.stringify(script));

	if (lastActiveScript.algorithm) {
		lastActiveScript.type = lastActiveScript.algorithm.type;
		delete lastActiveScript.algorithm;
	}

	res.status(OK).send(lastActiveScript);
};

const runScript = async (req, res) => {
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

	const command = wrapCommandWithMarkers(buildCommand(scriptDetails, args));

	try {
		const terminalService = await TerminalWebSocketService.getInstance();
		const shell = terminalService.getShell();
		if (!shell) {
			throw new Error('Shell is not initialized.');
		}

		const parser = getParserForAlgorithmType(scriptDetails.type);
		if (parser) {
			parser.reset();
		}

		let scriptRunning = false;

		const handleData = (data) => {
			const output = data.toString('utf8');

			if (output.includes(SCRIPT_START_MARKER)) {
				scriptRunning = true;
				if (parser) {
					parser.reset();
				}
				changeAndBroadcastScriptState(ScriptState.RUNNING);
				return;
			}

			if (output.includes(SCRIPT_END_MARKER)) {
				scriptRunning = false;
				shell.removeListener('data', handleData);
				setActiveScriptDetails(null);
				changeAndBroadcastScriptState(ScriptState.NOT_RUNNING);
				return;
			}

			if (scriptRunning && parser) {
				parser.parseLine(output);
			}
		};

		shell.on('data', handleData);

		terminalService.sendCommand(command);

		res.status(OK).send({ message: 'Script started successfully.' });
	} catch (error) {
		logger.error(`Error executing command: ${error}`);
		res.status(INTERNAL_SERVER_ERROR).send({
			error: 'The script has errors and failed to start automatically. Please check the terminal.'
		});
	} finally {
		setActiveScriptDetails(null);
		changeAndBroadcastScriptState(ScriptState.NOT_RUNNING);
	}
};

const getScriptStatus = (req, res) => {
	const scriptStatus = getScriptState();
	res.status(OK).send({ status: scriptStatus });
};

const stopScript = async (req, res) => {
	try {
		const terminalService = await TerminalWebSocketService.getInstance();
		const shell = terminalService.getShell();
		if (!shell) {
			throw new Error('Shell is not initialized.');
		}

		terminalService.sendCommand('\x03'); // Ctrl+C character
		setScriptState(ScriptState.STOPPING);

		const handleData = (data) => {
			const output = data.toString('utf8');
			if (output.includes(SCRIPT_END_MARKER)) {
				shell.removeListener('data', handleData);
				setScriptState(ScriptState.NOT_RUNNING);
				setActiveScriptDetails(null);
				if (!res.headersSent) {
					res.status(OK).send({ message: 'Script stopped successfully.' });
				}
			}
		};

		shell.on('data', handleData);

		const stopTimeout = setTimeout(() => {
			shell.removeListener('data', handleData);
			setScriptState(ScriptState.NOT_RUNNING);
			setActiveScriptDetails(null);
			if (!res.headersSent) {
				res.status(INTERNAL_SERVER_ERROR).send({
					error: 'Failed to stop the script within the expected time.'
				});
			}
		}, 10000);

		shell.once('data', () => clearTimeout(stopTimeout));
	} catch (error) {
		logger.error(`Error stopping script: ${error}`);
		if (!res.headersSent) {
			res.status(INTERNAL_SERVER_ERROR).send({
				error: 'Failed to stop the script. Please check the terminal.'
			});
		}
	}
};

router.get('/current-or-last-active-script-details', getCurrentOrLastActiveScriptDetails);
router.post('/run-script', checkSshConnection, checkIfScriptRunning, runScript);
router.get('/script-status', getScriptStatus);
router.post('/stop-script', checkSshConnection, checkIfNoScriptRunning, stopScript);

module.exports = router;
