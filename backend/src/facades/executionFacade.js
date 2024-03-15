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

const { exec } = require('child_process');
const SSHConnection = require('../utils/sshConnection');
const { SSH_CONNECTION_NAMES, SSH_STATUS } = require('../constants/sshConstants');
const CONNECTION_TYPE = require('../constants/connectionTypeConstants');

let sshConnection;
if (process.env.CONNECTION_TYPE !== CONNECTION_TYPE.LOCAL) {
	sshConnection = new SSHConnection(SSH_CONNECTION_NAMES.PRIMARY);
}

/**
 * Checks the status of the SSH connection, if applicable.
 * @returns {string} The status of the connection: 'READY', 'NOT_CONNECTED', or 'ERROR'.
 */
function getConnectionStatus() {
	if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
		// Local execution is always considered 'READY'
		return SSH_STATUS.READY;
	} else {
		// Adapt this based on how you can check the status in your SSHConnection implementation
		return sshConnection ? sshConnection.status : SSH_STATUS.NOT_CONNECTED;
	}
}

/**
 * Executes a command either locally or on a VM, transparently handling the execution context.
 * @param {string} cmd The command to execute.
 * @param {Function} onData Callback for handling data chunks (stdout).
 * @param {Function} onEnd Callback for handling the end of the command execution.
 * @param {Function} onError Callback for handling errors.
 */
function executeCommand(cmd, onData, onEnd = () => {}, onError = () => {}) {
	if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
		// RUN ON LOCAL MACHINE
		const child = exec(cmd);
		let stderrData = '';

		child.stdout.on('data', (data) => {
			onData(data.toString());
		});

		child.stderr.on('data', (data) => {
			stderrData += data.toString();
		});

		child.on('close', (code) => {
			if (code !== 0) {
				const errorMessage = `Process exited with code ${code}` + (stderrData ? `: ${stderrData}` : '');
				onError(errorMessage);
			} else {
				onEnd();
			}
		});

		child.on('error', (err) => {
			// Handling process spawning errors
			onError(`Failed to start subprocess: ${err.message}`);
		});
	} else {
		// RUN ON VM
		sshConnection.exec(cmd, onData, onEnd, onError);
	}
}

module.exports = { executeCommand, getConnectionStatus };
