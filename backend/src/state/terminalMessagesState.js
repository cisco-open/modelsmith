const MESSAGE_TYPES = require('../constants/messageTypes');

let messageHistory = [];

const MAX_HISTORY_MESSAGES = 50;

module.exports = {
	getMessagesHistory: () => messageHistory,
	addToMessageHistory: (messageObject) => {
		if (typeof messageObject === 'string') {
			messageObject = { data: messageObject, type: MESSAGE_TYPES.INFO };
		}
		messageHistory.push(messageObject);

		if (messageHistory.length > MAX_HISTORY_MESSAGES) {
			messageHistory.shift();
		}
	},
	clearMessageHistory: () => {
		messageHistory = [];
	}
};
