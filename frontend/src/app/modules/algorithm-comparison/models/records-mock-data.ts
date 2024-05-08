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
		recordName: 'Test',
		recordFilename: '2024_04_16_09:50:47_IPM_ResNet18',
		record: {
			parameters: {
				lr: 0.1,
				pruning_ratio: 0.99,
				epochs: 1,
				device: 'cpu',
				best_acc: 0,
				start_epoch: 0,
				arch: 'ResNet18'
			},
			statistics: {
				duration_seconds: 279.18170952796936
			},
			lastRunTestingAccuracyData: [
				62, 53, 53, 52.5, 51.4, 53, 53, 52, 51.556, 52.9, 53, 53.167, 53, 52.714, 52.467, 52.25, 52.412, 52.111, 52.789,
				52.75, 52.667, 52.864, 52.913, 53.042, 53.2, 52.808, 52.889, 52.75, 52.966, 52.9, 53.032, 53.156, 53.424,
				53.206, 53.171, 53.083, 52.865, 52.974, 53.051, 53.05, 53.049, 53.143, 53.256, 53.409, 53.4, 53.239, 53.234,
				53.312, 53.388, 53.46, 53.569, 53.577, 53.491, 53.37, 53.327, 53.339, 53.439, 53.483, 53.39, 53.417, 53.262,
				53.242, 53.365, 53.391, 53.292, 53.288, 53.224, 53.191, 53.203, 53.157, 53.141, 53.264, 53.301, 53.284, 53.2,
				53.276, 53.312, 53.308, 53.367, 53.4, 53.432, 53.366, 53.313, 53.167, 53.141, 53.081, 53.046, 53.011, 52.978,
				53.022, 53.055, 53.098, 53.215, 53.223, 53.295, 53.312, 53.309, 53.316, 53.263, 53.27
			]
		},
		chartColors: {
			backgroundColor: 'rgba(0,255,108,0.2)',
			borderColor: 'rgba(155,196,15,1)'
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
			backgroundColor: 'rgba(13,57,119,0.2)',
			borderColor: 'rgba(240,79,13,1)'
		}
	}
];
