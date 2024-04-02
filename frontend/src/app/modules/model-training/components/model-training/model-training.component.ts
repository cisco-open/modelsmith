// Copyright 2024 Cisco Systems, Inc. and its affiliates

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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { ScriptConfigsDto } from '../../../../services/client/models/script/script-configs.interface-dto';
import { ScriptActions } from '../../../../state/core/script';
import { BannerService, NavigationService, ScriptFacadeService } from '../../../core/services';
import { isNil } from '../../../core/utils/core.utils';
import {
	AlgorithmType,
	AlgorithmTypeTrainAlgoritmMap,
	TrainAlgorithmsEnum
} from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { MsPanelParametersComponent } from '../../../shared/standalone/ms-panel-parameters/ms-panel-parameters.component';

@UntilDestroy()
@Component({
	selector: 'ms-model-training',
	templateUrl: './model-training.component.html',
	styleUrls: ['./model-training.component.scss']
})
export class ModelTrainingComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	@ViewChild('panelParameters', { static: false }) panelParametersComponent!: MsPanelParametersComponent;

	isScriptActive: boolean = false;

	selectedAlgorithmType: AlgorithmType = AlgorithmType.PRUNING;
	selectedAlgorithmKey: TrainAlgorithmsEnum = TrainAlgorithmsEnum.PRUNING_TRAIN;

	constructor(
		public navigationService: NavigationService,
		private scriptFacadeService: ScriptFacadeService,
		private router: Router,
		private snackbarService: BannerService
	) {}

	ngOnInit() {
		this.listenToAlgorithmPanelChanges();
		this.listenToScriptStateChanges();
	}

	private listenToAlgorithmPanelChanges(): void {
		this.form.valueChanges
			.pipe(
				debounceTime(50),
				map(() => {
					const formRawValue = this.form.getRawValue();
					return formRawValue.algorithmTypeGroup && formRawValue.algorithmTypeGroup.algorithmType;
				}),
				distinctUntilChanged(),
				filter((algorithmType) => !!algorithmType),
				untilDestroyed(this)
			)
			.subscribe((algorithmType: AlgorithmType) => {
				this.selectedAlgorithmType = algorithmType;
				this.selectedAlgorithmKey = AlgorithmTypeTrainAlgoritmMap[algorithmType];
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
		if (isNil(this.selectedAlgorithmType)) {
			this.snackbarService.showError('Select an algorithm before running a script.');
			return;
		}
		const { model: modelPanel } = this.form.getRawValue();
		const { model } = modelPanel;

		const configs: ScriptConfigsDto = {
			alg: this.selectedAlgorithmKey,
			params: {
				...this.panelParametersComponent.parametersFormatted,
				arch: model
			}
		};

		this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}
}
