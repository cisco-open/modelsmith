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

import { AbstractControl, ValidatorFn } from '@angular/forms';

export const MAX_DECIMALS_VALIDATOR_IDENTIFIER: string = 'maxDecimals';

export function maxDecimalsValidator(maxDecimals: number): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		if (!control.value || isNaN(control.value)) {
			return null;
		}

		const value = control.value.toString();
		const decimalPart = value.split('.')[1];

		if (decimalPart && decimalPart.length > maxDecimals) {
			return { maxDecimals: { requiredDecimals: maxDecimals, actualDecimals: decimalPart.length } };
		}

		return null;
	};
}
