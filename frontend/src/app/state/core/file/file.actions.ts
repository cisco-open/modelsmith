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
import { ScriptConfigsDto } from '../../../services/client/models/script/script-configs.interface-dto';

export const FileActions = createActionGroup({
	source: '[Core -> File]',
	events: {
		'Upload File': props<{ file: File }>(),
		'Upload File Success': props<{ data: any }>(),
		'Upload File Failure': props<{ error: any }>(),
		'Upload File and Call Script': props<{ file: File | null; configs: ScriptConfigsDto }>()
	}
});
