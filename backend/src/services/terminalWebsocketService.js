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

// terminalWebSocketService.js

const WebSocket = require('ws');
const os = require('os');
const url = require('url');
const pty = require('node-pty');
const SSHConnection = require('../utils/sshConnection');
const CONNECTION_TYPE = require('../constants/connectionTypeConstants');
const { SSH_CONNECTION_NAMES } = require('../constants/sshConstants');

const terminalWss = new WebSocket.Server({ noServer: true });

let sshConnection = null;
let sshConnectionReady = false;

terminalWss.on('connection', (ws) => {
	if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.LOCAL) {
		handleLocalConnection(ws);
	} else if (process.env.CONNECTION_TYPE === CONNECTION_TYPE.VM) {
		handleVMConnection(ws);
	} else {
		ws.close();
		console.error('Unsupported CONNECTION_TYPE:', process.env.CONNECTION_TYPE);
	}
});

function handleLocalConnection(ws) {
	const isWindows = os.platform() === 'win32';
	const shellPath = isWindows ? 'cmd.exe' : process.env.SHELL || '/bin/bash';

	const shell = pty.spawn(shellPath, [], {
		name: 'xterm-color',
		cols: 80,
		rows: 24,
		cwd: os.homedir(),
		env: process.env
	});

	shell.on('data', (data) => {
		if (ws.readyState === WebSocket.OPEN) {
			ws.send(data);
		}
	});

	ws.on('message', (msg) => {
		shell.write(msg);
	});

	ws.on('close', () => {
		shell.kill();
	});
}

function handleVMConnection(ws) {
	if (!sshConnection) {
		sshConnection = new SSHConnection(SSH_CONNECTION_NAMES.PRIMARY);

		sshConnection.on('ready', () => {
			sshConnectionReady = true;
			createShellSession(ws);
		});

		sshConnection.on('error', (err) => {
			console.error('SSH connection error:', err);
			ws.close();
		});
	} else if (sshConnectionReady) {
		createShellSession(ws);
	} else {
		sshConnection.once('ready', () => {
			sshConnectionReady = true;
			createShellSession(ws);
		});
	}
}

function createShellSession(ws) {
	sshConnection.shell((err, stream) => {
		if (err) {
			console.error('SSH shell error:', err);
			ws.close();
			return;
		}

		stream.on('data', (data) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(data.toString('utf8'));
			}
		});

		ws.on('message', (msg) => {
			stream.write(msg);
		});

		ws.on('close', () => {
			stream.end();
		});
	});
}

module.exports = {
	terminalWss
};
