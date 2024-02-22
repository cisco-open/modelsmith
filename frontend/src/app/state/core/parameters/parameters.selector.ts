import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectParametersState = createSelector(selectCoreState, (state) => state.parameters);
