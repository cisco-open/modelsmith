import { createReducer, on } from '@ngrx/store';
import { FileActions } from './file.actions';

export interface FileState {
	uploading: boolean;
	uploadedData?: any;
	error?: any;
}

const initialState: FileState = {
	uploading: false
};

export const uploadFileReducer = createReducer(
	initialState,
	on(FileActions.uploadFile, (state) => ({ ...state, uploading: true })),
	on(FileActions.uploadFileSuccess, (state, { data }) => ({ ...state, uploading: false, uploadedData: data })),
	on(FileActions.uploadFileFailure, (state, { error }) => ({ ...state, uploading: false, error }))
);
