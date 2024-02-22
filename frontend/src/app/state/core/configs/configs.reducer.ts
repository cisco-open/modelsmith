import { createReducer, on } from '@ngrx/store';
import { ConfigActions } from './configs.actions';
import { ConfigsState } from './configs.state';

export const initialState: ConfigsState = {
	defaultMode: undefined,
	currentMode: undefined
};

export const configsReducer = createReducer(
	initialState,
	on(ConfigActions.setDefaultMode, (state, { mode }) => ({ ...state, defaultMode: mode })),
	on(ConfigActions.setCurrentMode, (state, { mode }) => ({ ...state, currentMode: mode }))
);
