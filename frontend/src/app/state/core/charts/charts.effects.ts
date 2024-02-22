import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetChartConfigurationSettings } from '../../../services/client/serviceCalls/charts/get-chart-configuration-settings';
import { GetCurrentMachineUnlearningChartData } from '../../../services/client/serviceCalls/charts/get-current-machine-unlearning-chart-data copy';
import { GetCurrentPruningChartData } from '../../../services/client/serviceCalls/charts/get-current-pruning-chart-data';
import { GetCurrentQuantizationChartData } from '../../../services/client/serviceCalls/charts/get-current-quantization-chart-data';
import { ChartActions } from './charts.actions';

@Injectable()
export class ChartsEffects {
	getCurrentPruningChartData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartActions.getCurrentPruningChartData),
			switchMap(() =>
				this.apiClient.serviceCall(new GetCurrentPruningChartData()).pipe(
					map((pruningProgress: any) => ChartActions.getCurrentPruningChartDataSuccess({ pruningProgress })),
					catchError((error) => of(ChartActions.getCurrentPruningChartDataFailure({ error })))
				)
			)
		)
	);

	getCurrentQuantizationChartData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartActions.getCurrentQuantizationChartData),
			switchMap(() =>
				this.apiClient.serviceCall(new GetCurrentQuantizationChartData()).pipe(
					map((quantizationProgress: any) =>
						ChartActions.getCurrentQuantizationChartDataSuccess({ quantizationProgress })
					),
					catchError((error) => of(ChartActions.getCurrentQuantizationChartDataFailure({ error })))
				)
			)
		)
	);

	getCurrentMachineUnlearningChartData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartActions.getCurrentMachineUnlearningChartData),
			switchMap(() =>
				this.apiClient.serviceCall(new GetCurrentMachineUnlearningChartData()).pipe(
					map((machineUnlearningProgress: any) =>
						ChartActions.getCurrentMachineUnlearningChartDataSuccess({
							machineUnlearningProgress
						})
					),
					catchError((error) => of(ChartActions.getCurrentMachineUnlearningChartDataFailure({ error })))
				)
			)
		)
	);

	getChartConfigurationSettings$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartActions.getChartConfigurationSettings),
			switchMap((action) =>
				this.apiClient.serviceCall(new GetChartConfigurationSettings(action.chartTypes)).pipe(
					map((settings: any) => ChartActions.getChartConfigurationSettingsSuccess({ settings })),
					catchError((error) => of(ChartActions.getChartConfigurationSettingsFailure({ error })))
				)
			)
		)
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
