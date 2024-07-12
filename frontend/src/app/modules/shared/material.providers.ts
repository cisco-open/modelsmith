import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Provider } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export function provideCustomMaterial(): Provider[] {
	return [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: {
				floatLabel: 'always',
				appearance: 'outline',
				density: 'cozy'
			}
		},
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { displayDefaultIndicatorType: true, showError: false }
		}
	];
}
