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

import { createSelector } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';
import { selectCoreState } from '../core.selector';

export const selectModelsByType = (algorithmType: AlgorithmType) =>
	createSelector(selectCoreState, (state) => {
		switch (algorithmType) {
			case AlgorithmType.QUANTIZATION:
				return state.models.quantizationModels;
			case AlgorithmType.PRUNING:
				return state.models.pruningModels;
			case AlgorithmType.MACHINE_UNLEARNING:
				return state.models.machineUnlearningModels;
			default:
				return undefined;
		}
	});

export const selectCurrentModel = createSelector(selectCoreState, (state) => state.models.currentModel);

export const selectModelMetadata = createSelector(selectCoreState, (state) => state.models.modelMetadata);
