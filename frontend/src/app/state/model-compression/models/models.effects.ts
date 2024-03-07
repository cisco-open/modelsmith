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
