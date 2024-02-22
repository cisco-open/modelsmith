import { createReducer, on } from '@ngrx/store';
import { ParameterActions } from './parameters.actions';
import { ParametersState } from './parameters.state';

export const initialState: ParametersState = {};

export const parameterReducer = createReducer(
	initialState,
	on(ParameterActions.loadParameters, (state, { arg }) => ({
		...state,
		[arg]: {
			...state[arg],
			loaded: false,
			error: null
		}
	})),
	on(ParameterActions.loadParametersSuccess, (state, { arg, parameters }) => ({
		...state,
		[arg]: {
			data: parameters,
			error: null,
			loaded: true
		}
	})),
	on(ParameterActions.loadParametersFailure, (state, { arg, error }) => ({
		...state,
		[arg]: {
			...state[arg],
			error: error,
			loaded: true
		}
	}))
);
