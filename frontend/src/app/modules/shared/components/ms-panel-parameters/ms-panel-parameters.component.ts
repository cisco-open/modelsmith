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

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, skip } from 'rxjs';
import { ParametersDto } from '../../../../services/client/models/parameters/parameter.interface-dto';
import { ScriptArguments } from '../../../../services/client/models/script/script-arguments.interface-dto';
import { ParameterActions } from '../../../../state/core/parameters/parameters.actions';
import { ParametersState } from '../../../../state/core/parameters/parameters.state';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { ParametersFacadeService } from '../../../core/services/parameters-facade.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { DEFAULT_SELECTED_ALGORITHM } from '../../../model-compression/models/constants/algorithm.constants';
import { AlgorithmKey } from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-parameters',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,
		MatCheckboxModule,
		MatIconModule
	],
	templateUrl: './ms-panel-parameters.component.html',
	styleUrls: ['./ms-panel-parameters.component.scss'],
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class MsPanelParametersComponent implements OnInit {
	@Input({ required: true }) controlKey = '';
	@Input() algorithm?: AlgorithmKey;

	readonly RoutesList = RoutesList;
	private alg: AlgorithmKey = DEFAULT_SELECTED_ALGORITHM;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['algorithm'] && changes['algorithm'].currentValue) {
			this.alg = changes['algorithm'].currentValue;
			this.loadParametersForAlgorithm(this.alg);
		}
	}

	isScriptActive: boolean = false;
	parameters: ParametersDto[] = [];

	get parentFormGroup() {
		return this.controlContainer.control as FormGroup;
	}

	get paramsFormGroup(): FormGroup {
		return this.parentFormGroup.get(this.controlKey) as FormGroup;
	}

	get parametersFormArray(): FormArray {
		return this.paramsFormGroup.get('parametersArray') as FormArray;
	}

	constructor(
		private fb: FormBuilder,
		private controlContainer: ControlContainer,
		private parametersFacadeService: ParametersFacadeService,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initForm();
		this.listenToScriptStateChanges();
	}

	private initForm(): void {
		this.parentFormGroup.addControl(
			this.controlKey,
			new FormGroup({
				parametersArray: new FormArray([])
			})
		);
	}

	private loadParametersForAlgorithm(algorithm: AlgorithmKey): void {
		this.parametersFacadeService.dispatch(ParameterActions.loadParameters({ arg: algorithm }));

		this.parametersFacadeService.parameters$
			.pipe(
				map((state: ParametersState) => state[algorithm]?.data || []),
				skip(1),
				untilDestroyed(this)
			)
			.subscribe((newParameters) => {
				this.buildFormArray(newParameters);
			});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	private buildFormArray(parameters: ParametersDto[]) {
		this.parametersFormArray.clear();

		parameters.forEach((param) => {
			this.parametersFormArray.push(this.fb.control(param.defaultValue));
		});

		if (this.isScriptActive) {
			this.paramsFormGroup.disable();
		} else {
			this.paramsFormGroup.enable();
		}

		this.parameters = parameters;
	}

	public get parametersFormatted(): ScriptArguments {
		const scriptArguments: ScriptArguments = {};

		const values = this.parametersFormArray.getRawValue();
		this.parameters.forEach((param, index) => {
			scriptArguments[param.argName] = values[index];
		});

		return scriptArguments;
	}

	ngOnDestroy() {
		this.parentFormGroup.removeControl(this.controlKey);
	}
}
