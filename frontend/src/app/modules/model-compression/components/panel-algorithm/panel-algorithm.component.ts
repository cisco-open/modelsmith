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

import { Component } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, skip, take } from 'rxjs';
import { ScriptDetails } from '../../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from '../../../../state/core/script';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import {
	DEFAULT_SELECTED_ALGORITHM,
	PRUNING_ALGORITHMS_LIST,
	QUANTIZATION_ALGORITHMS_LIST
} from '../../models/constants/algorithm.constants';
import { AlgorithmType } from '../../models/enums/algorithms.enum';
import { isScriptActive } from '../../models/enums/script-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-algorithm',
	templateUrl: './panel-algorithm.component.html',
	styleUrls: ['./panel-algorithm.component.scss']
})
export class PanelAlgorithmComponent {
	form!: FormGroup;

	readonly pruningAlgorithmsList = PRUNING_ALGORITHMS_LIST;
	readonly quantAlgorithmsList = QUANTIZATION_ALGORITHMS_LIST;

	readonly ALGORITHM_CONTROL_NAME: string = 'alg';

	get algorithmFormControl(): AbstractControl | null {
		return this.form.get(this.ALGORITHM_CONTROL_NAME);
	}

	constructor(
		private fb: FormBuilder,
		private controlContainer: ControlContainer,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initForm();
		this.listenToScriptStateChanges();
		this.loadInitialData();
	}

	/**
	 * Initializes the loading process based on the script's active status.
	 * It checks whether a script is currently active. If it is, the function
	 * retrieves the active script's details. If no script is active, it sets
	 * the algorithm value to a default constant.
	 */
	private loadInitialData() {
		this.scriptFacadeService.dispatch(ScriptActions.getCurrentOrLastActiveScriptDetails());

		this.scriptFacadeService.scriptDetails$
			.pipe(
				skip(1),
				take(1),
				filter((scriptDetails): scriptDetails is ScriptDetails => !!scriptDetails?.algKey)
			)
			.subscribe((scriptDetails: ScriptDetails) => {
				const algorithmType = scriptDetails.type;

				const isPruningOrQuantization =
					algorithmType === AlgorithmType.PRUNING || algorithmType === AlgorithmType.QUANTIZATION;

				const initialAlgorithmValue = isPruningOrQuantization ? scriptDetails!.algKey : DEFAULT_SELECTED_ALGORITHM;

				this.setInitialAlgorithmValue(initialAlgorithmValue);
			});
	}

	private setInitialAlgorithmValue(algorithm: string): void {
		this.algorithmFormControl?.setValue(algorithm, { emitEvent: true });
	}

	private initForm() {
		this.form = this.fb.group({
			[this.ALGORITHM_CONTROL_NAME]: [DEFAULT_SELECTED_ALGORITHM, Validators.required]
		});

		(this.controlContainer?.control?.parent as FormGroup)?.setControl(this.controlContainer.name as string, this.form);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			if (isScriptActive(state)) {
				this.form.disable();
			} else {
				this.form.enable();
			}
		});
	}

	trackByAlgorithmKey(_: number, algorithm: { key: any; value: any }): any {
		return algorithm.key;
	}
}
