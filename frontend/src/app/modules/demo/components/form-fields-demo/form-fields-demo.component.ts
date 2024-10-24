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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'ms-form-fields-demo',
	templateUrl: './form-fields-demo.component.html',
	styleUrls: ['./form-fields-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldsDemoComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			// Inputs
			default: [null],
			searchBar: [null],
			prefilled: ['Lorem Ipsum'],
			disabled: [{ value: null, disabled: true }],
			prefilledDisabled: [{ value: 'Lorem Ipsum', disabled: true }],
			error: [null, [Validators.required]],
			icon: [null],
			iconPrefilled: ['Lorem Ipsum'],
			iconDisabled: [{ value: null, disabled: true }],
			iconPrefilledDisabled: [{ value: 'Lorem Ipsum', disabled: true }],
			iconError: [null, [Validators.required]],

			// Inputs with validators
			required: [null, [Validators.required]],

			// Textarea
			textarea: [null],
			textareaPrefilled: ['Lorem Ipsum'],
			textareaDisabled: [{ value: null, disabled: true }],
			textareaPrefilledAndDisabled: [{ value: 'Lorem Ipsum', disabled: true }],
			textareaError: [null, [Validators.required]],

			// Dropdowns
			dropdown: [null],
			dropdownPreselected: ['option1'],
			dropdownDisabled: [{ value: null, disabled: true }],
			dropdownPreselectedAndDisabled: [{ value: 'option1', disabled: true }]
		});
	}
}
