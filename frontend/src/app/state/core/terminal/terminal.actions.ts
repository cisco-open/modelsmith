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

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TerminalMessage } from '../../../modules/shared/components/ms-terminal/models/terminal-message.interface';

export const TerminalActions = createActionGroup({
	source: '[Core -> Terminal]',
	events: {
		'Get Latest Messages': emptyProps(),
		'Get Latest Messages Success': props<{ messages: TerminalMessage[] }>(),
		'Get Latest Messages Failure': props<{ error: any }>(),
		'Get All Messages': emptyProps(),
		'Get All Messages Success': props<{ allMessages: TerminalMessage[] }>(),
		'Get All Messages Failure': props<{ error: any }>(),
		'Post Clear History': emptyProps(),
		'Post Clear History Success': emptyProps(),
		'Post Clear History Failure': props<{ error: any }>()
	}
});
