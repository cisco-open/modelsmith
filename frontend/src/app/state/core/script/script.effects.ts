import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetCurrentOrLastActiveScriptDetails } from '../../../services/client/serviceCalls/script/get-current-or-last-active-script-details';
import { GetScriptStatus } from '../../../services/client/serviceCalls/script/get-script-status';
import { PostRunScript } from '../../../services/client/serviceCalls/script/post-run-script';
import { PostStopScript } from '../../../services/client/serviceCalls/script/post-stop-script';
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

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
