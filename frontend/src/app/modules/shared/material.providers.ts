import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Provider } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SELECTSEARCH_DEFAULT_OPTIONS, MatSelectSearchOptions } from 'ngx-mat-select-search';

export function provideCustomMaterialConfigs(): Provider[] {
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
		},
		{
			provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
			useValue: <MatSelectSearchOptions>{
				placeholderLabel: 'Search...',
				noEntriesFoundLabel: 'No matching entries found...'
			}
		}
	];
}
