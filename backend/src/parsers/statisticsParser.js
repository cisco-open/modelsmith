const { broadcastChart, MessageTopics } = require('../services/websocketService');

class StatisticsParser {
	static statisticsRegex = /Statistics:\s+(\S+):\s+(\d+\.\d+|\d+)/;

	constructor() {
		this.statistics = {};
	}

	processStatistics(line) {
		const match = line.match(StatisticsParser.statisticsRegex);
		if (match) {
			const key = match[1];
			const value = parseFloat(match[2]);
			this.statistics[key] = value;

			broadcastChart(`${MessageTopics.STATISTICS}`, {
				statistics: this.getStatistics()
			});
		}
	}

	getStatistics() {
		return this.statistics;
	}

	resetStatistics() {
		this.statistics = {};
	}
}

const statisticsParserInstance = new StatisticsParser();

module.exports = statisticsParserInstance;
