//   Copyright 2024 Cisco Systems, Inc.

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

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
	source: '[Core -> Auth]',
	events: {
		Login: props<{ email: string; password: string }>(),
		'Login Success': props<{ user: any }>(),
		'Login Failure': props<{ error: any }>(),
		Logout: emptyProps(),
		'Logout Success': emptyProps(),
		'Logout Failure': props<{ error: any }>()
	}
});
