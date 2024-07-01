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

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScriptConfigsDto } from '../../../../services/client/models/script/script-configs.interface-dto';
import { ScriptFacadeService } from '../../../core/services';
import { AlgorithmType, MultiflowAlgorithmsEnum } from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { MsPanelParametersComponent } from '../../../shared/standalone/ms-panel-parameters/ms-panel-parameters.component';

@UntilDestroy()
@Component({
	selector: 'ms-model-specialization',
	templateUrl: './model-specialization.component.html',
	styleUrls: ['./model-specialization.component.scss']
})
export class ModelSpecializationComponent {
	readonly AlgorithmType: typeof AlgorithmType = AlgorithmType;
	readonly MultiflowAlgorithmsEnum: typeof MultiflowAlgorithmsEnum = MultiflowAlgorithmsEnum;

	isScriptActive: boolean = false;

	@ViewChild('panelParameters', { static: false }) panelParametersComponent!: MsPanelParametersComponent;

	form!: FormGroup;

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
				alg: []
			})
		});

		setTimeout(() => {
			this.form.get('algorithm.alg')?.setValue(MultiflowAlgorithmsEnum);
		}, 0);
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

		const { algorithm, model: modelPanel } = this.form.getRawValue();
		const { model } = modelPanel;

		const configs: ScriptConfigsDto = {
			...algorithm,
			params: {
				...this.panelParametersComponent.parametersFormatted,
				model
			}
		};

		// this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}
}
