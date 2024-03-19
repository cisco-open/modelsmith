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
import { NgChartsModule } from 'ng2-charts';
import {
	MAT_SELECTSEARCH_DEFAULT_OPTIONS,
	MatSelectSearchOptions,
	NgxMatSelectSearchModule
} from 'ngx-mat-select-search';
import { MsBannerComponent } from './components/ms-banner/ms-banner.component';
import { MsFooterComponent } from './components/ms-footer/ms-footer.component';
import { MsHeaderComponent } from './components/ms-header/ms-header.component';
import { MsLineChartComponent } from './components/ms-line-chart/ms-line-chart.component';
import { ChartToolsGlobalSignalsService } from './components/ms-line-chart/services/chart-tools-global-signals.service';
import { MsMainLayoutComponent } from './components/ms-main-layout/ms-main-layout.component';
import { MsPanelParametersComponent } from './components/ms-panel-parameters/ms-panel-parameters.component';
import { MsSidenavItemComponent } from './components/ms-sidenav/components/ms-sidenav-item/ms-sidenav-item.component';
import { MsSidenavComponent } from './components/ms-sidenav/ms-sidenav.component';
import { MsUserNavigationComponent } from './components/ms-user-navigation/ms-user-navigation.component';
import { MsErrorMessageComponent } from './forms/components/ms-error-message/ms-error-message.component';
import { ErrorDisplayDirective } from './forms/directives/error-display.directive';
import { MaterialModule } from './modules/material.module';

const COMPONENTS = [
	MsBannerComponent,
	MsErrorMessageComponent,
	MsFooterComponent,
	MsHeaderComponent,
	MsUserNavigationComponent,
	MsMainLayoutComponent,
	MsSidenavComponent,
	MsSidenavItemComponent,
	MsLineChartComponent,
	MsPanelParametersComponent
];

const DIRECTIVES = [ErrorDisplayDirective];

const SHARED_DECLARATIONS = [...COMPONENTS, ...DIRECTIVES];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		NgChartsModule
	],
	declarations: [...SHARED_DECLARATIONS],
	providers: [
		{
			provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
			useValue: <MatSelectSearchOptions>{
				placeholderLabel: 'Search...',
				noEntriesFoundLabel: 'No matching entries found...'
			}
		},
		ChartToolsGlobalSignalsService
	],
	exports: [...SHARED_DECLARATIONS, MaterialModule, FormsModule, ReactiveFormsModule, NgxMatSelectSearchModule]
})
export class SharedModule {}
