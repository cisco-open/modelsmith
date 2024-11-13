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

const { executeCommand } = require('../ssh/commandExecutionFacade');
const path = require('path');

const STATUS_FILE_PATH = path.join(process.env.MACHINE_LEARNING_CORE_PATH, 'script_status.json');

const ScriptState = {
	NOT_RUNNING: 'not_running',
	RUNNING: 'running',
	STOPPING: 'stopping',
	ERROR: 'error'
};

let scriptState = ScriptState.NOT_RUNNING;
let activeScriptDetails = null;
let scriptsHistory = [];

/**
 * Checks if there is a currently running script by executing a command to read script_status.json.
 * If the file exists and contains a valid status and PID, assume the script is running.
 */
const checkScriptState = (callback) => {
	// Command to read the script_status.json file
	const checkFileCommand = `cat ${STATUS_FILE_PATH}`;

	executeCommand(
		checkFileCommand,
		(output) => {
			try {
				const statusData = JSON.parse(output);
				const { pid, status } = statusData;

				// Assume the script is running if the status is "running" and we have a valid PID
				if (status === 'running' && pid) {
					scriptState = ScriptState.RUNNING;
					activeScriptDetails = statusData;
					return callback(null, { isRunning: true, statusData });
				} else {
					// If the status is not "running", consider it as not active
					scriptState = ScriptState.NOT_RUNNING;
					activeScriptDetails = null;
					return callback(null, { isRunning: false, statusData });
				}
			} catch (parseError) {
				// Error parsing JSON from script_status.json
				scriptState = ScriptState.ERROR;
				callback(parseError);
			}
		},
		() => {},
		(fileError) => {
			// Handle case where file does not exist or other errors
			if (fileError && fileError.includes('No such file or directory')) {
				scriptState = ScriptState.NOT_RUNNING;
				activeScriptDetails = null;
				return callback(null, { isRunning: false, statusData: null });
			} else {
				scriptState = ScriptState.ERROR;
				callback(fileError);
			}
		}
	);
};

module.exports = {
	ScriptState,
	getScriptState: () => scriptState,
	setScriptState: (newState) => {
		scriptState = newState;
	},
	getActiveScriptDetails: () => activeScriptDetails,
	setActiveScriptDetails: (details) => {
		if (details === null && activeScriptDetails !== null) {
			scriptsHistory.push(JSON.parse(JSON.stringify(activeScriptDetails)));
		}
		activeScriptDetails = details;
	},
	getScriptsHistory: () => scriptsHistory,
	getPreviousScriptDetails: () => {
		if (scriptsHistory.length > 0) {
			return scriptsHistory[scriptsHistory.length - 1];
		}
		return null;
	},
	checkScriptState
};
