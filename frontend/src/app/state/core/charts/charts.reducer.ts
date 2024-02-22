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
