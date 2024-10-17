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

import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, skip, take } from 'rxjs';
import { ScriptDetails } from '../../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from '../../../../state/core/script';
import { ScriptFacadeService } from '../../../core/services';
import {
	AlgorithmKey,
	AlgorithmType,
	TrainAlgorithmsEnum
} from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { isNilOrEmptyString } from '../../../shared/shared.utils';

@UntilDestroy()
@Component({
	selector: 'ms-panel-algorithm-type-for-training',
	templateUrl: './panel-algorithm-type-for-training.component.html',
	styleUrls: ['./panel-algorithm-type-for-training.component.scss'],
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class PanelAlgorithmTypeForTrainingComponent implements OnInit {
	@Input({ required: true }) controlKey = '';

	readonly algorithmTypesOptions = [
		{
			key: AlgorithmType.QUANTIZATION,
			value: 'Quantization'
		},
		{
			key: AlgorithmType.PRUNING,
			value: 'Pruning'
		},
		{
			key: AlgorithmType.MACHINE_UNLEARNING,
			value: 'Machine Unlearning'
		}
	];
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
				skip(1),
				take(1),
				filter((scriptDetails): scriptDetails is ScriptDetails => !isNilOrEmptyString(scriptDetails?.algKey)),
				map((scriptDetails: ScriptDetails) => scriptDetails.algKey)
			)
			.subscribe((algKey: AlgorithmKey) => {
				switch (algKey) {
					case TrainAlgorithmsEnum.PRUNING_TRAIN: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.PRUNING);
						break;
					}
					case TrainAlgorithmsEnum.MACHINE_UNLEARNING_TRAIN: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.MACHINE_UNLEARNING);
						break;
					}
					case TrainAlgorithmsEnum.QUANTIZATION_TRAIN: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.QUANTIZATION);
						break;
					}
					default: {
						this.algorithmTypeFormControl.patchValue(AlgorithmType.PRUNING);
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
}
