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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
	MAT_SELECTSEARCH_DEFAULT_OPTIONS,
	MatSelectSearchOptions,
	NgxMatSelectSearchModule
} from 'ngx-mat-select-search';
import { MsBannerComponent } from './components/ms-banner/ms-banner.component';
import { MsFooterComponent } from './components/ms-footer/ms-footer.component';
import { MsHeaderComponent } from './components/ms-header/ms-header.component';
import { MsMainLayoutComponent } from './components/ms-main-layout/ms-main-layout.component';
import { MsPanelParametersComponent } from './components/ms-panel-parameters/ms-panel-parameters.component';
import { MsSidenavItemComponent } from './components/ms-sidenav/components/ms-sidenav-item/ms-sidenav-item.component';
import { MsSidenavComponent } from './components/ms-sidenav/ms-sidenav.component';
import { MsUserNavigationComponent } from './components/ms-user-navigation/ms-user-navigation.component';
import { MaterialModule } from './modules/material.module';
import { MsFormsModule } from './modules/ms-forms/ms-forms.module';

const COMPONENTS = [
	MsBannerComponent,
	MsFooterComponent,
	MsHeaderComponent,
	MsUserNavigationComponent,
	MsMainLayoutComponent,
	MsSidenavComponent,
	MsSidenavItemComponent,
	MsPanelParametersComponent
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		MsFormsModule
	],
	declarations: [...COMPONENTS],
	providers: [
		{
			provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
			useValue: <MatSelectSearchOptions>{
				placeholderLabel: 'Search...',
				noEntriesFoundLabel: 'No matching entries found...'
			}
		}
	],
	exports: [...COMPONENTS, MaterialModule, FormsModule, ReactiveFormsModule, NgxMatSelectSearchModule, MsFormsModule]
})
export class SharedModule {}
