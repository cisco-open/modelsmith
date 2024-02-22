import { Inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CLIENT } from '../../../app.tokens';
import { Client } from '../../../services/client/client';
import { GetParameters } from '../../../services/client/serviceCalls/parameters/get-parameters';
import { ParameterActions } from './parameters.actions';

@Injectable()
export class ParametersEffects {
	loadParameters$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ParameterActions.loadParameters),
			switchMap(({ arg }) =>
				this.apiClient.serviceCall(new GetParameters(arg)).pipe(
					map((parametersDto: any) => {
						return ParameterActions.loadParametersSuccess({ arg, parameters: parametersDto.parameters });
					}),
					catchError((error) => of(ParameterActions.loadParametersFailure({ arg, error })))
				)
			)
		)
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
