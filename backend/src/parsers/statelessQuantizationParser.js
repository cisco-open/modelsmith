const { QuantizationParser } = require('./quantizationParser');

class StatelessQuantizationParser {
	static async parseMessages(messages) {
		const quantizationParser = new QuantizationParser(false);

		for (const message of messages) {
			await quantizationParser.processLine(message);
		}

		const parsedData = {
			reconstructions: quantizationParser.reconstructions,
			testing: quantizationParser.testing
		};

		quantizationParser.reset();
		return parsedData;
	}
}

module.exports = StatelessQuantizationParser;
