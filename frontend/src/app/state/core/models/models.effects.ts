//   Copyright 2024 Cisco Systems, Inc.

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
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Client } from '../../../services/client/client';
import { GetCurrentOrPreviousSelectedModel } from '../../../services/client/serviceCalls/models/get-current-or-previous-selected-model';
import { GetModelMetadata } from '../../../services/client/serviceCalls/models/get-model-metadata';
import { GetModelsList } from '../../../services/client/serviceCalls/models/get-models-list';
import { CLIENT } from '../../../services/services.tokens';
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
			switchMap((action) =>
				this.apiClient.serviceCall(new GetCurrentOrPreviousSelectedModel(action.algorithmType)).pipe(
					map((modelObj: any) => ModelsActions.getCurrentOrPreviousSelectedModelSuccess({ model: modelObj.model })),
					catchError((error) => of(ModelsActions.getCurrentOrPreviousSelectedModelFailure({ error })))
				)
			)
		)
	);

	getModelMetadata$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ModelsActions.getModelMetadata),
			switchMap((action) => {
				const { algorithmType, modelName } = action;
				return this.apiClient.serviceCall(new GetModelMetadata(algorithmType, modelName)).pipe(
					map((metadata: any) => ModelsActions.getModelMetadataSuccess({ metadata })),
					catchError((error) => of(ModelsActions.getModelMetadataFailure({ error })))
				);
			})
		)
	);
}
