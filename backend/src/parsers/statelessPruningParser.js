const { PruningParser } = require('./pruningParser');

class StatelessPruningParser {
	static async parseMessages(messages) {
		const pruningParser = new PruningParser(false);

		for (const message of messages) {
			await pruningParser.processLine(message);
		}

		const parsedData = pruningParser.pruningPhases;

		pruningParser.reset();
		return parsedData;
	}
}

module.exports = StatelessPruningParser;
