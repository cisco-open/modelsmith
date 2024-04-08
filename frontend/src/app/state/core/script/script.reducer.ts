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

import { createReducer, on } from '@ngrx/store';
import { ScriptStatusEnum } from '../../../modules/model-compression/models/enums/script-status.enum';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from './script.actions';
import { ScriptState } from './script.state';

export const initialState: ScriptState = {
	scriptStatus: ScriptStatusEnum.NOT_RUNNING,
	scriptDetails: {} as ScriptDetails,
	error: ''
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
	on(ScriptActions.fetchScriptStatusSuccess, (state, { status }) => ({
		...state,
		scriptStatus: status as ScriptStatusEnum,
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
