//   Copyright 2024 Cisco Systems, Inc. and its affiliates

//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at

//       http://www.apache.org/licenses/LICENSE-2.0

//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

//  SPDX-License-Identifier: Apache-2.0

const async = require('async');
const { broadcastChart, MessageTopics, ChartsEventsTopics } = require('../websockets/websocketService');

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

	constructor(isChartBroadcasted = true) {
		this.isChartBroadcasted = isChartBroadcasted;
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

			if (currentStep === 1 && this.isChartBroadcasted) {
				const reconstructionIndex = this.reconstructions.indexOf(this.currentReconstruction);
				broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.ENHANCE_SINGLE_PHASE_X_AXIS}`, {
					reconstructionIndex
				});
			}

			const stepInfo = { step: currentStep, loss };
			this.currentReconstruction.steps.push(stepInfo);

			if (this.isChartBroadcasted) {
				const datasetIndex = this.reconstructions.indexOf(this.currentReconstruction);
				broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_LATEST_VALUE}`, {
					datasetIndex,
					loss
				});
			}
		} else {
			this.testing.totalSteps = totalSteps;
			const testingStepInfo = { step: currentStep, loss, accuracy };
			this.testing.steps.push(testingStepInfo);

			if (this.isChartBroadcasted) {
				broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_TESTING}`, {
					datasetIndex: 0, // datasetIndex is 0 as we don't have multiple testing datasets
					accuracy,
					loss
				});
			}
		}
	}

	processAccuracy(line) {
		const match = line.match(QuantizationParser.accuracyRegex);
		if (match && this.currentReconstruction) {
			const accuracy = parseFloat(match[1]);
			this.currentReconstruction.accuracy = accuracy;

			if (this.isChartBroadcasted) {
				broadcastChart(`${MessageTopics.CHARTS_PREFIX}${ChartsEventsTopics.UPDATE_LATEST_VALUE}`, {
					datasetIndex: 0, // datasetIndex is 0 as we don't have multiple testing datasets
					accuracy
				});
			}
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

module.exports = {
	QuantizationParser,
	quantizationParserInstance
};
