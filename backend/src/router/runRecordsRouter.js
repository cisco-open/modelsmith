const express = require('express');
const router = express.Router();
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');
const { executeCommand } = require('../facades/commandExecutionFacade');
const checkSshConnection = require('../middlewares/checkSshConnection');
const StatelessPruningParser = require('../parsers/statelessPruningParser');
const StatelessQuantizationParser = require('../parsers/statelessQuantizationParser');
const StatelessMachineUnlearningParser = require('../parsers/statelessMachineUnlearningParser');

const RUN_RECORDS_PATHS = {
	[ALGORITHM_TYPES.QUANTIZATION]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_quant/run_records`,
	[ALGORITHM_TYPES.PRUNING]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_pruning/run_records`,
	[ALGORITHM_TYPES.MACHINE_UNLEARNING]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_unlearning/run_records`
};

router.get('/run-records-filenames/:type', checkSshConnection, (req, res) => {
	const type = req.params.type;
	const directoryPath = RUN_RECORDS_PATHS[type];

	if (!directoryPath) {
		return res.status(400).send({ error: 'Invalid model type specified' });
	}

	const listFilesCommand = `ls ${directoryPath}/*.json`;

	executeCommand(
		listFilesCommand,
		(output) => {
			const files = output
				.split('\n')
				.filter((line) => line.trim() !== '')
				.map((filename) => {
					const baseName = filename.split('/').pop();
					return baseName.replace(/\.json$/, '');
				});

			res.status(200).send(files);
		},
		() => {},
		(error) => res.status(500).send({ error: `SSH error: ${error}` })
	);
});

router.get('/run-records-summarized-data/:type/:filename', checkSshConnection, (req, res) => {
	const type = req.params.type;
	const fileName = req.params.filename;
	const directoryPath = RUN_RECORDS_PATHS[type];

	if (!directoryPath) {
		return res.status(400).send({ error: 'Invalid model type specified' });
	}

	const filePath = `${directoryPath}/${fileName}.json`;
	const readFileCommand = `cat ${filePath}`;

	executeCommand(
		readFileCommand,
		async (output) => await parseAndRespond(output, type, res),
		() => {},
		(error) => {
			res.status(500).send({ error: `SSH error: ${error}` });
		},
		true
	);
});

async function parseAndRespond(output, type, res) {
	const jsonData = JSON.parse(output);

	switch (type) {
		case ALGORITHM_TYPES.PRUNING:
			jsonData.messages = await StatelessPruningParser.parseMessages(jsonData.messages);
			const summarizedDataPruning = summarizePruningData(jsonData);
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.status(200).send(summarizedDataPruning);
			break;

		case ALGORITHM_TYPES.QUANTIZATION:
			jsonData.messages = await StatelessQuantizationParser.parseMessages(jsonData.messages);
			const summarizedDataQuantization = summarizeQuantizationData(jsonData);

			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.status(200).send(summarizedDataQuantization);
			break;

		case ALGORITHM_TYPES.MACHINE_UNLEARNING:
			jsonData.messages = await StatelessMachineUnlearningParser.parseMessages(jsonData.messages);
			const summarizedMachineUnlearning = summarizeMachineUnlearningData(jsonData);

			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.status(200).send(summarizedMachineUnlearning);
			break;

		default:
			res.status(500).send({ error: 'Algorithm type not supported.' });
			break;
	}
}

function summarizeMachineUnlearningData(jsonData) {
	const testingData = jsonData.messages.tests;
	const lastTest = testingData[testingData.length - 1];
	const accuracyData = lastTest?.steps.map((test) => test.accuracy) || [];

	return {
		parameters: jsonData.parameters,
		statistics: jsonData.statistics,
		modelTrainingDetails: jsonData.model_training_details,
		lastRunTestingAccuracyData: accuracyData
	};
}

function summarizeQuantizationData(jsonData) {
	const testingData = jsonData.messages.testing;
	const accuracyData = testingData.steps.map((test) => test.accuracy) || [];

	return {
		parameters: jsonData.parameters,
		statistics: jsonData.statistics,
		modelTrainingDetails: jsonData.model_training_details,
		lastRunTestingAccuracyData: accuracyData
	};
}

function summarizePruningData(jsonData) {
	const lastMessage = jsonData.messages[jsonData.messages.length - 1];
	const lastEpoch = lastMessage?.epochs[lastMessage.epochs.length - 1];
	const accuracyData = lastEpoch?.testing.map((test) => test.accuracy) || [];

	return {
		parameters: jsonData.parameters,
		statistics: jsonData.statistics,
		modelTrainingDetails: jsonData.model_training_details,
		lastRunTestingAccuracyData: accuracyData
	};
}

module.exports = router;
