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

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const noCache = require('./middlewares/noCache');
const websocketService = require('./services/websocketService');
const allRoutes = require('./router/allRoutes');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());
app.use(noCache);

app.use('/rest', allRoutes);

const server = app.listen(process.env.PORT, () => {
	logger.info(`Server is running on port ${process.env.PORT}`);
});

server.on('upgrade', (request, socket, head) => {
	websocketService.wss.handleUpgrade(request, socket, head, (ws) => {
		websocketService.wss.emit('connection', ws, request);
	});
});
