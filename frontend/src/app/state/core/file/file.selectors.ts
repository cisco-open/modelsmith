import { createSelector } from '@ngrx/store';
import { selectCoreState } from '../core.selector';
import { CoreState } from '../core.state';

export const selectUploading = createSelector(selectCoreState, ({ fileState: file }: CoreState) => file.uploading);

export const selectUploadedData = createSelector(
	selectCoreState,
	({ fileState: file }: CoreState) => file.uploadedData
);

export const selectUploadError = createSelector(selectCoreState, ({ fileState: file }: CoreState) => file.error);
