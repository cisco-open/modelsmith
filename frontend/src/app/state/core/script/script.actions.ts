//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ScriptConfigsDto } from '../../../services/client/models/script/script-configs.interface-dto';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';

export const ScriptActions = createActionGroup({
	source: '[Core -> Script]',
	events: {
		'Call Script': props<{ configs: ScriptConfigsDto }>(),
		'Call Script Success': emptyProps(),
		'Call Script Failure': props<{ error: any }>(),
		'Fetch Script Status': emptyProps(),
		'Update Script Status': props<{ status: string }>(),
		'Fetch Script Status Success': props<{ status: string }>(),
		'Fetch Script Status Failure': props<{ error: any }>(),
		'Stop Script': emptyProps(),
		'Stop Script Success': emptyProps(),
		'Stop Script Failure': props<{ error: any }>(),
		'Get Current or Last Active Script Details': emptyProps(),
		'Get Current or Last Active Script Details Success': props<{ scriptDetails: ScriptDetails }>(),
		'Get Current or Last Active Script Details Failure': props<{ error: any }>(),
		'Execute Command': props<{ command: string }>(),
		'Execute Command Success': emptyProps(),
		'Execute Command Failure': props<{ error: any }>()
	}
});
