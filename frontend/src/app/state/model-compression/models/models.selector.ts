import { createSelector } from '@ngrx/store';
import { selectModelCompression } from '../model-compression.selector';

export const selectModels = createSelector(selectModelCompression, (state) => state.models.models);
