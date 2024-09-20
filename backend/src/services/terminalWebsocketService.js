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

const WebSocket = require('ws');
const os = require('os');
const pty = require('node-pty');
const SSHConnection = require('../utils/sshConnection');
const CONNECTION_TYPE = require('../constants/connectionTypeConstants');
const { SSH_CONNECTION_NAMES } = require('../constants/sshConstants');

class TerminalWebSocketService {
	constructor() {
		this.terminalWss = new WebSocket.Server({ noServer: true });

		this.sshConnection = null;
		this.sshConnectionPromise = null;
		this.shellStream = null;
		this.clients = [];

		this.setupWebSocketServer();
	}

	setupWebSocketServer() {
		this.terminalWss.on('connection', (ws) => {
			if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
				this.handleLocalConnection(ws);
			} else if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.VM) {
				this.handleVMConnection(ws);
			} else {
				ws.close();
				console.error('Unsupported CONNECTION_TYPE:', process.env.CONNECTION_TYPE);
			}
		});
	}

	handleLocalConnection(ws) {
		const isWindows = os.platform() === 'win32';
		const shellPath = isWindows ? 'cmd.exe' : process.env.SHELL || '/bin/bash';

		if (!this.localShell) {
			this.localShell = pty.spawn(shellPath, [], {
				name: 'xterm-color',
				cols: 80,
				rows: 24,
				cwd: os.homedir(),
				env: process.env
			});

			this.localShell.on('data', (data) => {
				this.clients.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(data);
					}
				});
			});

			this.localShell.on('exit', () => {
				console.log('Local shell exited');
				this.localShell = null;
			});
		}

		this.attachClientToLocalShell(ws);
	}

	attachClientToLocalShell(ws) {
		this.clients.push(ws);

		ws.on('message', (msg) => {
			if (this.localShell) {
				this.localShell.write(msg);
			}
		});

		ws.on('close', () => {
			this.clients = this.clients.filter((client) => client !== ws);
		});
	}

	async handleVMConnection(ws) {
		try {
			const sshConnection = await this.getSSHConnection();

			if (!this.shellStream) {
				await this.createShellSession(sshConnection);
			}

			this.attachClientToShellSession(ws);
		} catch (error) {
			console.error('Failed to establish SSH connection:', error);
			ws.close();
		}
	}

	getSSHConnection() {
		if (!this.sshConnectionPromise) {
			this.sshConnectionPromise = new Promise((resolve, reject) => {
				if (this.sshConnection && this.sshConnection.isConnected()) {
					resolve(this.sshConnection);
				} else {
					this.sshConnection = new SSHConnection(SSH_CONNECTION_NAMES.PRIMARY);

					this.sshConnection.on('ready', () => {
						resolve(this.sshConnection);
					});

					this.sshConnection.on('error', (err) => {
						console.error('SSH connection error:', err);
						this.sshConnection = null;
						this.sshConnectionPromise = null;
						reject(err);
					});

					this.sshConnection.on('close', () => {
						console.log('SSH connection closed');
						this.sshConnection = null;
						this.sshConnectionPromise = null;

						if (this.shellStream) {
							this.shellStream.end();
							this.shellStream = null;
						}
					});
				}
			});
		}

		return this.sshConnectionPromise;
	}

	createShellSession(sshConnection) {
		return new Promise((resolve, reject) => {
			sshConnection.shell((err, stream) => {
				if (err) {
					console.error('SSH shell error:', err);
					reject(err);
					return;
				}

				this.shellStream = stream;

				stream.on('data', (data) => {
					this.clients.forEach((client) => {
						if (client.readyState === WebSocket.OPEN) {
							client.send(data.toString('utf8'));
						}
					});
				});

				stream.on('close', () => {
					console.log('SSH shell session closed');
					this.shellStream = null;
				});

				resolve();
			});
		});
	}

	attachClientToShellSession(ws) {
		this.clients.push(ws);

		ws.on('message', (msg) => {
			if (this.shellStream) {
				this.shellStream.write(msg);
			}
		});

		ws.on('close', () => {
			this.clients = this.clients.filter((client) => client !== ws);
		});
	}
}

module.exports = new TerminalWebSocketService();
