import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetModels } from '../../../services/client/serviceCalls/models/get-models';
import { ModelActions } from './models.actions';
import { selectModels } from './models.selector';

@Injectable()
export class ModelsEffects {
	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions,
		private store: Store
	) {}

	loadModels$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ModelActions.loadModels),
			withLatestFrom(this.store.select(selectModels)), // Adjust the selector as needed
			filter(([action, models]) => !models || models.length === 0),
			switchMap(() => {
				return this.apiClient.serviceCall(new GetModels()).pipe(
					map((models: any) => ModelActions.loadModelsSuccess({ models })),
					catchError((error) => of(ModelActions.loadModelsFailure({ error })))
				);
			})
		)
	);
}
