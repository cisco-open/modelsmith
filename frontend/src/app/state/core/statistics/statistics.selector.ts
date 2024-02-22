import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectStatistics = createSelector(selectCoreState, (state) => state.statistics.statistics);
