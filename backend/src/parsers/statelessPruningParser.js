const { PruningParser } = require('./pruningParser');

class StatelessPruningParser {
	static parseMessages(messages) {
		const pruningParser = new PruningParser(false);
		const parsedData = [];

		messages.forEach((message) => {
			pruningParser.processLine(message);
		});

		pruningParser.pruningPhases.forEach((phase) => {
			parsedData.push(PruningParser.formatPruningPhase(phase));
		});

		pruningParser.reset();
		return parsedData;
	}
}

module.exports = StatelessPruningParser;
