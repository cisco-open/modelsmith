const { MachineUnlearningParser } = require('./machineUnlearningParser');

class StatelessMachineUnlearningParser {
	static async parseMessages(messages) {
		const machineUnlearningParser = new MachineUnlearningParser(false);

		for (const message of messages) {
			await machineUnlearningParser.processLine(message);
		}

		const parsedData = {
			epochs: machineUnlearningParser.epochs,
			tests: machineUnlearningParser.tests
		};

		machineUnlearningParser.reset();
		return parsedData;
	}
}

module.exports = StatelessMachineUnlearningParser;
