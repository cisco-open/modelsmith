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

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';
import { selectScriptDetails, selectScriptStatus } from '../../../state/core/script/script.selector';
import { ScriptState } from '../../../state/core/script/script.state';
import { ScriptStatusEnum } from '../../model-compression/models/enums/script-status.enum';

@Injectable()
export class ScriptFacadeService {
	scriptStatus$: Observable<ScriptStatusEnum>;
	scriptDetails$: Observable<ScriptDetails>;

	constructor(private store: Store<ScriptState>) {
		this.scriptStatus$ = this.store.select(selectScriptStatus);
		this.scriptDetails$ = this.store.select(selectScriptDetails);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
