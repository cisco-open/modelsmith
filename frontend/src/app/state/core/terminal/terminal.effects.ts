import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetLatestMessages } from '../../../services/client/serviceCalls/terminal/get-latest-messages';
import { PostClearHistory } from '../../../services/client/serviceCalls/terminal/post-clear-history';
import { TerminalActions } from './terminal.actions';

@Injectable()
export class TerminalEffects {
	getLatestMessages$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TerminalActions.getLatestMessages),
			switchMap(() =>
				this.apiClient.serviceCall(new GetLatestMessages()).pipe(
					map((messages: any) => TerminalActions.getLatestMessagesSuccess({ messages })),
					catchError((error) => of(TerminalActions.getLatestMessagesFailure({ error })))
				)
			)
		)
	);

	postClearHistory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TerminalActions.postClearHistory),
			switchMap(() =>
				this.apiClient.serviceCall(new PostClearHistory()).pipe(
					map(() => TerminalActions.postClearHistorySuccess()),
					catchError((error) => of(TerminalActions.postClearHistoryFailure({ error })))
				)
			)
		)
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
