import { createReducer, on } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';
import { ModelsActions } from './models.actions';
import { ModelsState } from './models.state';

export const initialState: ModelsState = {
	quantizationModels: [],
	pruningModels: [],
	machineUnlearningModels: [],
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
			default:
				return state;
		}
	}),
	on(ModelsActions.getModelsListFailure, (state, { error }) => ({
		...state,
		error
	}))
);
