const async = require('async');
const { broadcastChart, MessageTopics, ChartsEventsTopics } = require('../services/websocketService');

class QuantizationParser {
	static reconstructionRegex = /Reconstruction for (layer|block) (\w+)/;
	static stepRegex = /\[\S*\] (\d+)\/(\d+) \| Loss: ([\d.]+)/;
	static testingStepRegex = /\[.*\] (\d+)\/(\d+) \| Loss: ([\d.]+) \| Acc: ([\d.]+)%/;
	static accuracyRegex = /Accuracy: ([\d.]+)%/;
	static testingPhaseStartRegex = /Testing Phase Started/;
	static testingPhaseEndRegex = /Testing Phase Ended/;

	static queue = async.queue((task, callback = () => {}) => {
		quantizationParserInstance
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
		this.reconstructions = [];
		this.currentReconstruction = null;
		this.currentStep = null;
		this.testing = { totalSteps: 0, steps: [] };
		this.inTestingPhase = false;
	}

	parseLine(line) {
		QuantizationParser.queue.push({ line: line });
	}

	processLine(line) {
		return new Promise((resolve) => {
			this.processAccuracy(line);
			this.processReconstruction(line);
			this.processStep(line);
			this.checkForTestingPhase(line);

			resolve();
		});
	}

	processReconstruction(line) {
		const match = line.match(QuantizationParser.reconstructionRegex);
		if (match) {
			this.currentReconstruction = { type: match[1], name: match[2], steps: [], totalSteps: 0, accuracy: null };
			this.reconstructions.push(this.currentReconstruction);
		}
	}

	processStep(line) {
		let match = this.inTestingPhase
			? line.match(QuantizationParser.testingStepRegex)
			: line.match(QuantizationParser.stepRegex);
		if (match) {
			const stepData = match.slice(1).map(Number);
			this.updateStep(stepData, this.inTestingPhase);
		}
	}

	updateStep(stepData, inTestingPhase) {
		const [currentStep, totalSteps, loss, accuracy] = stepData;

		if (!inTestingPhase) {
			this.currentReconstruction.totalSteps = totalSteps;

			const stepInfo = { step: currentStep, loss };
			this.currentReconstruction.steps.push(stepInfo);

			const datasetIndex = this.reconstructions.indexOf(this.currentReconstruction);
			broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_LATEST_VALUE}`, {
				datasetIndex,
				loss
			});
		} else {
			this.testing.totalSteps = totalSteps;
			const testingStepInfo = { step: currentStep, loss, accuracy };
			this.testing.steps.push(testingStepInfo);

			broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_TESTING}`, {
				datasetIndex: 0, // datasetIndex is 0 as we don't have multiple testing datasets
				accuracy,
				loss
			});
		}
	}

	processAccuracy(line) {
		const match = line.match(QuantizationParser.accuracyRegex);
		if (match && this.currentReconstruction) {
			const accuracy = parseFloat(match[1]);
			this.currentReconstruction.accuracy = accuracy;

			broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_LATEST_VALUE}`, {
				datasetIndex: 0, // datasetIndex is 0 as we don't have multiple testing datasets
				accuracy
			});
		}
	}

	checkForTestingPhase(line) {
		if (QuantizationParser.testingPhaseStartRegex.test(line)) {
			this.inTestingPhase = true;
		} else if (QuantizationParser.testingPhaseEndRegex.test(line)) {
			this.inTestingPhase = false;
		}
	}
}

const quantizationParserInstance = new QuantizationParser();

module.exports = quantizationParserInstance;
