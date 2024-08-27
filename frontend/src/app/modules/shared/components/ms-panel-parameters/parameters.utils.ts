import { Validators } from '@angular/forms';
import { ParametersDto } from '../../../../services/client/models/parameters/parameter.interface-dto';
import {
	COMMA_SEPARATED_VALUES_VALIDATOR_IDENTIFIER,
	commaSeparatedValuesValidator
} from '../../directives/error-display/validators/comma-separated-values.validator';
import {
	INTERVAL_VALIDATOR_IDENTIFIER,
	intervalValidator
} from '../../directives/error-display/validators/interval.validator';
import {
	MAX_DECIMALS_VALIDATOR_IDENTIFIER,
	maxDecimalsValidator
} from '../../directives/error-display/validators/max-decimals.validator';
import {
	ONLY_DIGITS_VALIDATOR_IDENTIFIER,
	onlyDigitsValidator
} from '../../directives/error-display/validators/only-digits.validator';

export const getValidators = (param: ParametersDto) => {
	const validators = [];

	if (param.validators) {
		for (const [key, value] of Object.entries(param.validators)) {
			switch (key) {
				case 'required':
					if (value) validators.push(Validators.required);
					break;
				case 'min':
					validators.push(Validators.min(value));
					break;
				case 'max':
					validators.push(Validators.max(value));
					break;
				case 'minLength':
					validators.push(Validators.minLength(value));
					break;
				case 'maxLength':
					validators.push(Validators.maxLength(value));
					break;
				case 'pattern':
					validators.push(Validators.pattern(value));
					break;
				case 'requiredTrue':
					if (value) validators.push(Validators.requiredTrue);
					break;
				case 'email':
					if (value) validators.push(Validators.email);
					break;
				case MAX_DECIMALS_VALIDATOR_IDENTIFIER:
					validators.push(maxDecimalsValidator(value));
					break;
				case ONLY_DIGITS_VALIDATOR_IDENTIFIER:
					validators.push(onlyDigitsValidator());
					break;
				case COMMA_SEPARATED_VALUES_VALIDATOR_IDENTIFIER:
					validators.push(commaSeparatedValuesValidator());
					break;
				case INTERVAL_VALIDATOR_IDENTIFIER:
					if (Array.isArray(value) && value.length === 2) {
						validators.push(intervalValidator(value as [number, number]));
					}
					break;
			}
		}
	}

	return validators;
};
