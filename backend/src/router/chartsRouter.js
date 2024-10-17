//   Copyright 2024 Cisco Systems, Inc.

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

const express = require('express');
const router = express.Router();
const { pruningParserInstance } = require('../parsers/pruningParser');
const { quantizationParserInstance } = require('../parsers/quantizationParser');
const { machineUnlearningParserInstance } = require('../parsers/machineUnlearningParser');
const { OK, NOT_FOUND } = require('../constants/httpStatusCodes');
const { getActiveScriptDetails, getPreviousScriptDetails } = require('../state/scriptState');
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');

router.get('/chart-configuration-settings', (req, res) => {
	let chartTypes = req.query.type.split(',');
	let currentScript = getActiveScriptDetails() || getPreviousScriptDetails();

	if (!currentScript) {
		return res.status(NOT_FOUND).send();
	}

	let chartConfigurationSettings = {};

	chartTypes.forEach((chartType) => {
		chartConfigurationSettings[chartType] = {
			alg: currentScript.algKey
		};

		switch (currentScript.algorithm.type) {
			case ALGORITHM_TYPES.PRUNING:
				const pruningTimes = currentScript.params.pruning_times || 1;

				chartConfigurationSettings[chartType] = {
					...chartConfigurationSettings[chartType],
					pruningTimes: Number(pruningTimes),
					epochs: currentScript.params.epochs
				};
				break;

			case ALGORITHM_TYPES.MACHINE_UNLEARNING:
				chartConfigurationSettings[chartType] = {
					epochs: currentScript.params.unlearn_epochs
				};
				break;

			case ALGORITHM_TYPES.QUANTIZATION:
				chartConfigurationSettings[chartType] = {
					reconstructions: quantizationParserInstance?.reconstructions?.length || 1
				};
				break;

			default:
				break;
		}
	});

	res.status(OK).send(chartConfigurationSettings);
});

router.get('/current-pruning-chart-data', (req, res) => {
	const { pruningPhases = [] } = pruningParserInstance;

	if (pruningPhases.length === 0) {
		return res.status(OK).send({});
	}

	const formattedDataArray = pruningPhases.map((pruningPhase) => {
		const datasetIndex = pruningPhase.pruningState;
		const epochs = pruningPhase.epochs || [];
		const totalSteps = epochs[0]?.totalSteps || 0;

		const steps = epochs.flatMap((epoch) => epoch.steps);
		const testing = epochs.flatMap((epoch) => epoch.testing);
		const sparsity = pruningPhase.remainingWeight;

		return {
			datasetIndex,
			steps,
			testing,
			sparsity,
			totalSteps
		};
	});

	res.status(OK).send(formattedDataArray);
});

router.get('/current-quantization-chart-data', (req, res) => {
	const { reconstructions = [], testing = {} } = quantizationParserInstance;
	res.status(OK).send({ reconstructions, testing });
});

router.get('/current-machine-unlearning-chart-data', (req, res) => {
	const { epochs = [], tests = [] } = machineUnlearningParserInstance;
	res.status(OK).send({ epochs, tests });
});

module.exports = router;
