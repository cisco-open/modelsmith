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

import { createActionGroup, props } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';

export const RunRecordsActions = createActionGroup({
	source: '[Run Records -> Records]',
	events: {
		'Get Run Records List': props<{ algorithmType: AlgorithmType }>(),
		'Get Run Records List Success': props<{ files: string[] }>(),
		'Get Run Records List Failure': props<{ error: any }>()
	}
});
