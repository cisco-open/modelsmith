const express = require('express');
const router = express.Router();
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');
const { executeCommand } = require('../facades/executionFacade');
const checkSshConnection = require('../middlewares/checkSshConnection');
const StatelessPruningParser = require('../parsers/statelessPruningParser');

const RUN_RECORDS_PATHS = {
	[ALGORITHM_TYPES.QUANTIZATION]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_quant/run_records`,
	[ALGORITHM_TYPES.PRUNING]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_pruning/run_records`,
	[ALGORITHM_TYPES.MACHINE_UNLEARNING]: `${process.env.MACHINE_LEARNING_CORE_PATH}/examples_unlearning/run_records`
};

router.get('/run-records-filenames/:type', checkSshConnection, (req, res) => {
	const type = req.params.type;
	const directoryPath = RUN_RECORDS_PATHS[type];

	if (!directoryPath) {
		return res.status(400).send('Invalid model type specified');
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
		(error) => res.status(500).send(`SSH error: ${error}`)
	);
});

router.get('/run-records-summarized-data/:type/:filename', checkSshConnection, (req, res) => {
	const type = req.params.type;
	const fileName = req.params.filename;
	const directoryPath = RUN_RECORDS_PATHS[type];

	if (!directoryPath) {
		return res.status(400).send('Invalid model type specified');
	}

	const filePath = `${directoryPath}/${fileName}.json`;
	const readFileCommand = `cat ${filePath}`;

	executeCommand(
		readFileCommand,
		(output) => parseAndRespond(output, type, res),
		() => {},
		(error) => {
			res.status(500).send(`SSH error: ${error}`);
		},
		true
	);
});

function parseAndRespond(output, type, res) {
	const jsonData = JSON.parse(output);
	if (type === ALGORITHM_TYPES.PRUNING) {
		jsonData.messages = StatelessPruningParser.parseMessages(jsonData.messages);
		const summarizedData = summarizeData(jsonData);
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.status(200).send(summarizedData);
	} else {
		res.status(500).send('Algorithm type not supported.');
	}
}

function summarizeData(jsonData) {
	const lastMessage = jsonData.messages[jsonData.messages.length - 1];
	const lastEpoch = lastMessage?.epochs[lastMessage.epochs.length - 1];
	const accuracyData = lastEpoch?.testing.map((test) => test.accuracy) || [];

	return {
		parameters: jsonData.parameters,
		statistics: jsonData.statistics,
		lastRunTestingAccuracyData: accuracyData
	};
}

module.exports = router;
