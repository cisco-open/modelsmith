const async = require('async');
const { broadcastChart, MessageTopics, ChartsEventsTopics } = require('../services/websocketService');
const satisticsParserInstance = require('./statisticsParser.js');

class MachineUnlearningParser {
	static testingPhaseStartRegex = /Testing Phase Started/;
	static testingPhaseEndRegex = /Testing Phase Ended/;
	static epochOrTestRegex = /(?:Epoch: (\d+)|Test: (\d+))/;
	static stepRegex = /\[.*\] (\d+)\/(\d+) \| Loss: ([\d.]+) \| Acc: ([\d.]+)%/;

	static queue = async.queue((task, callback = () => {}) => {
		machineUnlearningParserInstance
			.processLine(task.line)
			.then(() => callback())
			.catch((error) => {
				console.error('Error processing line:', error);
				callback();
			});
	}, 1);

	constructor() {
		this.reset();
	}

	reset() {
		this.epochs = [];
		this.tests = [];
		this.currentEpoch = null;
		this.inTestingPhase = false;
		this.currentTest = null;
		satisticsParserInstance.resetStatistics();
	}

	parseLine(line) {
		MachineUnlearningParser.queue.push({ line: line });
	}

	processLine(line) {
		return new Promise((resolve) => {
			this.checkForTestingPhase(line);
			this.processEpochOrTest(line);
			this.processStep(line);
			satisticsParserInstance.processStatistics(line);

			resolve();
		});
	}

	checkForTestingPhase(line) {
		if (MachineUnlearningParser.testingPhaseStartRegex.test(line)) {
			this.inTestingPhase = true;
		} else if (MachineUnlearningParser.testingPhaseEndRegex.test(line)) {
			this.inTestingPhase = false;
			this.currentTest = null;
		}
	}

	processEpochOrTest(line) {
		const match = line.match(MachineUnlearningParser.epochOrTestRegex);
		if (match) {
			if (match[1]) {
				this.currentEpoch = { totalSteps: null, steps: [] };
				this.epochs.push(this.currentEpoch);
			} else if (match[2]) {
				this.currentTest = { totalSteps: null, steps: [] };
				this.tests.push(this.currentTest);
			}
		}
	}

	processStep(line) {
		const match = line.match(MachineUnlearningParser.stepRegex);
		if (match) {
			const totalSteps = parseInt(match[2]);
			const stepData = {
				step: parseInt(match[1]),
				loss: parseFloat(match[3]),
				accuracy: parseFloat(match[4])
			};

			if (this.inTestingPhase && this.currentTest && this.currentTest.totalSteps === null) {
				this.currentTest.totalSteps = totalSteps;
			} else if (this.currentEpoch && this.currentEpoch.totalSteps === null) {
				this.currentEpoch.totalSteps = totalSteps;
			}

			if (this.inTestingPhase && this.currentTest) {
				this.currentTest.steps.push(stepData);
			} else if (this.currentEpoch) {
				this.currentEpoch.steps.push(stepData);
			}

			broadcastChart(
				`${MessageTopics.CHARTS_PREFIX}${
					this.inTestingPhase ? ChartsEventsTopics.UPDATE_TESTING : ChartsEventsTopics.UPDATE_LATEST_VALUE
				}`,
				{
					datasetIndex: this.inTestingPhase ? this.tests.length - 1 : this.epochs.length - 1,
					accuracy: stepData.accuracy,
					loss: stepData.loss
				}
			);
		}
	}
}

const machineUnlearningParserInstance = new MachineUnlearningParser();

module.exports = machineUnlearningParserInstance;
