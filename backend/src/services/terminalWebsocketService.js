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
	static instance = null;
	static initializing = null;

	constructor() {
		if (TerminalWebSocketService.instance) {
			return TerminalWebSocketService.instance;
		}

		TerminalWebSocketService.instance = this;

		this.terminalWss = new WebSocket.Server({ noServer: true, perMessageDeflate: false });

		this.sshConnection = null;
		this.sshConnectionPromise = null;
		this.shellStream = null;
		this.localShell = null;
		this.clients = [];
		this.outputBuffer = '';
	}

	async init() {
		console.log('Setting up terminal WebSocket server.');
		await this.setupWebSocketServer();
	}

	async setupWebSocketServer() {
		return new Promise((resolve, reject) => {
			try {
				this.terminalWss = new WebSocket.Server({ noServer: true, perMessageDeflate: false });

				this.terminalWss.on('connection', (ws) => {
					if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
						this.handleLocalConnection(ws);
					} else if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.VM) {
						(async () => {
							try {
								await this.handleVMConnection(ws);
							} catch (error) {
								console.error('Error in handleVMConnection:', error);
								ws.close();
							}
						})();
					} else {
						ws.close();
						console.error('Unsupported CONNECTION_TYPE:', process.env.CONNECTION_TYPE);
					}
				});
				resolve();
			} catch (error) {
				console.error('Failed to set up WebSocket server:', error);
				reject(error);
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
				this.handleShellData(data);
			});

			this.localShell.on('exit', () => {
				console.log('Local shell exited');
				this.localShell = null;
				this.outputBuffer = '';
			});
		}

		this.attachClientToShell(ws);
	}

	async handleVMConnection(ws) {
		try {
			const sshConnection = await this.getSSHConnection();

			if (!this.shellStream) {
				this.shellStream = await this.createShellSession(sshConnection);
			}

			this.attachClientToShell(ws);
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
							this.outputBuffer = '';
						}
					});
				}
			});
		}

		return this.sshConnectionPromise;
	}

	async createShellSession(sshConnection) {
		return new Promise((resolve, reject) => {
			sshConnection.shell((err, stream) => {
				if (err) {
					console.error('SSH shell error:', err);
					reject(err);
					return;
				}

				stream.on('data', (data) => {
					this.handleShellData(data);
				});

				stream.on('close', () => {
					console.log('SSH shell session closed');
					this.shellStream = null;
					this.outputBuffer = '';
				});

				resolve(stream);
			});
		});
	}

	attachClientToShell(ws) {
		if (this.outputBuffer) {
			ws.send(this.outputBuffer);
		}

		this.clients.push(ws);

		ws.on('message', (msg) => {
			if (this.shellStream) {
				this.shellStream.write(msg);
			} else if (this.localShell) {
				this.localShell.write(msg);
			}
		});

		ws.on('close', () => {
			this.clients = this.clients.filter((client) => client !== ws);
		});
	}

	handleShellData(data) {
		let output = data.toString('utf8');
		this.outputBuffer += output;

		this.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(output);
			}
		});
	}

	/**
	 * Asynchronous factory method to get the singleton instance.
	 * Ensures that only one instance is created and initialized.
	 * @returns {Promise<TerminalWebSocketService>} The singleton instance.
	 */
	static async getInstance() {
		if (this.instance) {
			return this.instance;
		}

		if (this.initializing) {
			await this.initializing;
			return this.instance;
		}

		this.initializing = (async () => {
			try {
				const service = new TerminalWebSocketService();
				await service.init();
			} catch (error) {
				console.error('Failed to initialize TerminalWebSocketService:', error);
				TerminalWebSocketService.instance = null;
				throw error;
			} finally {
				TerminalWebSocketService.initializing = null;
			}
		})();

		await this.initializing;
		return this.instance;
	}

	sendCommand(command) {
		const cmd = command.endsWith('\n') ? command : `${command}\n`;

		if (this.localShell) {
			this.localShell.write(cmd);
		} else if (this.shellStream) {
			this.shellStream.write(cmd);
		} else {
			console.error('No shell session available to send the command.');
			return;
		}
	}

	/**
	 * Retrieves the current shell instance based on the connection type.
	 * @returns {Object|null} The shell instance (`localShell` or `shellStream`) or `null` if none.
	 */
	getShell() {
		if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
			return this.localShell;
		} else if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.VM) {
			return this.shellStream;
		}
		return null;
	}
}

module.exports = TerminalWebSocketService;
