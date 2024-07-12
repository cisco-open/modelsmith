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
import { Client } from '../../../services/client/client';
import { GetRunRecordsFilenames } from '../../../services/client/serviceCalls/run-records/get-run-records-filenames';
import { GetRunRecordsSummarizedData } from '../../../services/client/serviceCalls/run-records/get-run-records-summarized-data';
import { CLIENT } from '../../../services/services.tokens';
import { RunRecordsActions } from './records.actions';

@Injectable()
export class RecordsEffects {
	getRunRecordsFilenames$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RunRecordsActions.getRunRecordsFilenames),
			switchMap((action) => {
				const { algorithmType } = action;
				return this.apiClient.serviceCall(new GetRunRecordsFilenames(algorithmType)).pipe(
					map((files: any) => RunRecordsActions.getRunRecordsFilenamesSuccess({ files })),
					catchError((error) => of(RunRecordsActions.getRunRecordsFilenamesFailure({ error })))
				);
			})
		)
	);

	getRunRecordSummarizedData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RunRecordsActions.getRunRecordSummarizedData),
			switchMap((action) => {
				const { algorithmType, filename } = action;
				return this.apiClient.serviceCall(new GetRunRecordsSummarizedData(algorithmType, filename)).pipe(
					map((record: any) => RunRecordsActions.getRunRecordSummarizedDataSuccess({ record })),
					catchError((error) => of(RunRecordsActions.getRunRecordSummarizedDataFailure({ error })))
				);
			})
		)
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions
	) {}
}
