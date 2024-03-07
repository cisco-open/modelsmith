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

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../state/core/auth';
import { selectParametersState } from '../../../state/core/parameters/parameters.selector';
import { ParametersState } from '../../../state/core/parameters/parameters.state';

@Injectable()
export class ParametersFacadeService {
	parameters$: Observable<ParametersState>;

	constructor(private store: Store<AuthState>) {
		this.parameters$ = this.store.select(selectParametersState);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
