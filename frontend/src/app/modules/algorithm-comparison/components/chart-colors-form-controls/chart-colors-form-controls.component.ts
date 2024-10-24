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

import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';

@Component({
	selector: 'ms-chart-colors-form-controls',
	templateUrl: './chart-colors-form-controls.component.html',
	styleUrls: ['./chart-colors-form-controls.component.scss'],
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class ChartColorsFormControlsComponent implements OnInit {
	@Input({ required: true }) controlKey = '';

	readonly CHART_BODER_COLOR_CONTROL_NAME: string = 'borderColor';
	readonly CHART_BACKGROUND_COLOR_CONTROL_NAME: string = 'backgroundColor';

	get parentFormGroup() {
		return this.controlContainer.control as FormGroup;
	}

	get chartFormGroup(): FormGroup {
		return this.parentFormGroup.get(this.controlKey) as FormGroup;
	}

	get borderColorControl(): AbstractControl | null {
		return this.chartFormGroup.get(this.CHART_BODER_COLOR_CONTROL_NAME);
	}

	get backgroundColorControl(): AbstractControl | null {
		return this.chartFormGroup.get(this.CHART_BACKGROUND_COLOR_CONTROL_NAME);
	}

	constructor(private controlContainer: ControlContainer) {}

	ngOnInit() {}
}
