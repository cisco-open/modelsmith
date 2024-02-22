/**
 * PruningTrainingState is a class designed to manage and process the state of a pruning
 * training session. It handles parsing and processing of various types of data lines,
 * such as pruning states, epochs, and step information. The class uses an asynchronous
 * queue to ensure that each line is processed sequentially, maintaining the integrity
 * of the training state throughout the pruning process.
 *
 * The class maintains several regex patterns to identify different types of data in the
 * incoming lines and updates the internal state accordingly. This includes updating
 * pruning states, epochs, step details, and remaining weights. The processed data is
 * also broadcasted for real-time chart updates using a WebSocket service.
 *
 * Methods:
 * - parseLine: Adds a line to the processing queue.
 * - processLine: Handles the line processing in a Promise-based approach.
 * - checkForTestingPhase, processPruningState, processRemainingWeight, processEpoch,
 *   processStep: Specific methods to process different parts of the data line.
 * - updatePruningState, updateEpoch, updateStep: Methods to update internal states.
 *
 * Usage:
 * Instantiate the class and use the `parseLine` method to add lines for processing.
 * The class handles the sequential processing and state updates internally.
 */

const async = require('async');
const { broadcastChart, MessageTopics, ChartsEventsTopics } = require('../services/websocketService');

class PruningParser {
	static pruningStateRegex = /pruning state (\d+)/;
	static testingPhaseStartRegex = /Testing Phase Started/;
	static testingPhaseEndRegex = /Testing Phase Ended/;
	static epochRegex = /Epoch: (\d+)/;
	static stepRegex = /\[.*\] (\d+)\/(\d+) \| Loss: ([\d.]+) \| Acc: ([\d.]+)%/;
	static remainWeightRegex = /\* remain weight =\s*([\d.]+) %/;

	static queue = async.queue((task, callback = () => {}) => {
		pruningParserInstance
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
		this.pruningPhases = [];
		this.pruningPhasesMap = new Map();
		this.currentPruningState = null;
		this.currentEpoch = null;
		this.inTestingPhase = false;
	}

	parseLine(line) {
		PruningParser.queue.push({ line: line });
	}

	processLine(line) {
		return new Promise((resolve) => {
			this.checkForTestingPhase(line);
			this.processRemainingWeight(line);
			this.processPruningState(line);
			this.processEpoch(line);
			this.processStep(line);

			resolve();
		});
	}

	checkForTestingPhase(line) {
		if (PruningParser.testingPhaseStartRegex.test(line)) {
			this.inTestingPhase = true;
		} else if (PruningParser.testingPhaseEndRegex.test(line)) {
			this.inTestingPhase = false;
		}
	}

	processPruningState(line) {
		const match = line.match(PruningParser.pruningStateRegex);
		if (match) {
			this.updatePruningState(parseInt(match[1]));
		}
	}

	processRemainingWeight(line) {
		const match = line.match(PruningParser.remainWeightRegex);
		if (match && this.currentPruningState) {
			const remainingWeight = parseFloat(match[1]);
			this.currentPruningState.remainingWeight = remainingWeight;

			broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_LATEST_VALUE}`, {
				datasetIndex: 0,
				sparsity: remainingWeight
			});
		}
	}

	processEpoch(line) {
		const match = line.match(PruningParser.epochRegex);
		if (match) {
			if (!this.currentPruningState) {
				const defaultState = 0;
				this.updatePruningState(defaultState);
			}
			this.updateEpoch(parseInt(match[1]));
		}
	}

	processStep(line) {
		const match = line.match(PruningParser.stepRegex);
		if (match && this.currentPruningState && this.currentEpoch) {
			this.updateStep(match, this.inTestingPhase);
		}
	}

	updatePruningState(state) {
		if (this.pruningPhasesMap.has(state)) {
			this.currentPruningState = this.pruningPhasesMap.get(state);
		} else {
			const newState = { pruningState: state, epochs: [], remainingWeight: null };
			this.pruningPhases.push(newState);
			this.pruningPhasesMap.set(state, newState);
			this.currentPruningState = newState;
		}
		this.currentEpoch = null;
	}

	updateEpoch(epoch) {
		let epochFound = this.currentPruningState.epochs.find((e) => e.number === epoch);
		if (!epochFound) {
			epochFound = { number: epoch, steps: [], totalSteps: null, testing: [] };
			this.currentPruningState.epochs.push(epochFound);
		}
		this.currentEpoch = epochFound;
	}

	updateStep(stepMatch, inTestingPhase) {
		const [_, currentStep, totalSteps, loss, accuracy] = stepMatch.map(Number);

		if (this.currentEpoch.totalSteps === null) {
			this.currentEpoch.totalSteps = totalSteps;
		}

		if (!inTestingPhase) {
			this.currentEpoch.steps.push({ step: currentStep, loss, accuracy });
		} else {
			this.currentEpoch.testing.push({ step: currentStep, loss, accuracy });
		}

		broadcastChart(
			`${MessageTopics.CHARTS_PREFIX}${
				inTestingPhase ? ChartsEventsTopics.UPDATE_TESTING : ChartsEventsTopics.UPDATE_LATEST_VALUE
			}`,
			{
				datasetIndex: this.currentPruningState.pruningState,
				accuracy,
				loss
			}
		);
	}
}

const pruningParserInstance = new PruningParser();

module.exports = pruningParserInstance;
