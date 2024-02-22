import { createReducer, on } from '@ngrx/store';
import { TerminalActions } from './terminal.actions';
import { TerminalState } from './terminal.state';

export const initialState: TerminalState = {
	messages: [],
	error: null
};

export const terminalReducer = createReducer(
	initialState,
	on(TerminalActions.getLatestMessagesSuccess, (state, { messages }) => {
		return {
			...state,
			messages,
			error: null
		};
	}),
	on(TerminalActions.getLatestMessagesFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(TerminalActions.postClearHistoryFailure, (state, { error }) => ({
		...state,
		error
	}))
);
