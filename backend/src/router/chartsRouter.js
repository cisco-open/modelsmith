const express = require('express');
const router = express.Router();
const pruningParserInstance = require('../parsers/pruningParser');
const quantizationParserInstance = require('../parsers/quantizationParser');
const machineUnlearningParserInstance = require('../parsers/machineUnlearningParser');
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

		if (currentScript.algorithm.type === ALGORITHM_TYPES.PRUNING) {
			const pruningTimes = currentScript.params.pruning_times || 1;

			chartConfigurationSettings[chartType] = {
				...chartConfigurationSettings[chartType],
				pruningTimes: Number(pruningTimes),
				epochs: currentScript.params.epochs
			};
		} else if (currentScript.algorithm.type === ALGORITHM_TYPES.MACHINE_UNLEARNING) {
			chartConfigurationSettings[chartType] = {
				epochs: currentScript.params.unlearn_epochs
			};
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
