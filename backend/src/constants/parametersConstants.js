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

const QUANTIZATION_PARAMETERS = {
	BPTQ: [
		{
			argName: 'seed',
			defaultValue: 1005,
			inputType: 'number',
			label: 'Random Seed',
			placeholder: 'Enter random seed',
			help: 'random seed for results reproduction'
		},
		{
			argName: 'dataset',
			defaultValue: 'cifar10',
			inputType: 'dropdown',
			label: 'Dataset Name',
			placeholder: 'Select dataset',
			help: 'dataset name',
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
			help: 'mini-batch size for data loader'
		},
		{
			argName: 'workers',
			defaultValue: 4,
			inputType: 'number',
			label: 'Number of Workers',
			placeholder: 'Enter number of workers',
			help: 'number of workers for data loader'
		},
		{
			argName: 'n_bits_w',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Weight Quantization',
			placeholder: 'Enter bitwidth for weight quantization',
			help: 'bitwidth for weight quantization'
		},
		{
			argName: 'n_bits_a',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Activation Quantization',
			placeholder: 'Enter bitwidth for activation quantization',
			help: 'bitwidth for activation quantization'
		},
		{
			argName: 'num_samples',
			defaultValue: 1024,
			inputType: 'number',
			label: 'Calibration Dataset Size',
			placeholder: 'Enter size of the calibration dataset',
			help: 'size of the calibration dataset'
		},
		{
			argName: 'iters_w',
			defaultValue: 20000,
			inputType: 'number',
			label: 'Iterations for AdaRound',
			placeholder: 'Enter number of iterations for AdaRound',
			help: 'number of iteration for adaround'
		},
		{
			argName: 'weight',
			defaultValue: 0.01,
			inputType: 'number',
			label: 'Weight of Rounding Cost',
			placeholder: 'Enter weight of rounding cost',
			help: 'weight of rounding cost vs the reconstruction loss.'
		},
		{
			argName: 'b_start',
			defaultValue: 20,
			inputType: 'number',
			label: 'Beginning Temperature',
			placeholder: 'Enter beginning temperature',
			help: 'temperature at the beginning of calibration'
		},
		{
			argName: 'b_end',
			defaultValue: 2,
			inputType: 'number',
			label: 'End Temperature',
			placeholder: 'Enter end temperature',
			help: 'temperature at the end of calibration'
		},
		{
			argName: 'warmup',
			defaultValue: 0.2,
			inputType: 'number',
			label: 'Warmup Period',
			placeholder: 'Enter warmup period',
			help: 'in the warmup period no regularization is applied'
		},
		{
			argName: 'lr',
			defaultValue: 4e-5,
			inputType: 'number',
			label: 'Learning Rate for LSQ',
			placeholder: 'Enter learning rate for LSQ',
			help: 'learning rate for LSQ'
		},
		{
			argName: 'init_wmode',
			defaultValue: 'mse',
			inputType: 'dropdown',
			label: 'Initialization Mode for Weight',
			placeholder: 'Select initialization mode for weight',
			help: 'init opt mode for weight',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'init_amode',
			defaultValue: 'mse',
			inputType: 'dropdown',
			label: 'Initialization Mode for Activation',
			placeholder: 'Select initialization mode for activation',
			help: 'init opt mode for activation',
			options: [
				{ value: 'minmax', viewValue: 'MinMax' },
				{ value: 'mse', viewValue: 'MSE' },
				{ value: 'minmax_scale', viewValue: 'MinMax Scale' }
			]
		},
		{
			argName: 'order',
			defaultValue: 'before',
			inputType: 'dropdown',
			label: 'Quantization Order',
			placeholder: 'Select quantization order',
			help: 'order about activation compare to weight',
			options: [
				{ value: 'before', viewValue: 'Before' },
				{ value: 'after', viewValue: 'After' },
				{ value: 'together', viewValue: 'Together' }
			]
		},
		{
			argName: 'prob',
			defaultValue: 1.0,
			inputType: 'number',
			label: 'Probability',
			placeholder: 'Enter probability',
			help: 'probability'
		},
		{
			argName: 'input_prob',
			defaultValue: 1.0,
			inputType: 'number',
			label: 'Input Probability',
			placeholder: 'Enter input probability',
			help: 'input probability'
		}
	],
	BRECQ: [
		{
			argName: 'seed',
			defaultValue: 1005,
			inputType: 'number',
			label: 'Seed',
			placeholder: 'Enter random seed',
			help: 'Random seed for results reproduction'
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
			help: 'Mini-batch size for data loader'
		},
		{
			argName: 'workers',
			defaultValue: 4,
			inputType: 'number',
			label: 'Workers',
			placeholder: 'Enter number of workers',
			help: 'Number of workers for data loader'
		},
		{
			argName: 'n_bits_w',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Weight Quantization',
			placeholder: 'Enter bitwidth for weight quantization',
			help: 'Bitwidth for weight quantization'
		},

		{
			argName: 'n_bits_a',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Activation Quantization',
			placeholder: 'Enter bitwidth for activation quantization',
			help: 'Bitwidth for activation quantization'
		},
		{
			argName: 'num_samples',
			defaultValue: 1024,
			inputType: 'number',
			label: 'Calibration Dataset Size',
			placeholder: 'Enter size of the calibration dataset',
			help: 'Size of the calibration dataset'
		},
		{
			argName: 'iters_w',
			defaultValue: 20000,
			inputType: 'number',
			label: 'Iterations for AdaRound',
			placeholder: 'Enter number of iterations for AdaRound',
			help: 'Number of iteration for adaround'
		},
		{
			argName: 'weight',
			defaultValue: 0.01,
			inputType: 'number',
			label: 'Weight of Rounding Cost',
			placeholder: 'Enter weight of rounding cost',
			help: 'Weight of rounding cost vs the reconstruction loss.'
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
			help: 'Temperature at the beginning of calibration'
		},
		{
			argName: 'b_end',
			defaultValue: 2,
			inputType: 'number',
			label: 'End Temperature',
			placeholder: 'Enter end temperature',
			help: 'Temperature at the end of calibration'
		},
		{
			argName: 'warmup',
			defaultValue: 0.2,
			inputType: 'number',
			label: 'Warmup Period',
			placeholder: 'Enter warmup period',
			help: 'In the warmup period no regularization is applied'
		},
		{
			argName: 'lr',
			defaultValue: 4e-5,
			inputType: 'number',
			label: 'Learning Rate for LSQ',
			placeholder: 'Enter learning rate for LSQ',
			help: 'Learning rate for LSQ'
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
			type: 'bool',
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
			help: 'Order about activation compare to weight',
			options: [
				{ value: 'before', viewValue: 'Before' },
				{ value: 'after', viewValue: 'After' },
				{ value: 'together', viewValue: 'Together' }
			]
		},
		{
			argName: 'prob',
			defaultValue: 1.0,
			inputType: 'number',
			label: 'Probability',
			placeholder: 'Enter probability',
			help: 'Probability'
		},
		{
			argName: 'input_prob',
			defaultValue: 1.0,
			inputType: 'number',
			label: 'Input Probability',
			placeholder: 'Enter input probability',
			help: 'Input probability'
		}
	],
	MINMAXPTQ: [
		{
			argName: 'seed',
			defaultValue: 1005,
			inputType: 'number',
			label: 'Seed',
			placeholder: 'Enter random seed',
			help: 'Random seed for results reproduction'
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
			help: 'Mini-batch size for data loader'
		},
		{
			argName: 'workers',
			defaultValue: 4,
			inputType: 'number',
			label: 'Workers',
			placeholder: 'Enter number of workers',
			help: 'Number of workers for data loader'
		},
		{
			argName: 'n_bits_w',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Weights',
			placeholder: 'Enter bitwidth for weights',
			help: 'Bitwidth for weight quantization'
		},

		{
			argName: 'n_bits_a',
			defaultValue: 4,
			inputType: 'number',
			label: 'Bitwidth for Activations',
			placeholder: 'Enter bitwidth for activations',
			help: 'Bitwidth for activation quantization'
		},
		{
			argName: 'num_samples',
			defaultValue: 1024,
			inputType: 'number',
			label: 'Number of Samples',
			placeholder: 'Enter number of calibration samples',
			help: 'Size of the calibration dataset'
		},
		{
			argName: 'iters_w',
			defaultValue: 20000,
			inputType: 'number',
			label: 'Iterations for Weight Calibration',
			placeholder: 'Enter number of iterations for weight calibration',
			help: 'Number of iteration for adaround'
		},
		{
			argName: 'weight',
			defaultValue: 0.01,
			inputType: 'number',
			label: 'Weight of Rounding Cost',
			placeholder: 'Enter weight of rounding cost',
			help: 'Weight of rounding cost vs the reconstruction loss.'
		},
		{
			argName: 'b_start',
			defaultValue: 20,
			inputType: 'number',
			label: 'Start Temperature',
			placeholder: 'Enter start temperature for calibration',
			help: 'Temperature at the beginning of calibration'
		},
		{
			argName: 'b_end',
			defaultValue: 2,
			inputType: 'number',
			label: 'End Temperature',
			placeholder: 'Enter end temperature for calibration',
			help: 'Temperature at the end of calibration'
		},
		{
			argName: 'warmup',
			defaultValue: 0.2,
			inputType: 'number',
			label: 'Warmup Period',
			placeholder: 'Enter warmup period',
			help: 'In the warmup period no regularization is applied'
		},
		{
			argName: 'lr',
			defaultValue: 4e-5,
			inputType: 'number',
			label: 'Learning Rate for LSQ',
			placeholder: 'Enter learning rate for LSQ',
			help: 'Learning rate for LSQ'
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
			inputType: 'number',
			label: 'Probability',
			placeholder: 'Enter probability',
			help: 'Probability'
		},
		{
			argName: 'input_prob',
			defaultValue: 1.0,
			inputType: 'number',
			label: 'Input Probability',
			placeholder: 'Enter input probability',
			help: 'Input probability'
		}
	]
};

const PRUNING_PARAMETERS = {
	IMP: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'Learning rate'
		},
		{
			argName: 'epochs',
			defaultValue: 2,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'Number of epochs for each training period'
		},
		{
			argName: 'pruning_times',
			defaultValue: 3,
			inputType: 'number',
			label: 'Pruning Times',
			placeholder: 'Enter pruning times',
			help: 'Set this to 1 if omp is applied'
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.2,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'Pruning ratio'
		},
		{
			argName: 'rewinding_epoch',
			defaultValue: 1,
			inputType: 'number',
			label: 'Rewinding Epoch',
			placeholder: 'Enter rewinding epoch',
			help: 'Rewinding epoch'
		}
	],
	IPG: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'The learning rate for the model training.',
			validators: {
				required: true,
				min: 0.001,
				max: 1
			}
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'The ratio of parameters to prune.',
			validators: {
				required: true,
				min: 0,
				max: 1
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
			help: 'The device to use for training the model.',
			validators: {
				required: true
			}
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Accuracy',
			placeholder: 'Enter best accuracy',
			help: 'The best test accuracy achieved so far.',
			validators: {
				required: false,
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
				required: true,
				min: 0
			}
		}
	],
	IPM: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'learning rate'
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'pruning ratio'
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'number of epochs'
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'dropdown',
			label: 'Device',
			placeholder: 'Select device',
			help: 'device to use',
			options: [
				{
					value: 'cuda',
					viewValue: 'CUDA'
				},
				{
					value: 'cpu',
					viewValue: 'CPU'
				}
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'best test accuracy'
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'start epoch'
		}
	],
	IPR: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'learning rate'
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'pruning ratio'
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'number of epochs'
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'dropdown',
			label: 'Device',
			placeholder: 'Select device',
			help: 'device to use',
			options: [
				{
					value: 'cuda',
					viewValue: 'CUDA'
				},
				{
					value: 'cpu',
					viewValue: 'CPU'
				}
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'best test accuracy'
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'start epoch'
		}
	],
	IPS: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'learning rate'
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'pruning ratio'
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'number of epochs'
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'dropdown',
			label: 'Device',
			placeholder: 'Select device',
			help: 'device to use',
			options: [
				{
					value: 'cuda',
					viewValue: 'CUDA'
				},
				{
					value: 'cpu',
					viewValue: 'CPU'
				}
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'best test accuracy'
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'start epoch'
		}
	],
	IPSY: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'learning rate'
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.99,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'pruning ratio'
		},
		{
			argName: 'epochs',
			defaultValue: 1,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'number of epochs'
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'dropdown',
			label: 'Device',
			placeholder: 'Select device',
			help: 'device to use',
			options: [
				{
					value: 'cuda',
					viewValue: 'CUDA'
				},
				{
					value: 'cpu',
					viewValue: 'CPU'
				}
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'best test accuracy'
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'start epoch'
		}
	],
	OMP: [
		{
			argName: 'lr',
			defaultValue: 0.1,
			inputType: 'number',
			label: 'Learning Rate',
			placeholder: 'Enter learning rate',
			help: 'learning rate'
		},
		{
			argName: 'epochs',
			defaultValue: 2,
			inputType: 'number',
			label: 'Number of Epochs',
			placeholder: 'Enter number of epochs',
			help: 'number of epochs for each training period'
		},
		{
			argName: 'device',
			defaultValue: 'cpu',
			inputType: 'dropdown',
			label: 'Device',
			placeholder: 'Select device',
			help: 'device to use',
			options: [
				{
					value: 'cuda',
					viewValue: 'CUDA'
				},
				{
					value: 'cpu',
					viewValue: 'CPU'
				}
			]
		},
		{
			argName: 'best_acc',
			defaultValue: 0,
			inputType: 'number',
			label: 'Best Test Accuracy',
			placeholder: 'Enter best test accuracy',
			help: 'best test accuracy'
		},
		{
			argName: 'start_epoch',
			defaultValue: 0,
			inputType: 'number',
			label: 'Start Epoch',
			placeholder: 'Enter start epoch',
			help: 'start epoch'
		},
		{
			argName: 'pruning_times',
			defaultValue: 2,
			inputType: 'number',
			label: 'Pruning Times',
			placeholder: 'Enter number of pruning times',
			help: 'number of pruning times'
		},
		{
			argName: 'pruning_ratio',
			defaultValue: 0.2,
			inputType: 'number',
			label: 'Pruning Ratio',
			placeholder: 'Enter pruning ratio',
			help: 'pruning ratio'
		},
		{
			argName: 'rewinding_epoch',
			defaultValue: 1,
			inputType: 'number',
			label: 'Rewinding Epoch',
			placeholder: 'Enter rewinding epoch',
			help: 'rewinding epoch'
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
			help: 'Number of epochs for l1-sparse unlearning'
		},
		{
			argName: 'save-dir',
			defaultValue: 'checkpoint/unlearn',
			inputType: 'text',
			label: 'Save Directory',
			placeholder: 'Enter save directory',
			help: 'Specifies the directory where the model checkpoints will be saved.'
		},
		{
			argName: 'mask',
			defaultValue: 'checkpoint/ckpt.pth',
			inputType: 'text',
			label: 'Pretrained Model Path',
			placeholder: 'Enter pretrained model path',
			help: 'Path to the pretrained model that will be used as a starting point for unlearning.'
		},
		{
			argName: 'num-indexes-to-replace',
			defaultValue: 4500,
			inputType: 'number',
			label: 'Number of Indexes to Replace',
			placeholder: 'Enter number of indexes to replace',
			help: 'Defines how many indexes (data points) will be replaced during the unlearning process.'
		},
		{
			argName: 'class_to_replace',
			defaultValue: 0,
			inputType: 'number',
			label: 'Class to Forget',
			placeholder: 'Enter class to forget',
			help: 'Identifies the specific class label that the model should selectively forget.'
		}
	]
};

const ALGORITHM_PARAMETERS = {
	...QUANTIZATION_PARAMETERS,
	...PRUNING_PARAMETERS,
	...MACHINE_UNLEARNING_PARAMETERS
};

module.exports = ALGORITHM_PARAMETERS;
