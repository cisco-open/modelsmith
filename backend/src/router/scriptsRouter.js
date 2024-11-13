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

const wrapCommandWithMarkers = (command) =>
	`echo "${SCRIPT_START_MARKER}" && (${command}) ; echo "${SCRIPT_END_MARKER}"`;

const buildArgsString = (alg, providedParams) => {
	const defaultParams =
		ALGORITHM_PARAMETERS[alg]?.reduce((acc, param) => {
			acc[param.argName] = param.defaultValue;
			return acc;
		}, {}) || {};

	const mergedParams = { ...defaultParams, ...providedParams };

	if (alg === 'AWQ_Q' && process.env.HUGGING_FACE_ACCESS_TOKEN) {
		mergedParams.token = process.env.HUGGING_FACE_ACCESS_TOKEN;
	}

	const args = Object.entries(mergedParams)
		.map(([key, value]) => `--${key}=${value}`)
		.join(' ');

	return { mergedParams, args };
};

const buildCommand = (scriptDetails, args) => {
	const basePath = `${process.env.MACHINE_LEARNING_CORE_PATH}`;
	const scriptPath = `${basePath}/${scriptDetails.path}${scriptDetails.fileName}`;
	const condaActivate = `source ${process.env.CONDA_SH_PATH} && conda activate modelsmith`;

	if (scriptDetails.type === ALGORITHM_TYPES.MULTIFLOW) {
		return `${condaActivate} && cd ${basePath}/multiflow && nohup python3 ${scriptDetails.fileName} ${args} > /dev/null 2>&1 &`;
	}

	return `${condaActivate} && nohup python3 ${scriptPath} ${args} > /dev/null 2>&1 &`;
};

let previousScriptState = null;

const changeAndBroadcastScriptState = (newState) => {
	if (previousScriptState !== newState) {
		setScriptState(newState);
		broadcastStatus();
		previousScriptState = newState;
	}
};

const getCurrentOrLastActiveScriptDetails = (req, res) => {
	const script = getActiveScriptDetails() || getPreviousScriptDetails();

	if (!script) {
		return res.status(OK).json('No script has run yet.');
	}

	const { algorithm, ...rest } = script;
	const scriptDetails = { ...rest, type: algorithm?.type };

	res.status(OK).json(scriptDetails);
};

const runScript = async (req, res) => {
	const { alg = '', params = {} } = req.body;
	const scriptDetails = ALGORITHMS[alg];

	if (!scriptDetails) {
		return res.status(BAD_REQUEST).json({ error: 'Invalid algorithm provided.' });
	}

	const { mergedParams, args } = buildArgsString(alg, params);

	setActiveScriptDetails({ algKey: alg, algorithm: scriptDetails, params: mergedParams });
	changeAndBroadcastScriptState(ScriptState.RUNNING);

	const command = wrapCommandWithMarkers(buildCommand(scriptDetails, args));

	try {
		const terminalService = await TerminalWebSocketService.getInstance();
		const shell = terminalService.getShell();

		if (!shell) {
			throw new Error('Shell is not initialized.');
		}

		const parser = getParserForAlgorithmType(scriptDetails.type);
		parser?.reset();

		let scriptRunning = false;

		const handleData = (data) => {
			const output = data.toString('utf8');

			if (output.includes(SCRIPT_START_MARKER)) {
				scriptRunning = true;
				parser?.reset();
				changeAndBroadcastScriptState(ScriptState.RUNNING);
				return;
			}

			if (output.includes(SCRIPT_END_MARKER)) {
				scriptRunning = false;
				shell.off('data', handleData);
				setActiveScriptDetails(null);
				changeAndBroadcastScriptState(ScriptState.NOT_RUNNING);
				return;
			}

			if (scriptRunning) {
				parser?.parseLine(output);
			}
		};

		shell.on('data', handleData);
		terminalService.sendCommand(command);

		setTimeout(() => {
			terminalService.checkAndAttachToRunningProcess();
		}, 500);

		res.status(OK).json({ message: 'Script started successfully.' });
	} catch (error) {
		logger.error(`Error executing command: ${error}`);
		res.status(INTERNAL_SERVER_ERROR).json({
			error: 'The script has errors and failed to start automatically. Please check the terminal.'
		});
	}
};

const getScriptStatus = (req, res) => {
	res.status(OK).json({ status: getScriptState() });
};

const stopScript = async (req, res) => {
	try {
		const terminalService = await TerminalWebSocketService.getInstance();
		const shell = terminalService.getShell();

		if (!shell) {
			throw new Error('Shell is not initialized.');
		}

		terminalService.sendCommand('\x03'); // Send Ctrl+C to stop the script
		changeAndBroadcastScriptState(ScriptState.STOPPING);

		setTimeout(() => {
			setActiveScriptDetails(null);
			changeAndBroadcastScriptState(ScriptState.NOT_RUNNING);
			if (!res.headersSent) {
				res.status(OK).json({ message: 'Script interrupted by user (Ctrl+C).' });
			}
		}, 1000);
	} catch (error) {
		logger.error(`Error stopping script: ${error}`);
		if (!res.headersSent) {
			res.status(INTERNAL_SERVER_ERROR).json({
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
