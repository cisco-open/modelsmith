const { broadcastTerminal } = require('../services/websocketService');
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');
const { executeCommand } = require('./commandExecutionFacade');
const { pruningParserInstance } = require('../parsers/pruningParser');
const { quantizationParserInstance } = require('../parsers/quantizationParser');
const { machineUnlearningParserInstance } = require('../parsers/machineUnlearningParser');

class ScriptExecutor {
	constructor(type, parser) {
		this.type = type;
		this.parser = parser;
	}

	execute(scriptPath, algorithm, args) {
		return new Promise((resolve, reject) => {
			this.parser.reset();
			const cmd = this.buildCommand(scriptPath, algorithm, args);
			const pythonCmd = this.buildPythonCommand(scriptPath, algorithm, args);

			broadcastTerminal(pythonCmd);

			executeCommand(
				cmd,
				(data) => this.handleOutput(data),
				() => resolve(),
				(error) => reject(error)
			);
		});
	}

	buildCommand(scriptPath, algorithm, args) {
		if (this.type === ALGORITHM_TYPES.MULTIFLOW) {
			return `bash -c "source ${process.env.CONDA_SH_PATH} && cd ${process.env.MACHINE_LEARNING_CORE_PATH}/multiflow && conda activate modelsmith && python3 ${algorithm} ${args}"`;
		}
		return `bash -c "source ${process.env.CONDA_SH_PATH} && conda activate modelsmith && python3 ${scriptPath}${algorithm} ${args}"`;
	}

	buildPythonCommand(scriptPath, algorithm, args) {
		if (this.type === ALGORITHM_TYPES.MULTIFLOW) {
			return `python3 ${algorithm} ${args}`;
		}
		return `python3 "${scriptPath}${algorithm}" ${args}`;
	}

	handleOutput(data) {
		const formattedData = data.toString();
		broadcastTerminal(formattedData);
		this.parser.parseLine(formattedData);
	}
}

const executorFactory = {
	[ALGORITHM_TYPES.PRUNING]: new ScriptExecutor(ALGORITHM_TYPES.PRUNING, pruningParserInstance),
	[ALGORITHM_TYPES.QUANTIZATION]: new ScriptExecutor(ALGORITHM_TYPES.QUANTIZATION, quantizationParserInstance),
	[ALGORITHM_TYPES.MACHINE_UNLEARNING]: new ScriptExecutor(
		ALGORITHM_TYPES.MACHINE_UNLEARNING,
		machineUnlearningParserInstance
	),
	[ALGORITHM_TYPES.AWQ]: new ScriptExecutor(ALGORITHM_TYPES.AWQ, { reset: () => {}, parseLine: () => {} }),
	[ALGORITHM_TYPES.MULTIFLOW]: new ScriptExecutor(ALGORITHM_TYPES.MULTIFLOW, { reset: () => {}, parseLine: () => {} }),
	[ALGORITHM_TYPES.TRAIN]: new ScriptExecutor(ALGORITHM_TYPES.TRAIN, { reset: () => {}, parseLine: () => {} })
};

module.exports = module.exports = {
	ScriptExecutor,
	executorFactory
};
