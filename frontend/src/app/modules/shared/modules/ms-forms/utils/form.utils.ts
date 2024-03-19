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

import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ONLY_DIGITS_VALIDATOR_IDENTIFIER } from '../validators/only-digits.validator';

export function getValidationErrorMessage(errors: ValidationErrors | null): string | undefined {
	if (!errors) {
		return;
	}

	const error = Object.keys(errors)[0];

	switch (error) {
		case 'required':
			return 'Field required';
		case 'email':
			return 'Email required';
		case ONLY_DIGITS_VALIDATOR_IDENTIFIER:
			return 'Only numeric characters allowed';
		default: {
			return error;
		}
	}
}

export function isFormValid(form: FormGroup): any {
	return findInvalidControls(form.controls).length === 0;
}

export function findInvalidControls(controls: any): any {
	const ctrls = Object.values(controls);
	const names = Object.keys(controls);
	return ctrls
		.map((a, i) => [a, i])
		.filter((a) => (a[0] as FormControl).invalid)
		.flatMap((a) => {
			if (a[0] instanceof FormArray) {
				return findInvalidArrayControls(a[0].controls);
			} else if (a[0] instanceof FormGroup) {
				return findInvalidControls(a[0].controls);
			} else {
				(a[0] as any).markAllAsTouched();
				(a[0] as any).updateValueAndValidity();
				return names[a[1] as number];
			}
		});
}

export function findInvalidArrayControls(controls: AbstractControl[]): any {
	const ctrls = Object.values(controls);
	const names = Object.keys(controls);
	return ctrls
		.map((a, i) => [a, i])
		.filter((a) => (a[0] as FormControl).invalid)
		.flatMap((a) => {
			if (a[0] instanceof FormArray) {
				return findInvalidArrayControls(a[0].controls);
			} else if (a[0] instanceof FormGroup) {
				return findInvalidControls(a[0].controls);
			} else {
				return names[a[1] as number];
			}
		});
}
