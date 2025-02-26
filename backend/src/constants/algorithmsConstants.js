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

const ALGORITHM_TYPES = require('./algorithmTypesConstants');

const PRUNING_PATH = 'examples_pruning/';
const QUANTIZATION_PATH = 'examples_quant/';
const MACHINE_UNLEARNING_PATH = 'examples_unlearning/';
const AUTOAWQ_PATH = 'autoawq/examples/';
const MULTIFLOW_PATH = 'multiflow/';
const DIFFUSION_MODEL_PATH = 'diffusion_model/';

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
	},
	IPMB: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.PRUNING,
		fileName: 'init_pruning_magnitude_both.py'
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

const AWQ_ALGORITHMS = {
	AWQ_Q: {
		path: AUTOAWQ_PATH,
		type: ALGORITHM_TYPES.AWQ,
		fileName: 'quantize.py'
	}
};

const TRAIN_ALGORITHMS = {
	P_TRAIN: {
		path: PRUNING_PATH,
		type: ALGORITHM_TYPES.TRAIN,
		fileName: 'train.py'
	},
	Q_TRAIN: {
		path: QUANTIZATION_PATH,
		type: ALGORITHM_TYPES.TRAIN,
		fileName: 'train.py'
	},
	MU_TRAIN: {
		path: MACHINE_UNLEARNING_PATH,
		type: ALGORITHM_TYPES.TRAIN,
		fileName: 'train.py'
	}
};

const MULTIFLOW_ALGORITHMS = {
	MULTIFLOW_PRUNE: {
		path: MULTIFLOW_PATH,
		type: ALGORITHM_TYPES.MULTIFLOW,
		fileName: 'prune.py'
	}
};

const DIFFUSION_MODEL_ALGORITHMS = {
	PTQ4DiT_GET_CALIBRATION_SET: {
		path: `${DIFFUSION_MODEL_PATH}PTQ4DiT/`,
		type: ALGORITHM_TYPES.DIFFUSION_MODEL,
		fileName: 'get_calibration_set.py'
	},
	PTQ4DiT_QUANT_SAMPLE: {
		path: `${DIFFUSION_MODEL_PATH}PTQ4DiT/`,
		type: ALGORITHM_TYPES.DIFFUSION_MODEL,
		fileName: 'quant_sample.py'
	}
};

const ALGORITHMS = {
	...PRUNING_ALGORITHMS,
	...QUANT_ALGORITHMS,
	...MACHINE_UNLEARNING_ALGORITHMS,
	...AWQ_ALGORITHMS,
	...TRAIN_ALGORITHMS,
	...MULTIFLOW_ALGORITHMS,
	...DIFFUSION_MODEL_ALGORITHMS
};

module.exports = ALGORITHMS;
