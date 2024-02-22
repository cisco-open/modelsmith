const WebSocket = require('ws');
const { getScriptState } = require('../state/scriptState');
const { addToMessageHistory } = require('../state/terminalMessagesState');

// Constants
const MessageTopics = {
	TERMINAL: 'terminal',
	SCRIPT_STATUS: 'script_status',
	STATISTICS: 'statistics',
	CHARTS_PREFIX: 'chart_'
};

const ChartsEventsTopics = {
	UPDATE_TESTING: 'updateTesting',
	UPDATE_LATEST_VALUE: 'updateLatestValue'
};

// WebSocket setup
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log('received:', message);
	});
});

function broadcast(data) {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}

function broadcastTerminal(data) {
	addToMessageHistory(data);
	broadcast(JSON.stringify({ topic: MessageTopics.TERMINAL, data }));
}

function broadcastStatus() {
	broadcast(JSON.stringify({ topic: MessageTopics.SCRIPT_STATUS, data: getScriptState() }));
}

function broadcastChart(topic, latestValue) {
	broadcast(JSON.stringify({ topic, data: latestValue }));
}

module.exports = {
	wss,
	broadcastTerminal,
	broadcastStatus,
	broadcastChart,
	MessageTopics,
	ChartsEventsTopics
};
