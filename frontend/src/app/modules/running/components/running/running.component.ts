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

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter, skip, take } from 'rxjs';
import { ScriptDetails } from '../../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from '../../../../state/core/script/script.actions';
import { NavigationService } from '../../../core/services/navigation.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { AlgorithmType } from '../../../model-compression/models/enums/algorithms.enum';
import { isEmptyObject, isNilOrEmptyString } from '../../../shared/shared.utils';
import { AnimationType } from '../../models/enums/animation-type.enum';

@UntilDestroy()
@Component({
	selector: 'ms-running',
	templateUrl: './running.component.html',
	styleUrls: ['./running.component.scss']
})
export class RunningComponent implements OnInit {
	scriptDetails?: ScriptDetails;

	readonly AlgorithmType = AlgorithmType;
	readonly AnimationType = AnimationType;

	constructor(
		public navigationService: NavigationService,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit(): void {
		this.listenToScriptStateChanges();
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.dispatch(ScriptActions.getCurrentOrLastActiveScriptDetails());
		this.scriptFacadeService.scriptDetails$
			.pipe(
				skip(1),
				take(1),
				filter((scriptDetails): scriptDetails is ScriptDetails => !isNilOrEmptyString(scriptDetails?.algKey))
			)
			.subscribe((scriptDetails: ScriptDetails) => {
				this.scriptDetails = scriptDetails;
			});
	}

	get isChartVisible(): boolean {
		return (
			!isEmptyObject(this.scriptDetails?.algKey) &&
			this.scriptDetails?.type !== AlgorithmType.TRAIN &&
			this.scriptDetails?.type !== AlgorithmType.AWQ &&
			this.scriptDetails?.type !== AlgorithmType.MULTIFLOW
		);
	}
}
