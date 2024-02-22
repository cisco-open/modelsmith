import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectScriptStatus = createSelector(selectCoreState, (state) => state.script.scriptStatus);

export const selectScriptDetails = createSelector(selectCoreState, (state) => state.script.scriptDetails);
