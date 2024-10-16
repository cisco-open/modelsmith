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

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const noCache = require('./middlewares/noCache');
const websocketService = require('./websockets/websocketService');
const allRoutes = require('./router/allRoutes');
const logger = require('./utils/logger');
const SSHConnectionSingleton = require('./ssh/sshConnectionInstance');
const TerminalWebSocketService = require('./websockets/terminalWebsocketService');
const CONNECTION_TYPE = require('./constants/connectionTypeConstants');

app.use(cors());
app.use(express.json());
app.use(noCache);

app.use('/rest', allRoutes);

const server = app.listen(process.env.PORT, () => {
	logger.info(`Backend server is running on port ${process.env.PORT}`);
	initializeSSHConnection();
});

server.on('upgrade', async (request, socket, head) => {
	const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

	if (pathname === '/terminal') {
		const terminalService = await TerminalWebSocketService.getInstance();
		terminalService.wss.handleUpgrade(request, socket, head, (ws) => {
			terminalService.wss.emit('connection', ws, request);
		});
	} else if (pathname === '/ws') {
		websocketService.wss.handleUpgrade(request, socket, head, (ws) => {
			websocketService.wss.emit('connection', ws, request);
		});
	}
});

async function initializeSSHConnection() {
	if (process.env.CONNECTION_TYPE !== CONNECTION_TYPE.LOCAL) {
		try {
			await SSHConnectionSingleton.init();
			const sshConnection = await SSHConnectionSingleton.getInstance();
			logger.info(`SSH Connection initialized with status: ${sshConnection.status}`);
		} catch (error) {
			logger.error(`Failed to initialize SSH Connection: ${error.message}`);
		}
	}
}
