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

const { exec } = require('child_process');
const CONNECTION_TYPE = require('../constants/connectionTypeConstants');
const SSHConnectionSingleton = require('./sshConnectionInstance');

/**
 * Executes a command either locally or on a VM, transparently handling the execution context.
 * @param {string} cmd The command to execute.
 * @param {Function} onData Callback for handling data chunks (stdout).
 * @param {Function} onEnd Callback for handling the end of the command execution.
 * @param {Function} onError Callback for handling errors.
 * @param {boolean} accumulateOutput Whether to accumulate the output and pass it to the onEnd callback.
 */
async function executeCommand(cmd, onData, onEnd = () => {}, onError = () => {}, accumulateOutput = false) {
	if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
		const child = exec(cmd);
		let stdoutData = '';
		let stderrData = '';

		child.stdout.on('data', (data) => {
			if (accumulateOutput) {
				stdoutData += data.toString();
			} else {
				onData(data.toString());
			}
		});

		child.stderr.on('data', (data) => {
			stderrData += data.toString();
		});

		child.on('close', (code) => {
			if (code !== 0) {
				const errorMessage = `Process exited with code ${code}` + (stderrData ? `: ${stderrData}` : '');
				onError(errorMessage);
			} else {
				onEnd(accumulateOutput ? stdoutData : undefined);
			}
		});

		child.on('error', (err) => {
			onError(`Failed to start subprocess: ${err.message}`);
		});
	} else if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.VM) {
		try {
			const sshConnection = await SSHConnectionSingleton.getInstance();
			if (accumulateOutput) {
				sshConnection.executeAndAccumulateOutput(cmd, onData, onEnd, onError);
			} else {
				sshConnection.exec(cmd, onData, onEnd, onError);
			}
		} catch (error) {
			onError(`Failed to establish SSH connection: ${error.message}`);
		}
	} else {
		onError('Unsupported connection type');
	}
}

module.exports = { executeCommand };
