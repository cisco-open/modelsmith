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
import { ParametersDto } from '../../../services/client/models/parameters/parameter.interface-dto';

export const ParameterActions = createActionGroup({
	source: '[Core -> Parameter]',
	events: {
		'Load Parameters': props<{ arg: string }>(),
		'Load Parameters Success': props<{ arg: string; parameters: ParametersDto[] }>(),
		'Load Parameters Failure': props<{ arg: string; error: any }>()
	}
});
