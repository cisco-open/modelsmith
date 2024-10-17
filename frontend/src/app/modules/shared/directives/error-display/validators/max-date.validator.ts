//   Copyright 2024 Cisco Systems, Inc.

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

import { AbstractControl, ValidatorFn } from '@angular/forms';

export const MAX_DATE_VALIDATOR_IDENTIFIER: string = 'maxDate';

export function maxDateValidator(maxDate: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const controlDate = new Date(control.value);
		const maxDateValue = new Date(maxDate);

		if (control.value && controlDate > maxDateValue) {
			return { maxDate: { requiredDate: maxDate, actualDate: control.value } };
		}
		return null;
	};
}
