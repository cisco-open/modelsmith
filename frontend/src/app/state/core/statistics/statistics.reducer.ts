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

import { createReducer, on } from '@ngrx/store';
import { KeyValue } from '../../../services/client/models/key-value/key-value.interface-dto';
import { StatisticsActions } from './statistics.actions';
import { StatisticsState } from './statistics.state';

export const initialState: StatisticsState = {
	statistics: {} as KeyValue<string>,
	error: null
};

export const statisticsReducer = createReducer(
	initialState,
	on(StatisticsActions.getStatisticsSuccess, (state, { statistics }) => {
		return {
			...state,
			statistics,
			error: null
		};
	}),
	on(StatisticsActions.getStatisticsFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(StatisticsActions.updateStatistics, (state, { statistics }) => ({
		...state,
		statistics,
		error: null
	}))
);
