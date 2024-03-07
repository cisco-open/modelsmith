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

import { createReducer, on } from '@ngrx/store';
import { ChartActions } from './charts.actions';
import { ChartsState } from './charts.state';

export const initialState: ChartsState = {
	pruningProgress: [],
	machineUnlearningProgress: undefined,
	quantizationProgress: undefined,
	settings: {},
	error: null
};

export const chartsReducer = createReducer(
	initialState,
	on(ChartActions.getCurrentPruningChartDataSuccess, (state, { pruningProgress }) => {
		return {
			...state,
			pruningProgress: pruningProgress,
			machineUnlearningProgress: undefined,
			quantizationProgress: undefined,
			error: null
		};
	}),
	on(ChartActions.getCurrentPruningChartDataFailure, (state, { error }) => ({
		...state,
		pruningProgress: [],
		error
	})),
	on(ChartActions.getCurrentQuantizationChartDataSuccess, (state, { quantizationProgress }) => {
		return {
			...state,
			pruningProgress: [],
			quantizationProgress,
			machineUnlearningProgress: undefined,
			error: null
		};
	}),
	on(ChartActions.getCurrentQuantizationChartDataFailure, (state, { error }) => ({
		...state,
		quantizationProgress: undefined,
		error
	})),
	on(ChartActions.getCurrentMachineUnlearningChartDataSuccess, (state, { machineUnlearningProgress }) => {
		return {
			...state,
			pruningProgress: [],
			quantizationProgress: undefined,
			machineUnlearningProgress,
			error: null
		};
	}),
	on(ChartActions.getCurrentQuantizationChartDataFailure, (state, { error }) => ({
		...state,
		quantizationProgress: undefined,
		error
	})),
	on(ChartActions.getCurrentPruningChartDataFailure, (state, { error }) => ({
		...state,
		pruningProgress: [],
		error
	})),
	on(ChartActions.getChartConfigurationSettingsSuccess, (state, { settings }) => ({
		...state,
		settings: {
			...state.settings,
			...settings
		},
		error: null
	})),
	on(ChartActions.getChartConfigurationSettingsFailure, (state, { error }) => ({
		...state,
		error
	}))
);
