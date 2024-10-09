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

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllMessages, selectLatestMessages } from '../../../state/core/terminal/terminal.selector';
import { TerminalState } from '../../../state/core/terminal/terminal.state';
import { TerminalMessage } from '../../shared/components/ms-terminal/models/terminal-message.interface';

@Injectable()
export class TerminalFacadeService {
	messages$: Observable<TerminalMessage[]>;
	allMessages$: Observable<TerminalMessage[]>;

	constructor(private store: Store<TerminalState>) {
		this.messages$ = this.store.select(selectLatestMessages);
		this.allMessages$ = this.store.select(selectAllMessages);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
