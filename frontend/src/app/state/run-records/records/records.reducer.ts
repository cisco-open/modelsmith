//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { createReducer, on } from '@ngrx/store';
import { SummarizedRunRecord } from '../../../services/client/models/run-records/run-records.interface';
import { RunRecordsActions } from './records.actions';
import { RecordsState } from './records.state';

export const initialState: RecordsState = {
	filenames: [],
	summarizedRecord: {} as SummarizedRunRecord,
	error: ''
};

export const recordsReducer = createReducer(
	initialState,
	on(RunRecordsActions.getRunRecordsFilenamesSuccess, (state, { files: filenames }) => ({
		...state,
		filenames,
		error: null
	})),
	on(RunRecordsActions.getRunRecordsFilenamesFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(RunRecordsActions.getRunRecordSummarizedData, (state) => ({
		...state,
		loading: true,
		error: null
	})),
	on(RunRecordsActions.getRunRecordSummarizedDataSuccess, (state, { record }) => ({
		...state,
		summarizedRecord: record,
		error: null
	})),
	on(RunRecordsActions.getRunRecordSummarizedDataFailure, (state, { error }) => ({
		...state,
		error
	}))
);