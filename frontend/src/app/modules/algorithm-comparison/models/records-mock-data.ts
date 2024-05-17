//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

export const recordsMock: any = [
	{
		recordName: 'IMP_VGG11',
		recordFilename: '2024_05_10_06:12:23_IMP_VGG11',
		record: {
			parameters: {
				lr: 0.1,
				epochs: 2,
				pruning_times: 3,
				pruning_ratio: 0.2,
				rewinding_epoch: 1,
				best_acc: 0,
				save_dir: '/home/ipop/modelsmith/examples_pruning/models_checkpoints',
				arch: 'VGG11'
			},
			statistics: {
				algorithm_key: 'IMP',
				execution_date: '2024-05-10 06:12:23',
				duration_seconds: 83.97957944869995
			},
			lastRunTestingAccuracyData: [
				59, 57.5, 57.667, 58.75, 58.6, 60, 59, 58.625, 58.444, 58.9, 59.545, 60, 59.692, 59.357, 59.333, 58.688, 59.118,
				59, 59.368, 58.95, 58.905, 59.091, 59.217, 59.417, 59.48, 59.192, 59.444, 59.357, 59.414, 59.367, 59.419,
				59.375, 59.424, 59.441, 59.257, 59.306, 59.108, 59.105, 59.282, 59.475, 59.512, 59.429, 59.628, 59.75, 59.8,
				59.761, 59.787, 59.833, 59.857, 59.88, 59.824, 59.808, 59.717, 59.667, 59.527, 59.464, 59.456, 59.638, 59.593,
				59.617, 59.574, 59.581, 59.619, 59.547, 59.569, 59.515, 59.507, 59.426, 59.406, 59.3, 59.211, 59.236, 59.151,
				59.216, 59.187, 59.158, 59.117, 59.09, 59.076, 59.075, 59.16, 59.146, 59.145, 59.167, 59.224, 59.291, 59.31,
				59.341, 59.303, 59.289, 59.319, 59.435, 59.398, 59.383, 59.432, 59.458, 59.433, 59.367, 59.313, 59.32
			]
		},
		chartColors: {
			backgroundColor: 'rgba(241,196,15,0.2)',
			borderColor: 'rgba(241,196,15,1)'
		}
	},
	{
		recordName: 'IMP_ResNet18',
		recordFilename: '2024_05_07_10:18:01_IMP_ResNet18',
		record: {
			parameters: {
				lr: 0.1,
				epochs: 1,
				pruning_times: 3,
				pruning_ratio: 0.2,
				rewinding_epoch: 1,
				best_acc: 0,
				save_dir: '/home/ipop/modelsmith/examples_pruning/models_checkpoints',
				arch: 'ResNet18'
			},
			statistics: {
				algorithm_key: 'IMP',
				execution_date: '2024-05-07 10:18:01',
				duration_seconds: 134.254967212677
			},
			lastRunTestingAccuracyData: [
				52, 54, 52.667, 54, 54, 53.667, 53.857, 53.875, 54.222, 54.4, 54.273, 54.5, 54.077, 53.714, 53.867, 53.812,
				54.118, 54.167, 54.316, 54.15, 54.381, 54.273, 54.304, 54.458, 54.32, 54.038, 54.222, 54.143, 54.034, 54.167,
				54.419, 54.375, 54.515, 54.559, 54.4, 54.667, 54.514, 54.553, 54.795, 54.6, 54.561, 54.452, 54.419, 54.5,
				54.533, 54.522, 54.681, 54.75, 54.755, 54.92, 54.961, 55.038, 55.057, 54.963, 54.873, 54.929, 55.035, 55.138,
				54.932, 54.867, 54.82, 54.774, 54.778, 54.859, 54.8, 54.864, 54.806, 54.765, 54.739, 54.614, 54.577, 54.611,
				54.726, 54.77, 54.707, 54.763, 54.766, 54.795, 54.785, 54.75, 54.815, 54.793, 54.904, 54.869, 54.906, 54.953,
				54.92, 54.966, 55.022, 54.956, 54.923, 54.978, 55.086, 55.085, 55.168, 55.167, 55.216, 55.133, 55.081, 55.09
			]
		},
		chartColors: {
			backgroundColor: 'rgba(217,176,14,0.2)',
			borderColor: 'rgba(217,176,14,1)'
		}
	}
];
