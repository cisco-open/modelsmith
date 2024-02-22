import { createReducer, on } from '@ngrx/store';
import { ModelActions } from './models.actions';
import { ModelsState } from './models.state';

export const initialState: ModelsState = {
	models: [],
	error: undefined
};

export const modelsReducer = createReducer(
	initialState,
	on(ModelActions.loadModelsSuccess, (state, { models }) => ({
		...state,
		models: [...models],
		error: undefined
	})),
	on(ModelActions.loadModelsFailure, (state, { error }) => ({
		...state,
		error
	}))
);
