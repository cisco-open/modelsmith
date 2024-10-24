//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Client } from '../../../services/client/client';
import { GetStatistics } from '../../../services/client/serviceCalls/statistics/get-statistics';
import { CLIENT } from '../../../services/services.tokens';
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
