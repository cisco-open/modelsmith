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

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ModelDto } from '../../../../services/client/models/models/models.interface-dto';
import { ModelsActions } from '../../../../state/core/models/models.actions';
import { PageKey } from '../../../core/models/enums/page-key.enum';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { ModelsFacadeService } from '../../../core/services/models-facade.service';
import { PageRunningScriptSpiningIndicatorService } from '../../../core/services/page-running-script-spinning-indicator.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { AlgorithmType, TrainAlgorithmsEnum } from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { isEmptyArray, isNilOrEmptyString } from '../../shared.utils';

@Component({
	selector: 'ms-panel-model-training',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatSelectModule,
		MatIconModule,
		CommonModule,
		NgxMatSelectSearchModule,
		MatProgressSpinnerModule
	],
	templateUrl: './ms-panel-model-training.component.html',
	styleUrls: ['./ms-panel-model-training.component.scss'],
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class MsPanelModelTrainingComponent implements OnInit, OnChanges, OnDestroy {
	@Input({ required: true }) controlKey = '';
	@Input({ required: true }) algorithmType?: AlgorithmType;

	getModelsByTypeSubscription?: Subscription;

	readonly PageKey: typeof PageKey = PageKey;
	readonly RoutesList: typeof RoutesList = RoutesList;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['algorithmType'] && changes['algorithmType'].currentValue) {
			this.configureModels(changes['algorithmType'].currentValue as AlgorithmType);
		}
	}

	searchModel = new FormControl();
	filteredModels!: Observable<ModelDto[]>;

	models: ModelDto[] = [];

	readonly MODEL_CONTROL_NAME: string = 'model';

	get parentFormGroup() {
		return this.controlContainer.control as FormGroup;
	}

	get modelFormGroup(): FormGroup {
		return this.parentFormGroup.get(this.controlKey) as FormGroup;
	}

	get modelControl(): FormControl {
		return this.modelFormGroup?.get(this.MODEL_CONTROL_NAME) as FormControl;
	}

	constructor(
		private destroyRef: DestroyRef,
		private controlContainer: ControlContainer,
		private modelsFacadeService: ModelsFacadeService,
		private scriptFacadeService: ScriptFacadeService,
		public pageRunningScriptSpiningIndicatorService: PageRunningScriptSpiningIndicatorService
	) {}

	ngOnInit() {
		this.initializeForm();

		this.listenToScriptStateChanges();
		this.listenToSearchModelValueChanges();

		// Manually trigger ngOnChanges after form initialization
		this.configureModels(this.algorithmType!);
	}

	private configureModels(algorithmType: AlgorithmType | null) {
		if (!algorithmType) {
			return;
		}

		this.getModelsByTypeSubscription?.unsubscribe();
		this.getModelsByTypeSubscription = this.subscribeToModelsListChanges(algorithmType);

		this.modelsFacadeService.dispatch(ModelsActions.getModelsList({ algorithmType }));

		switch (algorithmType) {
			case AlgorithmType.PRUNING: {
				this.modelsFacadeService.dispatch(
					ModelsActions.getCurrentOrPreviousSelectedModel({ algorithmType: TrainAlgorithmsEnum.PRUNING_TRAIN as any })
				);
				break;
			}
			case AlgorithmType.QUANTIZATION: {
				this.modelsFacadeService.dispatch(
					ModelsActions.getCurrentOrPreviousSelectedModel({
						algorithmType: TrainAlgorithmsEnum.QUANTIZATION_TRAIN as any
					})
				);
				break;
			}
			case AlgorithmType.MACHINE_UNLEARNING: {
				this.modelsFacadeService.dispatch(
					ModelsActions.getCurrentOrPreviousSelectedModel({
						algorithmType: TrainAlgorithmsEnum.MACHINE_UNLEARNING_TRAIN as any
					})
				);
				break;
			}
		}
	}

	private listenToCurrentModelChanges() {
		this.modelsFacadeService.currentModel$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((model: string | undefined) => {
				if (isNilOrEmptyString(model)) {
					return;
				}

				const matchingModel = this.models.find((m) => m.name === model);
				if (matchingModel) {
					this.modelControl?.patchValue(model);
				}
			});
	}

	private subscribeToModelsListChanges(algorithmType: AlgorithmType): Subscription {
		let firstLoadComplete = false;
		return this.modelsFacadeService
			.getModelsByType(algorithmType)
			.pipe(
				filter((models): models is ModelDto[] => !isEmptyArray(models)),
				map((models) => [...models].sort((a, b) => Number(b.isTrained) - Number(a.isTrained)))
			)
			.subscribe((models: ModelDto[]) => {
				this.models = models;
				this.searchModel.setValue('');

				if (!firstLoadComplete) {
					this.listenToCurrentModelChanges();
					firstLoadComplete = true;
				}
			});
	}

	private initializeForm(): void {
		this.parentFormGroup.addControl(
			this.controlKey,
			new FormGroup({
				[this.MODEL_CONTROL_NAME]: new FormControl('', Validators.required)
			})
		);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
			isScriptActive(state) ? this.modelFormGroup.disable() : this.modelFormGroup.enable();
		});
	}

	private listenToSearchModelValueChanges() {
		this.filteredModels = this.searchModel.valueChanges.pipe(
			takeUntilDestroyed(this.destroyRef),
			startWith(''),
			map((value) => this.filterModels(value))
		);
	}

	private filterModels(value: string): ModelDto[] {
		const filterValue = value.toLowerCase();
		return this.models.filter((model) => model.name.toLowerCase().includes(filterValue));
	}

	ngOnDestroy() {
		this.parentFormGroup.removeControl(this.controlKey);
	}
}
