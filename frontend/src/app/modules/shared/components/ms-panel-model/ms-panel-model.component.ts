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

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map, skip, startWith, take } from 'rxjs/operators';
import { ModelDto } from '../../../../services/client/models/models/models.interface-dto';
import { ModelsActions } from '../../../../state/core/models/models.actions';
import { ModelsFacadeService } from '../../../core/services/models-facade.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { isEmptyObject } from '../../../core/utils/core.utils';
import {
	AlgorithmKey,
	AlgorithmType,
	determineAlgorithmType
} from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-model',
	templateUrl: './ms-panel-model.component.html',
	styleUrls: ['./ms-panel-model.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsPanelModelComponent implements OnInit, OnChanges {
	@Input() algorithm?: AlgorithmKey;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['algorithm'] && changes['algorithm'].currentValue) {
			this.configureModels(changes['algorithm'].currentValue as AlgorithmKey);
		}
	}

	form!: FormGroup;

	searchModel = new FormControl();
	filteredModels!: Observable<ModelDto[]>;

	models: ModelDto[] = [];

	readonly MODEL_CONTROL_NAME: string = 'model';

	get modelControl(): AbstractControl | null {
		return this.form.get(this.MODEL_CONTROL_NAME);
	}

	constructor(
		private fb: FormBuilder,
		private controlContainer: ControlContainer,
		private modelsFacadeService: ModelsFacadeService,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initializeForm();

		this.listenToScriptStateChanges();
		this.listenToSearchModelValueChanges();
	}

	private configureModels(algorithm: AlgorithmKey) {
		const algorithmType = determineAlgorithmType(algorithm);
		if (!algorithmType) {
			return;
		}

		this.fetchModels(algorithmType);
		this.loadInitialModel(algorithmType);
	}

	private loadInitialModel(algorithmType: AlgorithmType) {
		this.modelsFacadeService.currentModel$
			.pipe(
				skip(1),
				take(1),
				filter((model): model is string => model !== undefined && !isEmptyObject(model))
			)
			.subscribe((model: string) => {
				this.modelControl?.patchValue(model);
			});

		this.modelsFacadeService.dispatch(ModelsActions.getCurrentOrPreviousSelectedModel({ algorithmType }));
	}

	private fetchModels(algorithmType: AlgorithmType) {
		this.modelsFacadeService
			.getModelsByType(algorithmType)
			.pipe(
				filter((models): models is ModelDto[] => !!models && models.length > 0),
				map((models) => [...models].sort((a, b) => Number(b.isTrained) - Number(a.isTrained))),
				take(1)
			)
			.subscribe((models: ModelDto[]) => {
				this.models = models;
				this.searchModel.setValue('');
			});

		this.modelsFacadeService.dispatch(ModelsActions.getModelsList({ algorithmType }));
	}

	private initializeForm(): void {
		this.form = this.fb.group({
			[this.MODEL_CONTROL_NAME]: ['', Validators.required]
		});

		(this.controlContainer?.control?.parent as FormGroup)?.setControl(this.controlContainer.name as string, this.form);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			isScriptActive(state) ? this.form.disable() : this.form.enable();
		});
	}

	private listenToSearchModelValueChanges() {
		this.filteredModels = this.searchModel.valueChanges.pipe(
			untilDestroyed(this),
			startWith(''),
			map((value) => this.filterModels(value))
		);
	}

	private filterModels(value: string): ModelDto[] {
		const filterValue = value.toLowerCase();
		return this.models.filter((model) => model.name.toLowerCase().includes(filterValue));
	}

	trackByModel(_: number, model: ModelDto): any {
		return model.name;
	}
}
