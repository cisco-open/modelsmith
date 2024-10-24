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

import { createReducer, on } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';
import { ModelsActions } from './models.actions';
import { ModelsState } from './models.state';

export const initialState: ModelsState = {
	quantizationModels: [],
	pruningModels: [],
	machineUnlearningModels: [],
	awqModels: [],
	currentModel: '',
	modelMetadata: {},
	error: undefined
};

export const modelsReducer = createReducer(
	initialState,
	on(ModelsActions.getModelsListSuccess, (state, { algorithmType, models }) => {
		switch (algorithmType) {
			case AlgorithmType.QUANTIZATION:
				return { ...state, quantizationModels: models, error: undefined };
			case AlgorithmType.PRUNING:
				return { ...state, pruningModels: models, error: undefined };
			case AlgorithmType.MACHINE_UNLEARNING:
				return { ...state, machineUnlearningModels: models, error: undefined };
			case AlgorithmType.AWQ:
				return { ...state, awqModels: models, error: undefined };
			default:
				return state;
		}
	}),
	on(ModelsActions.getModelsListFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ModelsActions.getCurrentOrPreviousSelectedModelSuccess, (state, { model }) => ({
		...state,
		currentModel: model
	})),
	on(ModelsActions.getCurrentOrPreviousSelectedModelFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ModelsActions.getModelMetadataSuccess, (state, { metadata }) => ({
		...state,
		modelMetadata: metadata,
		error: undefined
	})),
	on(ModelsActions.getModelMetadataFailure, (state, { error }) => ({
		...state,
		modelMetadata: {},
		error
	}))
);
