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
import { ScriptArguments } from '../../../../services/client/models/script/script-arguments.interface-dto';
import { ScriptConfigsDto } from '../../../../services/client/models/script/script-configs.interface-dto';
import { ScriptActions } from '../../../../state/core/script';
import { PageRunningScriptSpiningIndicatorService } from '../../../core/services/page-running-script-spinning-indicator.service';

@UntilDestroy()
@Component({
	selector: 'ms-difussion-model',
	templateUrl: './difussion-model.component.html',
	styleUrl: './difussion-model.component.scss'
})
export class DifussionModelComponent {
	readonly DiffusionModelAlgorithmsEnum: typeof DiffusionModelAlgorithmsEnum = DiffusionModelAlgorithmsEnum;

	@ViewChild('panelParametersCalibrationSet', { static: false })
	panelParametersCalibrationSet!: MsPanelParametersComponent;
	@ViewChild('panelParametersQuantSample', { static: false }) panelParametersQuantSample!: MsPanelParametersComponent;

	form!: FormGroup;
	isScriptActive: boolean = false;

	DIFFUSION_MODEL_ALGORITHMS_LIST: { key: DiffusionModelAlgorithmsEnum; value: string }[] = [
		{ key: DiffusionModelAlgorithmsEnum.PTQ4DIT_GET_CALIBRATION_SET, value: 'Get calibration set' },
		{ key: DiffusionModelAlgorithmsEnum.PTQ4DIT_QUANT_SAMPLE, value: 'Quant sample' }
	];

	constructor(
		private fb: FormBuilder,
		private scriptFacadeService: ScriptFacadeService,
		public pageRunningScriptSpiningIndicatorService: PageRunningScriptSpiningIndicatorService
	) {}

	ngOnInit() {
		this.initForm();
		this.listenToScriptStateChanges();
	}

	private initForm() {
		this.form = this.fb.group({});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);

			if (this.isScriptActive) {
				this.form.disable();
			} else {
				this.form.enable();
			}
		});
	}

	submit(algorithm: DiffusionModelAlgorithmsEnum, type: string) {
		if (this.isScriptActive) {
			return;
		}

		const parameters: ScriptArguments =
			type === 'params_calibration_set'
				? this.panelParametersCalibrationSet.parametersFormatted
				: this.panelParametersQuantSample.parametersFormatted;

		const configs: ScriptConfigsDto = {
			alg: algorithm,
			params: parameters
		};

		this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}
}
