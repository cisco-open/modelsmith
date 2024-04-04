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
