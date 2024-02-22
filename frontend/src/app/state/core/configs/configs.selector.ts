import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectDefaultMode = createSelector(selectCoreState, (state) => state.configs.defaultMode);

export const selectCurrentMode = createSelector(selectCoreState, (state) => state.configs.currentMode);
