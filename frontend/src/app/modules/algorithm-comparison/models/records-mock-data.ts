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
		recordName: 'First run',
		recordFilename: '2024_04_16_09:44:06_IPG_ResNet18',
		record: {
			parameters: {
				lr: 0.1,
				epochs: 2,
				pruning_times: 3,
				pruning_ratio: 0.2,
				rewinding_epoch: 1,
				best_acc: 0,
				save_dir: '/home/ipop/modelsmith/examples_pruning/models_checkpoints',
				arch: 'ResNet18'
			},
			statistics: {
				duration_seconds: 268.2938714027405
			},
			lastRunTestingAccuracyData: [
				74, 69, 66.667, 67.25, 68.2, 69.167, 69.143, 67.5, 67.222, 67.2, 67.364, 67.917, 67.923, 67.786, 67.733, 67.188,
				67.353, 67.444, 67.737, 67.65, 67.619, 67.682, 67.783, 67.833, 67.96, 67.577, 67.667, 67.75, 67.931, 68.067,
				68.29, 68.344, 68.242, 68.118, 67.914, 68.028, 67.784, 67.737, 68.026, 68, 68.073, 68.071, 68.047, 68.159,
				68.111, 68.065, 68.085, 68.021, 68.102, 68.22, 68.255, 68.365, 68.434, 68.352, 68.327, 68.357, 68.386, 68.517,
				68.373, 68.4, 68.295, 68.274, 68.27, 68.297, 68.354, 68.333, 68.343, 68.265, 68.232, 68.129, 68.127, 68.25,
				68.329, 68.419, 68.387, 68.382, 68.416, 68.423, 68.354, 68.3, 68.37, 68.341, 68.386, 68.286, 68.294, 68.337,
				68.23, 68.17, 68.18, 68.178, 68.187, 68.217, 68.161, 68.117, 68.137, 68.208, 68.268, 68.214, 68.172, 68.16
			]
		}
	},
	{
		recordName: 'Record 2',
		recordFilename: '2024_04_16_10:12:57_IMP_ResNet18',
		record: {
			parameters: {
				lr: 0.1,
				epochs: 1,
				pruning_times: 1,
				pruning_ratio: 0.2,
				rewinding_epoch: 1,
				best_acc: 0,
				save_dir: '/home/ipop/modelsmith/examples_pruning/models_checkpoints',
				arch: 'ResNet18'
			},
			statistics: {
				duration_seconds: 46.21076583862305
			},
			lastRunTestingAccuracyData: [
				60, 54.5, 53, 53, 53.2, 53.5, 53.714, 53.75, 54, 54.9, 55.364, 55, 54.769, 54.857, 54.933, 54.875, 55.353,
				55.056, 55.421, 55.25, 55.571, 55.182, 55.13, 55.042, 55, 54.808, 54.667, 54.607, 54.586, 54.8, 55.065, 55.031,
				55.061, 55.059, 55.029, 55.194, 54.973, 54.763, 54.872, 54.85, 54.902, 54.952, 55.116, 55.136, 55.222, 55.239,
				55.34, 55.417, 55.49, 55.54, 55.451, 55.346, 55.396, 55.37, 55.273, 55.321, 55.368, 55.552, 55.458, 55.467,
				55.492, 55.435, 55.476, 55.422, 55.354, 55.364, 55.328, 55.25, 55.174, 55.129, 55.099, 55.25, 55.274, 55.324,
				55.347, 55.447, 55.455, 55.423, 55.506, 55.562, 55.642, 55.573, 55.602, 55.583, 55.553, 55.57, 55.529, 55.602,
				55.607, 55.622, 55.648, 55.739, 55.774, 55.67, 55.674, 55.74, 55.763, 55.724, 55.667, 55.7
			]
		}
	},
	{
		recordName: 'Another run',
		recordFilename: '2024_04_17_08:33:13_IMP_ResNet18',
		record: {
			parameters: {
				lr: 0.1,
				epochs: 2,
				pruning_times: 3,
				pruning_ratio: 0.2,
				rewinding_epoch: 1,
				best_acc: 0,
				save_dir: '/home/ipop/modelsmith/examples_pruning/models_checkpoints',
				arch: 'ResNet18'
			},
			statistics: {
				duration_seconds: 268.1203279495239
			},
			lastRunTestingAccuracyData: [
				74, 71.5, 68.333, 69.75, 70.2, 70.667, 69.714, 68.625, 68.667, 69, 69.636, 70.25, 70, 69.5, 69.733, 69.5,
				69.588, 69.556, 69.579, 69.4, 69.19, 69.273, 69.435, 69.417, 69.28, 69, 68.889, 69.179, 69.31, 69.233, 69.29,
				69.281, 69.333, 69.206, 69, 69.139, 68.946, 68.921, 69.103, 69.15, 69.146, 69.143, 69.302, 69.409, 69.356,
				69.152, 69.234, 69.354, 69.449, 69.42, 69.294, 69.269, 69.472, 69.389, 69.327, 69.268, 69.246, 69.345, 69.271,
				69.25, 69.115, 69.129, 69.143, 69.203, 69.138, 69.136, 69.134, 69.088, 69.029, 68.971, 69, 69.056, 69.164,
				69.203, 69.187, 69.263, 69.195, 69.141, 69.114, 69.1, 69.111, 69.134, 69.157, 69.119, 69.129, 69.174, 69.103,
				69.08, 69.056, 69.056, 69.132, 69.163, 69.118, 69.074, 69.126, 69.208, 69.309, 69.235, 69.212, 69.25
			]
		}
	}
];
