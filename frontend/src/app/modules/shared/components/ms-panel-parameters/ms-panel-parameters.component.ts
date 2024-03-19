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

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

/**
 * Usage Guide for MsPanelParametersComponent
 *
 * Displaying the Component:
 * - Ensure to pass 'formArrayName' from the parent to the child component.
 * - Example usage in a template:
 *   <ms-panel-parameters #panelParameters formArrayName="params"></ms-panel-parameters>
 *
 * Accessing Parameters:
 * - To access the parameters in your component class:
 *   1. Use '@ViewChild' to reference the MsPanelParametersComponent.
 *      @ViewChild('panelParameters', { static: false }) panelParametersComponent!: MsPanelParametersComponent;
 *   2. Retrieve the formatted parameters suitable for PYTHON configs using:
 *      this.panelParametersComponent.parametersFormatted
 *
 * Required Form Structure in Parent Component:
 * - The parent component should have a FormGroup that includes:
 *   - An 'algorithm' field (FormGroup) with a nested 'alg' FormControl field.
 *   - A 'params' field corresponding to the MsPanelParametersComponent.
 * - Example:
 *   this.form = this.fb.group({
 *     algorithm: this.fb.group({
 *       alg: ['']
 *     }),
 *     params: this.fb.array([]),
 *     // ... other fields as required
 *   });
 *
 * Note: The current implementation relies heavily on form structures,
 * specifically with direct references like this.form.parent!.get('algorithm.alg').
 * Consider refactoring for improved decoupling and flexibility, possibly by integrating a dedicated state management approach.
 */

@UntilDestroy()
@Component({
	selector: 'ms-panel-parameters',
	templateUrl: './ms-panel-parameters.component.html',
	styleUrls: ['./ms-panel-parameters.component.scss']
})
export class MsPanelParametersComponent implements OnInit {
	readonly RoutesList = RoutesList;

	@Input() algorithm?: AlgorithmKey;
	private alg: AlgorithmKey = DEFAULT_SELECTED_ALGORITHM;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['algorithm'] && changes['algorithm'].currentValue) {
			this.alg = changes['algorithm'].currentValue;
			this.loadParametersForAlgorithm(this.alg);
		}
	}

	form!: FormGroup;

	isScriptActive: boolean = false;
	parameters: ParametersDto[] = [];

	get parametersArray(): FormArray {
		return this.form.get('parametersArray') as FormArray;
	}

	constructor(
		private fb: FormBuilder,
		private controlContainer: ControlContainer,
		private parametersFacadeService: ParametersFacadeService,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initializeForm();

		this.listenToScriptStateChanges();
	}

	private initializeForm(): void {
		this.form = this.fb.group({
			parametersArray: this.fb.array([])
		});

		(this.controlContainer?.control?.parent as FormGroup)?.setControl(this.controlContainer.name as string, this.form);
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
				this.parameters = newParameters;
				this.buildFormArray(this.parameters);
			});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	private buildFormArray(parameters: ParametersDto[]) {
		this.parametersArray.clear();

		parameters.forEach((param) => {
			this.parametersArray.push(this.fb.control(param.defaultValue));
		});

		if (this.isScriptActive) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	public get parametersFormatted(): ScriptArguments {
		const scriptArguments: ScriptArguments = {};

		const values = this.parametersArray.getRawValue();
		this.parameters.forEach((param, index) => {
			scriptArguments[param.argName] = values[index];
		});

		return scriptArguments;
	}
}
