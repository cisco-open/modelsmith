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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModelActions } from '../../../../state/model-compression/models/models.actions';
import { FileService } from '../../../core/services/file.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { CUSTOM_MODEL } from '../../models/constants/supported-models.constants';
import { isScriptActive } from '../../models/enums/script-status.enum';
import { ModelsFacadeService } from '../../services/models-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-panel-model',
	templateUrl: './panel-model.component.html',
	styleUrls: ['./panel-model.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelModelComponent implements OnInit {
	form!: FormGroup;

	isCustomModelSelected: boolean = false;

	searchModel = new FormControl();
	filteredModels!: Observable<string[]>;

	models: string[] = [];
	customModel = CUSTOM_MODEL;

	readonly MODEL_CONTROL_NAME: string = 'model';

	get modelControl(): AbstractControl | null {
		return this.form.get(this.MODEL_CONTROL_NAME);
	}

	constructor(
		private fb: FormBuilder,
		private controlContainer: ControlContainer,
		private fileService: FileService,
		private modelsFacadeService: ModelsFacadeService,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initializeForm();
		this.loadModelsAndListenToChanges();

		this.listenToModelChanges();
		this.listenToScriptStateChanges();

		this.filteredModels = this.searchModel.valueChanges.pipe(
			startWith(''),
			map((value) => this.filterModels(value))
		);
	}

	private loadModelsAndListenToChanges() {
		this.modelsFacadeService.dispatch(ModelActions.loadModels());

		this.modelsFacadeService.models$.pipe(untilDestroyed(this)).subscribe((models: string[] | undefined) => {
			if (!models?.length) {
				return;
			}
			this.models = models;
			this.searchModel.setValue('');
		});
	}

	private initializeForm(): void {
		this.form = this.fb.group({
			[this.MODEL_CONTROL_NAME]: new FormControl('', Validators.required)
		});

		(this.controlContainer?.control?.parent as FormGroup)?.setControl(this.controlContainer.name as string, this.form);
	}

	listenToModelChanges(): void {
		this.modelControl?.valueChanges.pipe(untilDestroyed(this)).subscribe((selectedModelFileName) => {
			if (selectedModelFileName === CUSTOM_MODEL) {
				this.fileService.file = null;
				this.isCustomModelSelected = true;
			} else {
				this.isCustomModelSelected = false;
			}
		});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			isScriptActive(state) ? this.form.disable() : this.form.enable();
			this.modelControl?.patchValue('resnet18');
		});
	}

	private filterModels(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.models.filter((model) => model.toLowerCase().includes(filterValue));
	}

	trackByModel(_: number, model: string): any {
		return model;
	}
}
