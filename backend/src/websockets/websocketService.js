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
const { getScriptState } = require('../state/scriptState');

const MessageTopics = {
	SCRIPT_STATUS: 'script_status',
	STATISTICS: 'statistics',
	CHARTS_PREFIX: 'chart_'
};

const ChartsEventsTopics = {
	UPDATE_TESTING: 'updateTesting',
	UPDATE_LATEST_VALUE: 'updateLatestValue',
	ENHANCE_SINGLE_PHASE_X_AXIS: 'enhanceSinglePhaseXAxis'
};

const wss = new WebSocket.Server({ noServer: true });

function broadcast(data) {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}

function broadcastStatus() {
	broadcast(JSON.stringify({ topic: MessageTopics.SCRIPT_STATUS, data: getScriptState() }));
}

function broadcastChart(topic, latestValue) {
	broadcast(JSON.stringify({ topic, data: latestValue }));
}

module.exports = {
	wss,
	broadcastStatus,
	broadcastChart,
	MessageTopics,
	ChartsEventsTopics
};
