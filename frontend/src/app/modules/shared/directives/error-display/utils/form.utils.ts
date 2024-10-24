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

import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { COMMA_SEPARATED_VALUES_VALIDATOR_IDENTIFIER } from '../validators/comma-separated-values.validator';
import { INTERVAL_VALIDATOR_IDENTIFIER } from '../validators/interval.validator';
import { MAX_DATE_VALIDATOR_IDENTIFIER } from '../validators/max-date.validator';
import { MAX_DECIMALS_VALIDATOR_IDENTIFIER } from '../validators/max-decimals.validator';
import { MIN_DATE_VALIDATOR_IDENTIFIER } from '../validators/min-date.validator';
import { ONLY_DIGITS_VALIDATOR_IDENTIFIER } from '../validators/only-digits.validator';

export function getValidationErrorMessage(errors: ValidationErrors | null): string | undefined {
	if (!errors) return;

	const [[error, details]] = Object.entries(errors);

	const errorMessages: Record<string, string | ((details: any) => string)> = {
		required: 'Field is required',
		email: 'Invalid email format',
		min: (d) => `Minimum allowed value is ${d.min}`,
		max: (d) => `Maximum allowed value is ${d.max}`,
		minLength: (d) => `Minimum length is ${d.requiredLength} characters`,
		maxLength: (d) => `Maximum length is ${d.requiredLength} characters`,
		pattern: 'Invalid format',
		nullValidator: 'Field must not be null',
		requiredTrue: 'Field must be true (checked)',
		url: 'Invalid URL format',
		unique: 'Value must be unique',
		whitespace: 'Field cannot be empty or contain only whitespace',
		ip: 'Invalid IP address format',
		uuid: 'Invalid UUID format',
		[MAX_DATE_VALIDATOR_IDENTIFIER]: (d) => `Date must be before ${d.maxDate}`,
		[MIN_DATE_VALIDATOR_IDENTIFIER]: (d) => `Date must be after ${d.minDate}`,
		[ONLY_DIGITS_VALIDATOR_IDENTIFIER]: 'Only digits are allowed',
		[MAX_DECIMALS_VALIDATOR_IDENTIFIER]: (d) => `Maximum ${d.maxDecimals} decimal places allowed`,
		[COMMA_SEPARATED_VALUES_VALIDATOR_IDENTIFIER]: 'Values must be a comma-separated list of numbers',
		[INTERVAL_VALIDATOR_IDENTIFIER]: (d) => `Value must be between ${d.min} and ${d.max}.`
	};

	const message = errorMessages[error];
	return typeof message === 'function' ? message(details) : message || `Unknown validation error: ${error}`;
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
