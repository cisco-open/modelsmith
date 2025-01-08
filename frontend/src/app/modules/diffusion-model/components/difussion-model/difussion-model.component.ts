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

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScriptFacadeService } from 'src/app/modules/core/services';
import { DiffusionModelAlgorithmsEnum } from 'src/app/modules/model-compression/models/enums/algorithms.enum';
import { isScriptActive } from 'src/app/modules/model-compression/models/enums/script-status.enum';
import { MsPanelParametersComponent } from 'src/app/modules/shared/components/ms-panel-parameters/ms-panel-parameters.component';
import { ScriptConfigsDto } from 'src/app/services/client/models/script/script-configs.interface-dto';
import { ScriptActions } from 'src/app/state/core/script';

@UntilDestroy()
@Component({
	selector: 'ms-difussion-model',
	templateUrl: './difussion-model.component.html',
	styleUrl: './difussion-model.component.scss'
})
export class DifussionModelComponent {
	readonly DiffusionModelAlgorithmsEnum: typeof DiffusionModelAlgorithmsEnum = DiffusionModelAlgorithmsEnum;

	@ViewChild('panelParameters', { static: false }) panelParametersComponent!: MsPanelParametersComponent;

	form!: FormGroup;
	isScriptActive: boolean = false;
	selectedAlgorithm = DiffusionModelAlgorithmsEnum.PTQ4DIT_GET_CALIBRATION_SET;

	DIFFUSION_MODEL_ALGORITHMS_LIST: { key: DiffusionModelAlgorithmsEnum; value: string }[] = [
		{ key: DiffusionModelAlgorithmsEnum.PTQ4DIT_GET_CALIBRATION_SET, value: 'Get calibration set' },
		{ key: DiffusionModelAlgorithmsEnum.PTQ4DIT_QUANT_SAMPLE, value: 'Quant sample' }
	];

	constructor(
		private fb: FormBuilder,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initForm();
		this.listenToScriptStateChanges();
	}

	private initForm() {
		this.form = this.fb.group({
			algorithm: this.fb.group({
				alg: [this.selectedAlgorithm]
			})
		});

		this.form
			.get('algorithm.alg')
			?.valueChanges.pipe(untilDestroyed(this))
			.subscribe((value) => {
				this.selectedAlgorithm = value;
			});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);

			if (isScriptActive(state)) {
				this.form.disable();
			} else {
				this.form.enable();
			}
		});
	}

	submit() {
		if (this.isScriptActive) {
			return;
		}

		const { algorithm } = this.form.getRawValue();

		const configs: ScriptConfigsDto = {
			...algorithm,
			params: {
				...this.panelParametersComponent.parametersFormatted
			}
		};

		this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}
}
