const TerminalWebSocketService = require('./terminalWebsocketService');

/**
 * Factory function to get the singleton instance of TerminalWebSocketService.
 * @returns {Promise<TerminalWebSocketService>} The singleton instance.
 */
async function getTerminalServiceInstance() {
	try {
		const instance = await TerminalWebSocketService.getInstance();
		return instance;
	} catch (error) {
		console.error('Error obtaining TerminalWebSocketService instance:', error);
		throw error;
	}
}

module.exports = getTerminalServiceInstance;
