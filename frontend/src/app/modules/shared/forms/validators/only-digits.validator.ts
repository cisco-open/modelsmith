import { AbstractControl, ValidatorFn } from '@angular/forms';

export const ONLY_DIGITS_VALIDATOR_IDENTIFIER: string = 'onlyDigits';

export function onlyDigitsValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const { value } = control;
		if (!value) {
			return null;
		}

		// Regular expression to match integers and floats but not scientific notation with 'e'
		const reg = /^\d+(\.\d+)?$/;
		if (reg.test(value) === false) {
			return { [ONLY_DIGITS_VALIDATOR_IDENTIFIER]: { actual: value } };
		}

		return null;
	};
}
