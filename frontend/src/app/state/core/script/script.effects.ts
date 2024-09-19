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

import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Client } from '../../../services/client/client';
import { GetCurrentOrLastActiveScriptDetails } from '../../../services/client/serviceCalls/script/get-current-or-last-active-script-details';
import { GetScriptStatus } from '../../../services/client/serviceCalls/script/get-script-status';
import { PostExecutecommand } from '../../../services/client/serviceCalls/script/post-execute-command';
import { PostRunScript } from '../../../services/client/serviceCalls/script/post-run-script';
import { PostStopScript } from '../../../services/client/serviceCalls/script/post-stop-script';
import { CLIENT } from '../../../services/services.tokens';
import { ScriptActions } from './script.actions';

@Injectable()
export class ScriptEffects {
	callScript$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ScriptActions.callScript),
			switchMap(({ configs }) =>
				this.apiClient.serviceCall(new PostRunScript(configs)).pipe(
					switchMap(() => {
						return [ScriptActions.callScriptSuccess(), ScriptActions.fetchScriptStatus()];
					}),
					catchError((error) => of(ScriptActions.callScriptFailure({ error })))
				)
			)
		)
	);

	fetchScriptStatus$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ScriptActions.fetchScriptStatus),
			switchMap(() =>
				this.apiClient.serviceCall(new GetScriptStatus()).pipe(
					map((response: any) => {
						const { status } = response;
						return ScriptActions.fetchScriptStatusSuccess({ status });
					}),
					catchError((error) => of(ScriptActions.fetchScriptStatusFailure({ error })))
				)
			)
		)
	);

	getCurrentOrLastActiveScriptDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ScriptActions.getCurrentOrLastActiveScriptDetails),
			switchMap(() =>
				this.apiClient.serviceCall(new GetCurrentOrLastActiveScriptDetails()).pipe(
					map((response: any) => ScriptActions.getCurrentOrLastActiveScriptDetailsSuccess({ scriptDetails: response })),
					catchError((error) => of(ScriptActions.fetchScriptStatusFailure({ error })))
				)
			)
		)
	);

	stopScript$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ScriptActions.stopScript),
			switchMap(() =>
				this.apiClient.serviceCall(new PostStopScript()).pipe(
					map(() => ScriptActions.stopScriptSuccess()),
					catchError((error) => of(ScriptActions.stopScriptFailure({ error })))
				)
			)
		)
	);

	executeCommand$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ScriptActions.executeCommand),
			switchMap(({ command }) =>
				this.apiClient.serviceCall(new PostExecutecommand(command)).pipe(
					map(() => ScriptActions.executeCommandSuccess()),
					catchError((error) => of(ScriptActions.executeCommandFailure({ error })))
				)
			)
		)
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
