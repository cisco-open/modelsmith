import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectPruningProgress = createSelector(selectCoreState, (state) => state.charts.pruningProgress);

export const selectQuantizationProgress = createSelector(selectCoreState, (state) => state.charts.quantizationProgress);

export const selectMachineUnlearningProgress = createSelector(
	selectCoreState,
	(state) => state.charts.machineUnlearningProgress
);

export const selectSettings = createSelector(selectCoreState, (state) => state.charts.settings);
