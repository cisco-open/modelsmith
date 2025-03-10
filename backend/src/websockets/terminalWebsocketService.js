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

const WebSocket = require('ws');
const os = require('os');
const pty = require('node-pty');
const CONNECTION_TYPE = require('../constants/connectionTypeConstants');
const SSHConnectionSingleton = require('../ssh/sshConnectionInstance');
const logger = require('../utils/logger');
const terminalMessagesState = require('../state/terminalMessagesState');

class TerminalWebSocketService {
	static instance = null;

	constructor() {
		this.wss = new WebSocket.Server({ noServer: true, perMessageDeflate: false });
		this.shell = null;
		this.clients = new Set();
		this.outputBuffer = '';
	}

	static async getInstance() {
		if (!TerminalWebSocketService.instance) {
			TerminalWebSocketService.instance = new TerminalWebSocketService();
			await TerminalWebSocketService.instance.init();
		}
		return TerminalWebSocketService.instance;
	}

	async init() {
		this.setupWebSocketServer();
	}

	setupWebSocketServer() {
		this.wss.on('connection', (ws) => {
			const connectionHandler =
				process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL
					? this.handleLocalConnection.bind(this)
					: this.handleVMConnection.bind(this);

			connectionHandler(ws).catch((error) => {
				logger.error(`Error handling ${process.env.CONNECTION_TYPE} connection:`, error);
				ws.close();
			});
		});
	}

	async handleLocalConnection(ws) {
		if (!this.shell) {
			const shellPath = os.platform() === 'win32' ? 'cmd.exe' : process.env.SHELL || '/bin/bash';
			this.shell = pty.spawn(shellPath, [], {
				name: 'xterm-color',
				cols: 80,
				rows: 24,
				cwd: os.homedir(),
				env: process.env
			});

			this.shell.on('data', this.handleShellData.bind(this));
			this.shell.on('exit', this.handleShellExit.bind(this));
		}

		this.attachClientToShell(ws);
	}

	async handleVMConnection(ws) {
		if (!this.shell) {
			try {
				const sshConnection = await SSHConnectionSingleton.getInstance();
				this.shell = await this.createShellSession(sshConnection);
			} catch (error) {
				logger.error(`Error creating shell session: ${error.message}`);
				ws.close();
				return;
			}
		}

		this.attachClientToShell(ws);
	}

	createShellSession(sshConnection) {
		return new Promise((resolve, reject) => {
			sshConnection.shell((err, stream) => {
				if (err) {
					reject(err);
					return;
				}

				stream.on('data', (data) => {
					const output = data.toString();
					this.handleShellData(output);
				});

				stream.on('close', () => {
					logger.info('SSH shell session closed.');
					this.handleShellExit();
				});

				stream.on('error', (error) => {
					logger.error('Shell stream error:', error.message);
				});

				resolve(stream);
			});
		});
	}

	attachClientToShell(ws) {
		this.clients.add(ws);

		ws.on('message', (msg) => {
			const input = msg.toString('utf8');

			if (input === 'CLIENT_READY') {
				const messageHistory = terminalMessagesState.getMessagesHistory();
				ws.send(messageHistory);
				return;
			}
			this.processInputCommand(input);

			this.shell?.write(msg);
		});

		ws.on('close', () => this.clients.delete(ws));
	}

	processInputCommand(input) {
		if (!this.currentCommandInput) {
			this.currentCommandInput = '';
		}

		this.currentCommandInput += input;

		if (input.includes('\n') || input.includes('\r')) {
			const command = this.currentCommandInput.trim();
			this.currentCommandInput = '';

			if (command === 'clear') {
				terminalMessagesState.clearMessageHistory();

				// ANSI control sequence
				// \x1b[H — Move the Cursor to the Home Position
				// \x1b[3J — Clear the Scrollback Buffer
				const clearSequence = '\x1b[H\x1b[3J';

				this.clients.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(clearSequence);
					}
				});

				return;
			}
		}
	}

	handleShellData(data) {
		const output = data.toString('utf8');

		terminalMessagesState.addToMessageHistory(output);

		this.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(output);
			}
		});
	}

	handleShellExit() {
		logger.info(`${process.env.CONNECTION_TYPE} shell exited`);
		this.shell = null;
		this.outputBuffer = '';
	}

	sendCommand(command) {
		const cmd = command.endsWith('\n') ? command : `${command}\n`;
		this.shell?.write(cmd);
	}

	getShell() {
		return this.shell;
	}
}

module.exports = TerminalWebSocketService;
