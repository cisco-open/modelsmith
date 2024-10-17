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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../../core/core.module';
import { MaterialModule } from '../../modules/material.module';
import { SharedModule } from '../../shared.module';
import { MsBannerComponent } from './ms-banner.component';

const MODULE_IMPORTS = [CoreModule, BrowserAnimationsModule, SharedModule, MaterialModule, ReactiveFormsModule];

describe('MsBannerComponent', () => {
	let component: MsBannerComponent;
	let fixture: ComponentFixture<MsBannerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: MODULE_IMPORTS,
			declarations: [MsBannerComponent],
			providers: [
				{
					provide: MAT_SNACK_BAR_DATA,
					useValue: {}
				},
				{
					provide: MatSnackBarRef,
					useValue: {}
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MsBannerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});
});
