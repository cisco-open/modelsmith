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

const QUANTIZATION_PARAMETERS = {
	BPTQ: [
		{
			argName: 'seed',
			defaultValue: 1005,
			inputType: 'number',
			label: 'Random Seed',
			placeholder: 'Enter random seed',
			help: 'Random seed for results reproduction',
			validators: {
				min: 0
			}
		},
		{
			argName: 'dataset',
			defaultValue: 'cifar10',
			inputType: 'select',
			label: 'Dataset Name',
			placeholder: 'Select dataset',
			help: 'Dataset name',
			options: [
				{ value: 'cifar10', viewValue: 'CIFAR-10' },
				{ value: 'cifar100', viewValue: 'CIFAR-100' }
			]
		},
		{
			argName: 'batch_size',
			defaultValue: 128,
			inputType: 'number',
			label: 'Batch Size',
			placeholder: 'Enter batch size',
			help: 'Mini-batch size for data loader',
			validators: {
				interval: [1, 1024]
			}
		},
		{
			argName: 'workers',
			defaultValue: 4,
			inputType: 'number',
			label: 'Number of Workers',
			placeholder: 'Enter number of workers',
			help: 'Number of workers for data loader',
			validators: {
				min: 1
			}
		},
		{
			argName: 'n_bits_w',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Weight Quantization',
			placeholder: 'Enter bitwidth for weight quantization',
			help: 'Bitwidth for weight quantization',
			validators: {
				min: 1
			}
		},
		{
			argName: 'n_bits_a',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Activation Quantization',
			placeholder: 'Enter bitwidth for activation quantization',
			help: 'Bitwidth for activation quantization',
			validators: {
				min: 1
			}
		},
		{
			argName: 'num_samples',
			defaultValue: 1024,
			inputType: 'number',
			label: 'Calibration Dataset Size',
			placeholder: 'Enter size of the calibration dataset',
			help: 'Size of the calibration dataset',
			validators: {
				min: 1
			}
		},
		{
			argName: 'iters_w',
			defaultValue: 20000,
			inputType: 'number',
			label: 'Iterations for AdaRound',
			placeholder: 'Enter number of iterations for AdaRound',
			help: 'Number of iterations for AdaRound',
			validators: {
				min: 1
			}
		},
		{
			argName: 'weight',
			defaultValue: 0.01,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Weight of Rounding Cost',
			placeholder: 'Enter weight of rounding cost',
			help: 'Weight of rounding cost vs. the reconstruction loss',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'b_start',
			defaultValue: 20,
			inputType: 'number',
			label: 'Beginning Temperature',
			placeholder: 'Enter beginning temperature',
			help: 'Temperature at the beginning of calibration',
			validators: {
				min: 0
			}
		},
		{
			argName: 'b_end',
			defaultValue: 2,
			inputType: 'number',
			label: 'End Temperature',
			placeholder: 'Enter end temperature',
			help: 'Temperature at the end of calibration',
			validators: {
				min: 0
			}
		},
		{
			argName: 'warmup',
			defaultValue: 0.2,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Warmup Period',
			placeholder: 'Enter warmup period',
			help: 'In the warmup period, no regularization is applied',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'lr',
			defaultValue: 4e-5,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Learning Rate for LSQ',
			placeholder: 'Enter learning rate for LSQ',
			help: 'Learning rate for LSQ',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'init_wmode',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'Initialization Mode for Weight',
			placeholder: 'Select initialization mode for weight',
			help: 'Initialization mode for weight',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'init_amode',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'Initialization Mode for Activation',
			placeholder: 'Select initialization mode for activation',
			help: 'Initialization mode for activation',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'order',
			defaultValue: 'before',
			inputType: 'select',
			label: 'Quantization Order',
			placeholder: 'Select quantization order',
			help: 'Order about activation compared to weight',
			options: [
				{ value: 'before', viewValue: 'Before' },
				{ value: 'after', viewValue: 'After' },
				{ value: 'together', viewValue: 'Together' }
			]
		},
		{
			argName: 'prob',
			defaultValue: 1.0,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Probability',
			placeholder: 'Enter probability',
			help: 'Probability value',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'input_prob',
			defaultValue: 1.0,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Input Probability',
			placeholder: 'Enter input probability',
			help: 'Input probability',
			validators: {
				interval: [0, 1]
			}
		}
	],
	BRECQ: [
		{
			argName: 'seed',
			defaultValue: 1005,
			inputType: 'number',
			label: 'Seed',
			placeholder: 'Enter random seed',
			help: 'Random seed for results reproduction',
			validators: {
				min: 0
			}
		},
		{
			argName: 'dataset',
			defaultValue: 'cifar10',
			inputType: 'select',
			label: 'Dataset',
			placeholder: 'Select dataset',
			help: 'Dataset name',
			options: [
				{ value: 'cifar10', viewValue: 'CIFAR-10' },
				{ value: 'cifar100', viewValue: 'CIFAR-100' }
			]
		},
		{
			argName: 'batch_size',
			defaultValue: 128,
			inputType: 'number',
			label: 'Batch Size',
			placeholder: 'Enter mini-batch size',
			help: 'Mini-batch size for data loader',
			validators: {
				interval: [1, 1024]
			}
		},
		{
			argName: 'workers',
			defaultValue: 4,
			inputType: 'number',
			label: 'Workers',
			placeholder: 'Enter number of workers',
			help: 'Number of workers for data loader',
			validators: {
				min: 1
			}
		},
		{
			argName: 'n_bits_w',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Weight Quantization',
			placeholder: 'Enter bitwidth for weight quantization',
			help: 'Bitwidth for weight quantization',
			validators: {
				min: 1
			}
		},
		{
			argName: 'n_bits_a',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Activation Quantization',
			placeholder: 'Enter bitwidth for activation quantization',
			help: 'Bitwidth for activation quantization',
			validators: {
				min: 1
			}
		},
		{
			argName: 'num_samples',
			defaultValue: 1024,
			inputType: 'number',
			label: 'Calibration Dataset Size',
			placeholder: 'Enter size of the calibration dataset',
			help: 'Size of the calibration dataset',
			validators: {
				interval: [1, 1024]
			}
		},
		{
			argName: 'iters_w',
			defaultValue: 20000,
			inputType: 'number',
			label: 'Iterations for AdaRound',
			placeholder: 'Enter number of iterations for AdaRound',
			help: 'Number of iterations for AdaRound',
			validators: {
				min: 1
			}
		},
		{
			argName: 'weight',
			defaultValue: 0.01,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Weight of Rounding Cost',
			placeholder: 'Enter weight of rounding cost',
			help: 'Weight of rounding cost vs the reconstruction loss.',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'waq',
			defaultValue: true,
			inputType: 'checkbox',
			label: 'Activation Quant for Weight Reconstruction',
			placeholder: '',
			help: 'act_quant for input in weight reconstruction'
		},
		{
			argName: 'b_start',
			defaultValue: 20,
			inputType: 'number',
			label: 'Beginning Temperature',
			placeholder: 'Enter beginning temperature',
			help: 'Temperature at the beginning of calibration',
			validators: {
				min: 0
			}
		},
		{
			argName: 'b_end',
			defaultValue: 2,
			inputType: 'number',
			label: 'End Temperature',
			placeholder: 'Enter end temperature',
			help: 'Temperature at the end of calibration',
			validators: {
				min: 0
			}
		},
		{
			argName: 'warmup',
			defaultValue: 0.2,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Warmup Period',
			placeholder: 'Enter warmup period',
			help: 'In the warmup period no regularization is applied',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'lr',
			defaultValue: 4e-5,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Learning Rate for LSQ',
			placeholder: 'Enter learning rate for LSQ',
			help: 'Learning rate for LSQ',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'awq',
			defaultValue: true,
			inputType: 'checkbox',
			label: 'Weight Quant for Activation Reconstruction',
			placeholder: '',
			help: 'weight_quant for input in activation reconstruction'
		},
		{
			argName: 'aaq',
			defaultValue: true,
			inputType: 'checkbox',
			label: 'Activation Quant for Activation Reconstruction',
			placeholder: '',
			help: 'act_quant for input in activation reconstruction'
		},
		{
			argName: 'init_wmode',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'Initialization Mode for Weight',
			placeholder: 'Select initialization mode for weight',
			help: 'Init opt mode for weight',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'init_amode',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'Initialization Mode for Activation',
			placeholder: 'Select initialization mode for activation',
			help: 'Init opt mode for activation',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'order',
			defaultValue: 'together',
			inputType: 'select',
			label: 'Quantization Order',
			placeholder: 'Select quantization order',
			help: 'Order about activation compared to weight',
			options: [
				{ value: 'before', viewValue: 'Before' },
				{ value: 'after', viewValue: 'After' },
				{ value: 'together', viewValue: 'Together' }
			]
		},
		{
			argName: 'prob',
			defaultValue: 1.0,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Probability',
			placeholder: 'Enter probability',
			help: 'Probability',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'input_prob',
			defaultValue: 1.0,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Input Probability',
			placeholder: 'Enter input probability',
			help: 'Input probability',
			validators: {
				interval: [0, 1]
			}
		}
	],
	MINMAXPTQ: [
		{
			argName: 'seed',
			defaultValue: 1005,
			inputType: 'number',
			label: 'Seed',
			placeholder: 'Enter random seed',
			help: 'Random seed for results reproduction',
			validators: {
				min: 0
			}
		},
		{
			argName: 'dataset',
			defaultValue: 'cifar10',
			inputType: 'select',
			label: 'Dataset',
			placeholder: 'Select dataset',
			help: 'Dataset name',
			options: [
				{ value: 'cifar10', viewValue: 'CIFAR-10' },
				{ value: 'cifar100', viewValue: 'CIFAR-100' }
			]
		},
		{
			argName: 'batch_size',
			defaultValue: 128,
			inputType: 'number',
			label: 'Batch Size',
			placeholder: 'Enter batch size',
			help: 'Mini-batch size for data loader',
			validators: {
				interval: [1, 1024]
			}
		},
		{
			argName: 'workers',
			defaultValue: 4,
			inputType: 'number',
			label: 'Workers',
			placeholder: 'Enter number of workers',
			help: 'Number of workers for data loader',
			validators: {
				min: 1
			}
		},
		{
			argName: 'n_bits_w',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Weights',
			placeholder: 'Enter bitwidth for weights',
			help: 'Bitwidth for weight quantization',
			validators: {
				min: 1
			}
		},
		{
			argName: 'n_bits_a',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Activations',
			placeholder: 'Enter bitwidth for activations',
			help: 'Bitwidth for activation quantization',
			validators: {
				min: 1
			}
		},
		{
			argName: 'num_samples',
			defaultValue: 1024,
			inputType: 'number',
			label: 'Number of Samples',
			placeholder: 'Enter number of calibration samples',
			help: 'Size of the calibration dataset',
			validators: {
				min: 1
			}
		},
		{
			argName: 'iters_w',
			defaultValue: 20000,
			inputType: 'number',
			label: 'Iterations for Weight Calibration',
			placeholder: 'Enter number of iterations for weight calibration',
			help: 'Number of iteration for adaround',
			validators: {
				min: 1
			}
		},
		{
			argName: 'weight',
			defaultValue: 0.01,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Weight of Rounding Cost',
			placeholder: 'Enter weight of rounding cost',
			help: 'Weight of rounding cost vs the reconstruction loss.',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'b_start',
			defaultValue: 20,
			inputType: 'number',
			label: 'Start Temperature',
			placeholder: 'Enter start temperature for calibration',
			help: 'Temperature at the beginning of calibration',
			validators: {
				min: 0
			}
		},
		{
			argName: 'b_end',
			defaultValue: 2,
			inputType: 'number',
			label: 'End Temperature',
			placeholder: 'Enter end temperature for calibration',
			help: 'Temperature at the end of calibration',
			validators: {
				min: 0
			}
		},
		{
			argName: 'warmup',
			defaultValue: 0.2,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Warmup Period',
			placeholder: 'Enter warmup period',
			help: 'In the warmup period no regularization is applied',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'lr',
			defaultValue: 4e-5,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Learning Rate for LSQ',
			placeholder: 'Enter learning rate for LSQ',
			help: 'Learning rate for LSQ',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'init_wmode',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'Weight Initialization Mode',
			placeholder: 'Select initialization mode for weight',
			help: 'Initialization mode for weight',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'init_amode',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'Activation Initialization Mode',
			placeholder: 'Select initialization mode for activation',
			help: 'Initialization mode for activation',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'order',
			defaultValue: 'before',
			inputType: 'select',
			label: 'Quantization Order',
			placeholder: 'Select quantization order',
			help: 'Order of quantization in relation to activation',
			options: [
				{ value: 'before', viewValue: 'Before' },
				{ value: 'after', viewValue: 'After' },
				{ value: 'together', viewValue: 'Together' }
			]
		},
		{
			argName: 'prob',
			defaultValue: 1.0,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Probability',
			placeholder: 'Enter probability',
			help: 'Probability',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'input_prob',
			defaultValue: 1.0,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Input Probability',
			placeholder: 'Enter input probability',
			help: 'Input probability',
			validators: {
				interval: [0, 1]
			}
		}
	]
};

const PRUNING_PARAMETERS = {
	IMP: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 2,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs for each training period',
			validators: {
				min: 1
			}
		},
		{
			argName: 'pruning_times',
			defaultValue: 3,
			inputType: 'number',
			label: 'Pruning Times',
			placeholder: 'Enter pruning times',
			help: 'Set this to 1 if OMP is applied',
			validators: {
				min: 1
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.2,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'rewinding_epoch',
			defaultValue: 1,
			inputType: 'number',
			label: 'Rewinding Epoch',
			placeholder: 'Enter rewinding epoch',
			help: 'Rewinding epoch',
			validators: {
				min: 0
			}
		}
	],
	IPG: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'The learning rate for the model training.',
			validators: {
				required: true,
				interval: [0, 1]
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'The ratio of parameters to prune.',
			validators: {
				required: true,
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'The number of complete passes through the training dataset.',
			validators: {
				required: true,
				min: 1
			}
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'select',
			label: 'Device',
			options: [
				{ value: 'cuda', viewValue: 'CUDA' },
				{ value: 'cpu', viewValue: 'CPU' }
			],
			help: 'The device to use for training the model.'
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Accuracy',
			placeholder: 'Enter best accuracy',
			help: 'The best test accuracy achieved so far.',
			validators: {
				min: 0,
				max: 100
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'The epoch number to start training from.',
			validators: {
				min: 0
			}
		}
	],
	IPM: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs',
			validators: {
				min: 1
			}
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'select',
			label: 'Device',
			placeholder: 'Select device',
			help: 'Device to use',
			options: [
				{ value: 'cuda', viewValue: 'CUDA' },
				{ value: 'cpu', viewValue: 'CPU' }
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'Best test accuracy',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'Start epoch',
			validators: {
				min: 0
			}
		}
	],
	IPR: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs',
			validators: {
				min: 1
			}
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'select',
			label: 'Device',
			placeholder: 'Select device',
			help: 'Device to use',
			options: [
				{ value: 'cuda', viewValue: 'CUDA' },
				{ value: 'cpu', viewValue: 'CPU' }
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'Best test accuracy',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'Start epoch',
			validators: {
				min: 0
			}
		}
	],
	IPS: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs',
			validators: {
				min: 1
			}
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'select',
			label: 'Device',
			placeholder: 'Select device',
			help: 'Device to use',
			options: [
				{ value: 'cuda', viewValue: 'CUDA' },
				{ value: 'cpu', viewValue: 'CPU' }
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'Best test accuracy',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'Start epoch',
			validators: {
				min: 0
			}
		}
	],
	IPSY: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs',
			validators: {
				min: 1
			}
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'select',
			label: 'Device',
			placeholder: 'Select device',
			help: 'Device to use',
			options: [
				{ value: 'cuda', viewValue: 'CUDA' },
				{ value: 'cpu', viewValue: 'CPU' }
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'Best test accuracy',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'Start epoch',
			validators: {
				min: 0
			}
		}
	],
	OMP: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 2,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs for each training period',
			validators: {
				min: 1
			}
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'select',
			label: 'Device',
			placeholder: 'Select device',
			help: 'Device to use',
			options: [
				{ value: 'cuda', viewValue: 'CUDA' },
				{ value: 'cpu', viewValue: 'CPU' }
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'Best test accuracy',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'Start epoch',
			validators: {
				min: 0
			}
		},
		{
			argName: 'pruning_times',
			defaultValue: 2,
			inputType: 'number',
			label: 'Pruning Times',
			placeholder: 'Enter number of pruning times',
			help: 'Number of pruning times',
			validators: {
				min: 1
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.2,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'rewinding_epoch',
			defaultValue: 1,
			inputType: 'number',
			label: 'Rewinding Epoch',
			placeholder: 'Enter rewinding epoch',
			help: 'Rewinding epoch',
			validators: {
				min: 0
			}
		}
	],
	IPMB: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputArrowsStepRate: 0.01,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio',
			validators: {
				interval: [0, 1]
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs',
			validators: {
				min: 1
			}
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'Best test accuracy',
			validators: {
				interval: [0, 100]
			}
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'Start epoch',
			validators: {
				min: 0
			}
		}
	]
};

const MACHINE_UNLEARNING_PARAMETERS = {
	MU: [
		{
			argName: 'unlearn_epochs',
			defaultValue: 2,
			inputType: 'number',
			label: 'Unlearning Epochs',
			placeholder: 'Enter number of unlearning epochs',
			help: 'Number of epochs for l1-sparse unlearning',
			validators: {
				min: 1
			}
		},
		{
			argName: 'num-indexes-to-replace',
			defaultValue: 4500,
			inputType: 'number',
			label: 'Number of Indexes to Replace',
			placeholder: 'Enter number of indexes to replace',
			help: 'Defines how many indexes (data points) will be replaced during the unlearning process.',
			validators: {
				min: 1
			}
		},
		{
			argName: 'class_to_replace',
			defaultValue: 0,
			inputType: 'number',
			label: 'Class to Forget',
			placeholder: 'Enter class to forget',
			help: 'Identifies the specific class label that the model should selectively forget.',
			validators: {
				min: 0
			}
		}
	]
};

const AWQ_PARAMETERS = {
	AWQ_Q: [
		{
			argName: 'w_bit',
			defaultValue: 4,
			inputType: 'select',
			label: 'Bit width for weights',
			placeholder: 'Select bit width for weights',
			help: 'Bit width for weights',
			options: [
				{ value: 4, viewValue: '4' },
				{ value: 8, viewValue: '8' },
				{ value: 16, viewValue: '16' }
			]
		},
		{
			argName: 'zero_point',
			defaultValue: true,
			inputType: 'select',
			label: 'Zero-point quantization',
			placeholder: 'Select zero-point quantization option',
			help: 'Use zero-point quantization',
			options: [
				{ value: true, viewValue: 'True' },
				{ value: false, viewValue: 'False' }
			]
		},
		{
			argName: 'q_group_size',
			defaultValue: 128,
			inputType: 'select',
			label: 'Quantization group size',
			placeholder: 'Select quantization group size',
			help: 'Quantization group size',
			options: [
				{ value: 32, viewValue: '32' },
				{ value: 64, viewValue: '64' },
				{ value: 128, viewValue: '128' },
				{ value: 256, viewValue: '256' }
			]
		},
		{
			argName: 'version',
			defaultValue: 'GEMM',
			inputType: 'select',
			label: 'Quantization version/algorithm',
			placeholder: 'Select quantization version/algorithm',
			help: 'Quantization version/algorithm',
			options: [
				{ value: 'GEMM', viewValue: 'GEMM' },
				{ value: 'DEFAULT', viewValue: 'DEFAULT' }
			]
		}
	]
};

const TRAIN_PARAMETERS = {
	P_TRAIN: [
		{
			argName: 'epochs',
			defaultValue: 200,
			inputType: 'number',
			label: 'Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs for training the machine unlearning',
			validators: {
				min: 1
			}
		},
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		}
	],
	Q_TRAIN: [
		{
			argName: 'epochs',
			defaultValue: 200,
			inputType: 'number',
			label: 'Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs for training the machine unlearning',
			validators: {
				min: 1
			}
		},
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		}
	],
	MU_TRAIN: [
		{
			argName: 'epochs',
			defaultValue: 200,
			inputType: 'number',
			label: 'Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs for training the machine unlearning',
			validators: {
				min: 1
			}
		},
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputArrowsStepRate: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate',
			validators: {
				interval: [0, 1]
			}
		}
	]
};

const MULTIFLOW_PARAMETERS = {
	MULTIFLOW_PRUNE: [
		{
			argName: 'pruner',
			defaultValue: 'multiflow',
			inputType: 'select',
			label: 'Pruner Type',
			placeholder: 'Select pruner type',
			help: 'Type of pruner to use',
			options: [
				{ value: 'omp', viewValue: 'omp' },
				{ value: 'rand', viewValue: 'rand' },
				{ value: 'snip', viewValue: 'snip' },
				{ value: 'itersnip', viewValue: 'itersnip' },
				{ value: 'lamp', viewValue: 'lamp' },
				{ value: 'chita', viewValue: 'chita' },
				{ value: 'tamt', viewValue: 'tamt' },
				{ value: 'l2', viewValue: 'l2' },
				{ value: 'multiflow', viewValue: 'multiflow' }
			]
		},
		{
			argName: 'model',
			defaultValue: 'xvlm',
			inputType: 'select',
			label: 'Model Type',
			placeholder: 'Select model type',
			help: 'Type of model to prune',
			options: [
				{ value: 'xvlm', viewValue: 'xvlm' },
				{ value: 'blip', viewValue: 'blip' },
				{ value: 'dino', viewValue: 'dino' }
			]
		},
		{
			argName: 'sparsities',
			defaultValue: '63,75,90',
			inputType: 'text',
			label: 'Sparsities',
			placeholder: 'Enter comma separated list of sparsities',
			help: 'Comma separated list of sparsities to prune at. Default: 63,75,90',
			validators: {
				commaSeparatedValues: true
			}
		},
		{
			argName: 'seed',
			defaultValue: 42,
			inputType: 'number',
			label: 'Seed',
			placeholder: 'Enter seed for random number generator',
			help: 'Seed for the random number generator. Default: 42',
			validators: {
				min: 0
			}
		},
		{
			argName: 'num_batches',
			defaultValue: 3000,
			inputType: 'number',
			label: 'Number of Batches',
			placeholder: 'Enter number of batches to use',
			help: 'Number of batches to use. Default: 3000',
			validators: {
				min: 1
			}
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Epochs',
			placeholder: 'Enter total number of pruning iterations',
			help: 'Total number of pruning iterations. Default: 1',
			validators: {
				min: 1
			}
		},
		{
			argName: 'schedule',
			defaultValue: 'exp',
			inputType: 'select',
			label: 'Schedule',
			placeholder: 'Select schedule for IterSNIP/CHITA++',
			help: 'Schedule for IterSNIP/CHITA++. Default: exp',
			options: [
				{ value: 'linear', viewValue: 'linear' },
				{ value: 'exp', viewValue: 'exp' },
				{ value: 'const', viewValue: 'const' }
			],
			validators: {
				required: true
			}
		},
		{
			argName: 'lambda_',
			defaultValue: 1e-5,
			inputType: 'number',
			label: 'Lambda',
			placeholder: 'Enter ridge penalty for CHITA and CHITA++',
			help: 'Ridge penalty for CHITA and CHITA++, unused otherwise. Default: 1e-5',
			validators: {
				min: 0
			}
		}
	]
};

const DIFFUSION_MODEL_PARAMETERS = {
	PTQ4DIT_GET_CALIBRATION_SET: [
		{
			argName: 'model',
			defaultValue: 'DiT-XL/2',
			inputType: 'select',
			label: 'Model Type',
			placeholder: 'Select model type',
			help: 'Choose the type of model to use for calibration.',
			options: [{ value: 'DiT-XL/2', viewValue: 'DiT-XL/2' }]
		},
		{
			argName: 'vae',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'VAE Type',
			placeholder: 'Select VAE type',
			help: 'Type of VAE to use for sampling.',
			options: [
				{ value: 'ema', viewValue: 'ema' },
				{ value: 'mse', viewValue: 'mse' }
			]
		},
		{
			argName: 'image-size',
			defaultValue: 256,
			inputType: 'select',
			label: 'Image Size',
			placeholder: 'Select image size',
			help: 'Resolution of the generated images.',
			options: [
				{ value: 256, viewValue: '256' },
				{ value: 512, viewValue: '512' }
			]
		},
		{
			argName: 'num-classes',
			defaultValue: 1000,
			inputType: 'number',
			label: 'Number of Classes',
			placeholder: 'Enter number of classes',
			help: 'Number of classes for classification. Default: 1000',
			validators: {
				min: 1
			}
		},
		{
			argName: 'cfg-scale',
			defaultValue: 1.5,
			inputType: 'number',
			label: 'CFG Scale',
			placeholder: 'Enter CFG scale value',
			help: 'Classifier-free guidance scale. Default: 1.5',
			validators: {
				min: 0
			}
		},
		{
			argName: 'num-sampling-steps',
			defaultValue: 250,
			inputType: 'number',
			label: 'Number of Sampling Steps',
			placeholder: 'Enter number of sampling steps',
			help: 'Number of sampling steps for diffusion. Default: 250',
			validators: {
				min: 1
			}
		},
		{
			argName: 'seed',
			defaultValue: 1,
			inputType: 'number',
			label: 'Random Seed',
			placeholder: 'Enter random seed value',
			help: 'Seed for random number generator. Default: 1',
			validators: {
				min: 0
			}
		},
		{
			argName: 'ckpt',
			defaultValue: null,
			inputType: 'text',
			label: 'Checkpoint Path',
			placeholder: 'Enter checkpoint path',
			help: 'Path to a custom DiT checkpoint (leave blank for auto-download).'
		},
		{
			argName: 'outdir',
			defaultValue: 'output/',
			inputType: 'text',
			label: 'Output Directory',
			placeholder: 'Enter output directory path',
			help: 'Directory where generated images and logs will be saved.'
		},
		{
			argName: 'filename',
			defaultValue: 'imagenet_DiT-512_sample4000_250steps_allst.pt',
			inputType: 'text',
			label: 'Output Filename',
			placeholder: 'Enter output filename',
			help: 'Name of the file where generated logs will be saved.'
		}
	],
	PTQ4DIT_QUANT_SAMPLE: [
		{
			argName: 'model',
			defaultValue: 'DiT-XL/2',
			inputType: 'select',
			label: 'Model Type',
			placeholder: 'Select model type',
			help: 'Choose the type of model to quantize.',
			options: [{ value: 'DiT-XL/2', viewValue: 'DiT-XL/2' }]
		},
		{
			argName: 'vae',
			defaultValue: 'mse',
			inputType: 'select',
			label: 'VAE Type',
			placeholder: 'Select VAE type',
			help: 'Type of VAE to use for sampling.',
			options: [
				{ value: 'ema', viewValue: 'ema' },
				{ value: 'mse', viewValue: 'mse' }
			]
		},
		{
			argName: 'image-size',
			defaultValue: 256,
			inputType: 'select',
			label: 'Image Size',
			placeholder: 'Select image size',
			help: 'Resolution of the generated images.',
			options: [
				{ value: 256, viewValue: '256' },
				{ value: 512, viewValue: '512' }
			]
		},
		{
			argName: 'num-classes',
			defaultValue: 1000,
			inputType: 'number',
			label: 'Number of Classes',
			placeholder: 'Enter number of classes',
			help: 'Number of classes for classification. Default: 1000',
			validators: {
				min: 1
			}
		},
		{
			argName: 'cfg-scale',
			defaultValue: 1.5,
			inputType: 'number',
			label: 'CFG Scale',
			placeholder: 'Enter CFG scale value',
			help: 'Classifier-free guidance scale. Default: 1.5',
			validators: {
				min: 0
			}
		},
		{
			argName: 'num-sampling-steps',
			defaultValue: 250,
			inputType: 'number',
			label: 'Number of Sampling Steps',
			placeholder: 'Enter number of sampling steps',
			help: 'Number of sampling steps for diffusion. Default: 250',
			validators: {
				min: 1
			}
		},
		{
			argName: 'seed',
			defaultValue: 1,
			inputType: 'number',
			label: 'Random Seed',
			placeholder: 'Enter random seed value',
			help: 'Seed for random number generator. Default: 1',
			validators: {
				min: 0
			}
		},
		{
			argName: 'ckpt',
			defaultValue: null,
			inputType: 'text',
			label: 'Checkpoint Path',
			placeholder: 'Enter checkpoint path',
			help: 'Path to a custom DiT checkpoint (leave blank for auto-download).'
		},
		{
			argName: 'outdir',
			defaultValue: 'output/',
			inputType: 'text',
			label: 'Output Directory',
			placeholder: 'Enter output directory path',
			help: 'Directory where generated images and logs will be saved.'
		},
		{
			argName: 'ptq',
			defaultValue: false,
			inputType: 'checkbox',
			label: 'Post-Training Quantization',
			help: 'Enable post-training quantization.'
		},
		{
			argName: 'weight_bit',
			defaultValue: 8,
			inputType: 'number',
			label: 'Weight Bits',
			placeholder: 'Enter weight quantization bit-width',
			help: 'Bit-width for weight quantization. Default: 8',
			validators: {
				min: 1,
				max: 32
			}
		},
		{
			argName: 'act_bit',
			defaultValue: 8,
			inputType: 'number',
			label: 'Activation Bits',
			placeholder: 'Enter activation quantization bit-width',
			help: 'Bit-width for activation quantization. Default: 8',
			validators: {
				min: 1,
				max: 32
			}
		},
		{
			argName: 'cali_data_path',
			defaultValue: 'sd_coco_sample1024_allst.pt',
			inputType: 'text',
			label: 'Calibration Data Path',
			placeholder: 'Enter calibration dataset path',
			help: 'Path to the calibration dataset.'
		},
		{
			argName: 'resume',
			defaultValue: false,
			inputType: 'checkbox',
			label: 'Resume Quantization',
			help: 'Resume calibration with existing checkpoint.'
		},
		{
			argName: 'cali_st',
			defaultValue: 1,
			inputType: 'number',
			label: 'Calibration Steps',
			placeholder: 'Enter number of calibration timesteps',
			help: 'Number of timesteps used for calibration. Default: 1',
			validators: {
				min: 1
			}
		},
		{
			argName: 'cali_batch_size',
			defaultValue: 32,
			inputType: 'number',
			label: 'Calibration Batch Size',
			placeholder: 'Enter batch size for calibration',
			help: 'Batch size used for model calibration. Default: 32',
			validators: {
				min: 1
			}
		},
		{
			argName: 'inference',
			defaultValue: false,
			inputType: 'checkbox',
			label: 'Perform Inference',
			help: 'Enable inference on all classes.'
		},
		{
			argName: 'n_c',
			defaultValue: 10,
			inputType: 'number',
			label: 'Number of Samples per Class',
			placeholder: 'Enter number of samples per class for inference',
			help: 'Number of samples generated per class for inference. Default: 10',
			validators: {
				min: 1
			}
		}
	]
};

const ALGORITHM_PARAMETERS = {
	...QUANTIZATION_PARAMETERS,
	...PRUNING_PARAMETERS,
	...MACHINE_UNLEARNING_PARAMETERS,
	...AWQ_PARAMETERS,
	...TRAIN_PARAMETERS,
	...MULTIFLOW_PARAMETERS,
	...DIFFUSION_MODEL_PARAMETERS
};

module.exports = ALGORITHM_PARAMETERS;
