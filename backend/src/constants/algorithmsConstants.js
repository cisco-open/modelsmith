const ALGORITHM_TYPES = require('./algorithmTypesConstants');

const PRUNING_PATH = 'examples_pruning/';
const QUANTIZATION_PATH = 'examples_quant/';
const MACHINE_UNLEARNING_PATH = 'examples_unlearning/';

const PRUNING_ALGORITHMS = {
	IPG: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_grasp.py'
	},
	IPM: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_magnitude.py'
	},
	IPR: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_random.py'
	},
	IMP: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'iterative_magnitude_pruning.py'
	},
	OMP: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'oneshot_magnitude_pruning.py'
	},
	IPS: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_snip.py'
	},
	IPSY: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_synflow.py'
	}
};

const QUANT_ALGORITHMS = {
	BPTQ: {
		path: QUANTIZATION_PATH,
		type: ALGORITHM_TYPES.QUANTIZATION,
		fileName: 'basic-ptq-example.py'
	},
	BRECQ: {
		path: QUANTIZATION_PATH,
		type: ALGORITHM_TYPES.QUANTIZATION,
		fileName: 'brecq-example.py'
	},
	MINMAXPTQ: {
		path: QUANTIZATION_PATH,
		type: ALGORITHM_TYPES.QUANTIZATION,
		fileName: 'minmax-ptq-example.py'
	}
};

const MACHINE_UNLEARNING_ALGORITHMS = {
	MU: {
		path: MACHINE_UNLEARNING_PATH,
		type: ALGORITHM_TYPES.MACHINE_UNLEARNING,
		fileName: 'main_forget.py'
	}
};

const TRAIN_ALGORITHMS = {
	MUT: {
		path: MACHINE_UNLEARNING_PATH,
		type: ALGORITHM_TYPES.TRAIN,
		fileName: 'train.py'
	}
};

const ALGORITHMS = {
	...PRUNING_ALGORITHMS,
	...QUANT_ALGORITHMS,
	...MACHINE_UNLEARNING_ALGORITHMS,
	...TRAIN_ALGORITHMS
};

module.exports = ALGORITHMS;
