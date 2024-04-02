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

import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, take } from 'rxjs';
import { KeyValueObject } from '../../../../services/client/models/key-value/key-value.interface-dto';
import { ScriptDetails } from '../../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from '../../../../state/core/script';
import { ScriptFacadeService } from '../../../core/services';
import { isNilOrEmptyString } from '../../../core/utils/core.utils';
import {
	AlgorithmKey,
	AlgorithmType,
	AlgorithmTypeKeyValue,
	TrainAlgorithmsEnum
} from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-algorithm-type',
	templateUrl: './panel-algorithm-type.component.html',
	styleUrls: ['./panel-algorithm-type.component.scss'],
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class PanelAlgorithmTypeComponent implements OnInit {
	@Input({ required: true }) controlKey = '';

	readonly algorithmTypesOptions = AlgorithmTypeKeyValue.filter((option) => option.key !== AlgorithmType.TRAIN);
	readonly ALGORITHM_TYPE_CONTROL_NAME = 'algorithmType';

	get parentFormGroup() {
		return this.controlContainer.control as FormGroup;
	}

	get algorithmTypeFormGroup(): FormGroup {
		return this.parentFormGroup.get(this.controlKey) as FormGroup;
	}

	get algorithmTypeFormControl(): FormControl {
		return this.algorithmTypeFormGroup.get(this.ALGORITHM_TYPE_CONTROL_NAME) as FormControl;
	}

	constructor(
		private controlContainer: ControlContainer,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initForm();

		this.loadInitialData();
		this.listenToScriptStateChanges();
	}

	private loadInitialData() {
		this.scriptFacadeService.scriptDetails$
			.pipe(
				take(1),
				filter((scriptDetails): scriptDetails is ScriptDetails => !isNilOrEmptyString(scriptDetails?.algKey)),
				map((scriptDetails: ScriptDetails) => scriptDetails.algKey)
			)
			.subscribe((algKey: AlgorithmKey) => {
				switch (algKey) {
					case TrainAlgorithmsEnum.MACHINE_UNLEARNING_TRAIN: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.MACHINE_UNLEARNING);
						break;
					}
					case TrainAlgorithmsEnum.PRUNING_TRAIN: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.PRUNING);
						break;
					}
					case TrainAlgorithmsEnum.QUANTIZATION_TRAIN: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.QUANTIZATION);
						break;
					}
				}
			});

		this.scriptFacadeService.dispatch(ScriptActions.getCurrentOrLastActiveScriptDetails());
	}

	private initForm() {
		this.parentFormGroup.addControl(
			this.controlKey,
			new FormGroup({
				[this.ALGORITHM_TYPE_CONTROL_NAME]: new FormControl(AlgorithmType.PRUNING, Validators.required)
			})
		);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			isScriptActive(state) ? this.algorithmTypeFormGroup.disable() : this.algorithmTypeFormGroup.enable();
		});
	}

	trackByAlgorithmType(_: number, algorithmType: KeyValueObject<string>): any {
		return algorithmType.key;
	}
}
