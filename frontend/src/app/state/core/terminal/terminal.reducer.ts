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
import { TerminalActions } from './terminal.actions';
import { TerminalState } from './terminal.state';

export const initialState: TerminalState = {
	terminalHistory: '',
	error: null
};

export const terminalReducer = createReducer(
	initialState,
	on(TerminalActions.getTerminalHistorySuccess, (state, { terminalHistory }) => {
		return {
			...state,
			terminalHistory,
			error: null
		};
	}),
	on(TerminalActions.getTerminalHistoryFailure, (state, { error }) => ({
		...state,
		error
	}))
);
