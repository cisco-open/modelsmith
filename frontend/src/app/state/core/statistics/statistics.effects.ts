import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetStatistics } from '../../../services/client/serviceCalls/statistics/get-statistics';
import { StatisticsActions } from './statistics.actions';

@Injectable()
export class StatisticsEffects {
	getStatistics = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticsActions.getStatistics),
			switchMap(() =>
				this.apiClient.serviceCall(new GetStatistics()).pipe(
					map((statistics: any) => StatisticsActions.getStatisticsSuccess({ statistics })),
					catchError((error) => of(StatisticsActions.getStatisticsFailure({ error })))
				)
			)
		)
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
