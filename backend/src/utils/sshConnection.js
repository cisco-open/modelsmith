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

const ssh2 = require('ssh2');
const logger = require('./logger');
const SSHConfigManager = require('./sshConfigManager');
const { SSH_CONNECTION_NAMES, SSH_STATUS } = require('../constants/sshConstants');

const DEFAULT_TIMEOUT_SEC = 30;

class SSHConnection {
	constructor(name, timeoutSec = DEFAULT_TIMEOUT_SEC) {
		this.currentConfig = SSHConfigManager.getConfig(name);

		this.timeoutSec = timeoutSec;
		this.status = SSH_STATUS.NOT_CONNECTED;
		this.timeoutId = null;
		this.attemptingBackup = false;

		this.attemptConnection(SSH_CONNECTION_NAMES.PRIMARY);
	}

	attemptConnection(connectionName) {
		logger.info(`Attempting to connect using ${connectionName} configuration...`);

		const config = SSHConfigManager.getConfig(connectionName);

		if (!config || Object.keys(config).length === 0) {
			throw new Error(`Configuration for connection '${connectionName}' is missing or empty.`);
		}

		this.connection = new ssh2.Client();
		this.setupEventHandlers(config);

		this.connection.connect(config);
		this.startTimeout();
	}

	setupEventHandlers(config) {
		this.connection.on('error', (err) => {
			logger.error(`Connection (${config.host}) :: error :: ${err.message}`);
			this.status = SSH_STATUS.ERROR;
			this.clearTimeout();
			this.handleConnectionError();
		});

		this.connection.on('end', () => {
			logger.info(`Connection (${config.host}) has ended.`);
			this.status = SSH_STATUS.NOT_CONNECTED;
			this.clearTimeout();
		});

		this.connection.on('close', () => {
			logger.info(`Connection (${config.host}) closed.`, this.status === SSH_STATUS.ERROR ? 'There was an error.' : '');
			this.clearTimeout();

			if (this.status === SSH_STATUS.ERROR && !this.attemptingBackup) {
				this.attemptBackupConnection();
			}

			this.status = SSH_STATUS.NOT_CONNECTED;
		});

		this.connection.on('ready', () => {
			logger.info(`Connected to the server at ${config.host}.`);
			this.status = SSH_STATUS.READY;
			this.clearTimeout();
		});
	}

	startTimeout() {
		this.timeoutId = setTimeout(() => {
			if (this.status !== SSH_STATUS.READY) {
				logger.error(`Connection (${this.currentConfig.host}) timed out.`);
				this.connection.end();
				this.status = SSH_STATUS.TIMEOUT;
			}
		}, this.timeoutSec * 1000);
	}

	clearTimeout() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}

	handleConnectionError() {
		if (!this.attemptingBackup) {
			this.attemptBackupConnection();
		}
	}

	attemptBackupConnection() {
		this.attemptingBackup = true;
		this.attemptConnection(SSH_CONNECTION_NAMES.BACKUP);
	}

	// This function is designed to execute a command over an SSH connection
	// and accumulate all the output data until the command completes.
	// It is particularly useful for handling very large files or commands
	// that produce substantial amounts of data.
	executeAndAccumulateOutput(command, onData, onEnd, onError) {
		if (this.status !== SSH_STATUS.READY) {
			onError(new Error('SSH connection is not ready'));
			return;
		}

		this.connection.exec(command, (err, stream) => {
			if (err) {
				onError(err);
				return;
			}

			let outputData = '';
			let stderrData = '';

			stream.on('data', (chunk) => {
				outputData += chunk.toString();
			});

			stream.stderr.on('data', (chunk) => {
				stderrData += chunk.toString();
			});

			stream.on('close', (code) => {
				if (code !== 0 && code !== null) {
					const errorMessage = `Process exited with code ${code}: ${stderrData}`;
					onError(errorMessage);
				} else {
					onData(outputData);
					onEnd();
				}
			});
		});
	}

	// This function executes a command via an SSH connection and handles output in real-time,
	// making it suitable for tasks requiring immediate processing of smaller amounts of data.
	exec(command, onData, onEnd, onError) {
		if (this.status !== SSH_STATUS.READY) {
			onError(new Error('SSH connection is not ready'));
			return;
		}

		this.connection.exec(command, (err, stream) => {
			if (err) {
				onError(err);
				return;
			}

			let stderrData = '';

			stream.on('data', (data) => {
				onData(data.toString());
			});

			stream.stderr.on('data', (data) => {
				stderrData += data.toString();
			});

			stream.on('close', (code) => {
				if (code !== 0 && code !== null) {
					const errorMessage = `Process exited with code ${code}` + (stderrData ? `: ${stderrData}` : '');
					onError(errorMessage);
				} else {
					onEnd();
				}
			});
		});
	}
}

module.exports = SSHConnection;
