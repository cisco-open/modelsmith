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

import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, map, skip, startWith, switchMap, take, tap } from 'rxjs';
import { ParametersDto } from '../../../../services/client/models/parameters/parameter.interface-dto';
import { ScriptArguments } from '../../../../services/client/models/script/script-arguments.interface-dto';
import { ParameterActions } from '../../../../state/core/parameters/parameters.actions';
import { ParametersState } from '../../../../state/core/parameters/parameters.state';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { ParametersFacadeService } from '../../../core/services/parameters-facade.service';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { DEFAULT_SELECTED_ALGORITHM } from '../../../model-compression/models/constants/algorithm.constants';
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

	isScriptActive: boolean = false;
	alg: string = DEFAULT_SELECTED_ALGORITHM;

	parameters: ParametersDto[] = [];
	form!: FormGroup;

	get parametersArray(): FormArray {
		return this.form.get('parametersArray') as FormArray;
	}

	constructor(
		private parametersFacadeService: ParametersFacadeService,
		private controlContainer: ControlContainer,
		private fb: FormBuilder,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.form = this.fb.group({
			parametersArray: this.fb.array([])
		});
		(this.controlContainer?.control?.parent as FormGroup)?.setControl(this.controlContainer.name as string, this.form);

		this.listenToScriptStateChanges();
		this.listenToAlgorithmChanges();
	}

	/**
	 * Subscribes to changes in the selected algorithm and updates the parameters accordingly,
	 * including an initial load of parameters on component initialization.
	 *
	 * This function employs the RxJS 'startWith' operator to handle both the initial load and
	 * subsequent changes to the 'algorithm.alg' field in the form. Upon component initialization,
	 * 'startWith' emits the current value of 'algorithm.alg' (or a default value if it's not set),
	 * triggering the loading of the initial set of parameters. After the initial load, this function
	 * continues to listen for any changes made to the 'algorithm.alg' field. When a change is detected,
	 * it dispatches an action to load the new parameters corresponding to the selected algorithm.
	 *
	 * The parameters state is then observed to update the form array with the latest parameters, ensuring
	 * that the form consistently reflects the parameters associated with the currently selected algorithm.
	 * By using 'startWith', we efficiently combine the initial data loading with the reactive update mechanism,
	 * resulting in a streamlined and more maintainable approach. This method also helps in minimizing
	 * redundant code and avoids the flickering effect caused by delayed data loading.
	 */
	private listenToAlgorithmChanges(): void {
		const algorithmControl = this.form.parent!.get('algorithm.alg');
		const initialValue = algorithmControl?.value || DEFAULT_SELECTED_ALGORITHM;

		this.form
			.parent!.get('algorithm.alg')
			?.valueChanges.pipe(
				startWith(initialValue),
				debounceTime(50),
				distinctUntilChanged(),
				tap((algValue) => {
					this.alg = algValue;
					this.parametersFacadeService.dispatch(ParameterActions.loadParameters({ arg: algValue }));
				}),
				switchMap(() =>
					this.parametersFacadeService.parameters$.pipe(
						map((state: ParametersState) => state[this.alg]?.data || []),
						skip(1), // Skip the first emission, which might be the old or default value
						take(1) // Then take the next emission, which should be the updated value
					)
				),
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
