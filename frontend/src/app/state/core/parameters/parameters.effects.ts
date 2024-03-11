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
