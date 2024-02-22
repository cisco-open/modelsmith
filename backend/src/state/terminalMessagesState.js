let messageHistory = [];

const MAX_HISTORY_MESSAGES = 50;

module.exports = {
	getMessagesHistory: () => messageHistory,
	addToMessageHistory: (message) => {
		messageHistory.push(message);
		if (messageHistory.length > MAX_HISTORY_MESSAGES) {
			messageHistory.shift();
		}
	},
	clearMessageHistory: () => {
		messageHistory = [];
	}
};
