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

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChartTypeEnum } from '../../../modules/shared/models/enums/chart-type.enum';
import {
	MachineUnlearningProgress,
	PruningProgress,
	QuantizationProgress
} from '../../../services/client/models/charts/chart-data.interface-dto';
import { ChartConfigurationSettingsDictionary } from '../../../services/client/models/charts/chart-settings.interface-dto';

export const ChartActions = createActionGroup({
	source: '[Core -> Charts]',
	events: {
		'Get Current Pruning Chart Data': emptyProps(),
		'Get Current Pruning Chart Data Success': props<{
			pruningProgress: PruningProgress[];
		}>(),
		'Get Current Pruning Chart Data Failure': props<{ error: any }>(),
		'Get Current Quantization Chart Data': emptyProps(),
		'Get Current Quantization Chart Data Success': props<{
			quantizationProgress: QuantizationProgress;
		}>(),
		'Get Current Quantization Chart Data Failure': props<{ error: any }>(),
		'Get Current Machine Unlearning Chart Data': emptyProps(),
		'Get Current Machine Unlearning Chart Data Success': props<{
			machineUnlearningProgress: MachineUnlearningProgress;
		}>(),
		'Get Current Machine Unlearning Chart Data Failure': props<{ error: any }>(),
		'Get Chart Configuration Settings': props<{ chartTypes: ChartTypeEnum[] }>(),
		'Get Chart Configuration Settings Success': props<{ settings: ChartConfigurationSettingsDictionary }>(),
		'Get Chart Configuration Settings Failure': props<{ error: any }>()
	}
});
