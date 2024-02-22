import { DragDropModule } from '@angular/cdk/drag-drop';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	exports: [
		MatDividerModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatIconModule,
		MatTableModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatStepperModule,
		MatChipsModule,
		MatCheckboxModule,
		MatMenuModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatSlideToggleModule,
		DragDropModule
	],
	providers: [
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
	]
})
export class MaterialModule {}
