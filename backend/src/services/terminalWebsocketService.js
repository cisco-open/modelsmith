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
				console.error(`Error handling ${process.env.CONNECTION_TYPE} connection:`, error);
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
			const sshConnection = await this.getSSHConnection();
			this.shell = await this.createShellSession(sshConnection);
		}

		this.attachClientToShell(ws);
	}

	async getSSHConnection() {
		if (!this.sshConnection || !this.sshConnection.isConnected()) {
			this.sshConnection = new SSHConnection(SSH_CONNECTION_NAMES.PRIMARY);
			await new Promise((resolve, reject) => {
				this.sshConnection.once('ready', resolve);
				this.sshConnection.once('error', reject);
			});
		}
		return this.sshConnection;
	}

	createShellSession(sshConnection) {
		return new Promise((resolve, reject) => {
			sshConnection.shell((err, stream) => {
				if (err) {
					reject(err);
					return;
				}

				stream.on('data', this.handleShellData.bind(this));
				stream.on('close', this.handleShellExit.bind(this));
				resolve(stream);
			});
		});
	}

	attachClientToShell(ws) {
		if (this.outputBuffer) {
			ws.send(this.outputBuffer);
		}

		this.clients.add(ws);

		ws.on('message', (msg) => this.shell?.write(msg));
		ws.on('close', () => this.clients.delete(ws));
	}

	handleShellData(data) {
		const output = data.toString('utf8');
		this.outputBuffer += output;
		this.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(output);
			}
		});
	}

	handleShellExit() {
		console.log(`${process.env.CONNECTION_TYPE} shell exited`);
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
