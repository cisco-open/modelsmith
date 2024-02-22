import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectLatestMessages = createSelector(selectCoreState, (state) => state.terminal.messages);
