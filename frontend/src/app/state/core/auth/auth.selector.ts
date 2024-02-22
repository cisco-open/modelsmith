import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';

export const selectIsAuthenticated = createSelector(selectCoreState, (state) => state.auth.isAuthenticated);

export const selectUser = createSelector(selectCoreState, (state) => state.auth.user);
