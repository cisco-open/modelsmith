//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

export const ChartTypeEnum = {
	SPARSITY_PRUNING: 'sparsityPruning',
	ACCURACY_PRUNING: 'accuracyPruning',
	ACCURACY_QUANTIZATION: 'accuracyQuantization',
	ACCURACY_MACHINE_UNLEARNING: 'accuracyMachineUnlearning',
	LOSS_QUANTIZATION: 'lossQuantization',
	LOSS_PRUNING: 'lossPruning',
	LOSS_MACHINE_UNLEARNING: 'lossMachineUnlearning',
	TESTING_ACCURACY_CHART: 'testing_accuracyChart',
	TESTING_LOSS_CHART: 'testing_lossChart'
} as const;

export type ChartTypeEnum = (typeof ChartTypeEnum)[keyof typeof ChartTypeEnum];
