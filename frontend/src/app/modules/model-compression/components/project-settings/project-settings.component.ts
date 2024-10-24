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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { ScriptConfigsDto } from '../../../../services/client/models/script/script-configs.interface-dto';
import { ScriptActions } from '../../../../state/core/script';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { FileService } from '../../../core/services/file.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { BannerService } from '../../../shared/components/ms-banner/services/banner.service';
import { MsPanelParametersComponent } from '../../../shared/components/ms-panel-parameters/ms-panel-parameters.component';
import { isNil } from '../../../shared/shared.utils';
import { CUSTOM_MODEL } from '../../models/constants/supported-models.constants';
import {
	AlgorithmKey,
	AlgorithmType,
	PruningAlgorithmsEnum,
	determineAlgorithmType
} from '../../models/enums/algorithms.enum';
import { isScriptActive } from '../../models/enums/script-status.enum';
import { sanitizeFilename } from '../../utils/sanitize-file-name.utils';

@UntilDestroy()
@Component({
	selector: 'ms-machine-unlearning',
	templateUrl: './project-settings.component.html',
	styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	readonly AlgorithmType: typeof AlgorithmType = AlgorithmType;

	@ViewChild('panelParameters', { static: false }) panelParametersComponent!: MsPanelParametersComponent;

	isScriptActive: boolean = false;
	isQuantAlgorithmSelected: boolean = false;

	selectedAlgorithm: AlgorithmKey = PruningAlgorithmsEnum.IMP;
	selectedAlgorithmType: AlgorithmType = AlgorithmType.PRUNING;

	constructor(
		private scriptFacadeService: ScriptFacadeService,
		private fileService: FileService,
		private snackbarService: BannerService,
		private router: Router
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
					return formRawValue.algorithm && formRawValue.algorithm.alg;
				}),
				distinctUntilChanged(),
				filter((algValue) => !isNil(algValue)),
				untilDestroyed(this)
			)
			.subscribe((algValue) => {
				this.selectedAlgorithm = algValue;
				this.selectedAlgorithmType = determineAlgorithmType(algValue)!;
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
		if (isNil(this.selectedAlgorithm)) {
			this.snackbarService.showError('Select an algorithm before running a script.');
			return;
		}

		const { algorithm, model: modelPanel } = this.form.getRawValue();
		const { model } = modelPanel;

		if (model === CUSTOM_MODEL && !this.fileService.isFileLoaded) {
			this.snackbarService.showError('Please select a predefined model or upload a custom file.');
			return;
		}

		let modelName = model === CUSTOM_MODEL ? sanitizeFilename(this.fileService?.file!.name) : model;

		const configs: ScriptConfigsDto = {
			...algorithm,
			params: {
				...this.panelParametersComponent.parametersFormatted,
				arch: modelName
			}
		};

		this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}

	goToChartPage() {
		this.router.navigate([RoutesList.RUNNING.ROOT]);
	}
}
