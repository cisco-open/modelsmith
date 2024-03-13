import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetCurrentOrPreviousSelectedModel } from '../../../services/client/serviceCalls/models/get-current-or-previous-selected-model';
import { GetModelsList } from '../../../services/client/serviceCalls/models/get-models-list';
import { ModelsActions } from './models.actions';

@Injectable()
export class ModelsEffects {
	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}

	loadModels$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ModelsActions.getModelsList),
			switchMap((action) => {
				const { algorithmType } = action;
				return this.apiClient.serviceCall(new GetModelsList(algorithmType)).pipe(
					map((models: any) => ModelsActions.getModelsListSuccess({ algorithmType, models })),
					catchError((error) => of(ModelsActions.getModelsListFailure({ error })))
				);
			})
		)
	);

	getCurrentOrPreviousSelectedModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ModelsActions.getCurrentOrPreviousSelectedModel),
			switchMap((action) => {
				const { algorithmType } = action;
				return this.apiClient.serviceCall(new GetCurrentOrPreviousSelectedModel(algorithmType)).pipe(
					map((model: any) => ModelsActions.getCurrentOrPreviousSelectedModelSuccess({ model })),
					catchError((error) => of(ModelsActions.getCurrentOrPreviousSelectedModelFailure({ error })))
				);
			})
		)
	);
}
