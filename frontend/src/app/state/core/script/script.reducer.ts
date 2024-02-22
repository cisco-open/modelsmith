import { createReducer, on } from '@ngrx/store';
import { ScriptStatusEnum } from '../../../modules/model-compression/models/enums/script-status.enum';
import { ScriptActions } from './script.actions';
import { ScriptState } from './script.state';

export const initialState: ScriptState = {
	scriptStatus: null,
	scriptDetails: null,
	error: null
};

export const scriptReducer = createReducer(
	initialState,
	on(ScriptActions.callScriptSuccess, (state) => ({
		...state,
		error: null
	})),
	on(ScriptActions.callScriptFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ScriptActions.getCurrentOrLastActiveScriptDetailsSuccess, (state, { scriptDetails }) => ({
		...state,
		scriptDetails,
		error: null
	})),
	on(ScriptActions.getCurrentOrLastActiveScriptDetailsFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ScriptActions.fetchScriptStatusSuccess, (state, { status, activeScript }) => ({
		...state,
		scriptStatus: status as ScriptStatusEnum,
		scriptDetails: activeScript,
		error: null
	})),
	on(ScriptActions.fetchScriptStatusFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ScriptActions.updateScriptStatus, (state, { status }) => ({
		...state,
		scriptStatus: status as ScriptStatusEnum,
		error: null
	})),
	on(ScriptActions.stopScript, (state) => ({
		...state,
		error: null
	})),
	on(ScriptActions.stopScriptSuccess, (state) => ({
		...state,
		error: null
	})),
	on(ScriptActions.stopScriptFailure, (state, { error }) => ({
		...state,
		error
	}))
);
