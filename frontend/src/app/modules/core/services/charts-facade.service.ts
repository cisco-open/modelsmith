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
import {
	MachineUnlearningProgress,
	PruningProgress,
	QuantizationProgress
} from '../../../services/client/models/charts/chart-data.interface-dto';
import { ChartConfigurationSettingsDictionary } from '../../../services/client/models/charts/chart-settings.interface-dto';
import {
	ChartsState,
	selectMachineUnlearningProgress,
	selectPruningProgress,
	selectQuantizationProgress,
	selectSettings
} from '../../../state/core/charts';

@Injectable()
export class ChartsFacadeService {
	pruningProgress: Observable<PruningProgress[] | undefined>;
	quantizationProgress$: Observable<QuantizationProgress | undefined>;
	machineUnlearningProgress$: Observable<MachineUnlearningProgress | undefined>;
	settings$: Observable<ChartConfigurationSettingsDictionary | undefined>;

	constructor(private store: Store<ChartsState>) {
		this.pruningProgress = this.store.select(selectPruningProgress);
		this.quantizationProgress$ = this.store.select(selectQuantizationProgress);
		this.machineUnlearningProgress$ = this.store.select(selectMachineUnlearningProgress);
		this.settings$ = this.store.select(selectSettings);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
