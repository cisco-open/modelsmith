// Data should be retrieved from a DB.
const ALGORITHM_TYPES = require('./algorithmTypesConstants');

const PRUNING_ALGORITHMS = {
	IPG: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_grasp.py'
	},
	IPM: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_magnitude.py'
	},
	IPR: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_random.py'
	},
	IMP: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'iterative_magnitude_pruning.py'
	},
	OMP: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'oneshot_magnitude_pruning.py'
	},
	IPS: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_snip.py'
	},
	IPSY: {
		path: 'examples/',
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_synflow.py'
	}
};

const QUANT_ALGORITHMS = {
	BPTQ: {
		path: 'examples_quant/',
		type: ALGORITHM_TYPES.QUANTIZATION,
		fileName: 'basic-ptq-example.py'
	},
	BRECQ: {
		path: 'examples_quant/',
		type: ALGORITHM_TYPES.QUANTIZATION,
		fileName: 'brecq-example.py'
	},
	MINMAXPTQ: {
		path: 'examples_quant/',
		type: ALGORITHM_TYPES.QUANTIZATION,
		fileName: 'minmax-ptq-example.py'
	}
};

const MACHINE_UNLEARNING_ALGORITHMS = {
	MU: {
		path: 'examples_unlearning/',
		type: ALGORITHM_TYPES.MACHINE_UNLEARNING,
		fileName: 'main_forget.py'
	}
};

const TRAIN_ALGORITHMS = {
	MUT: {
		path: 'examples_unlearning/',
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
