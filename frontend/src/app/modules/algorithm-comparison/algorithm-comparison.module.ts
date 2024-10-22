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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxColorsModule } from 'ngx-colors';
import { DrawerService, MsDrawerComponent } from '../core/components/ms-drawer';
import { MsEmptyStateComponent } from '../shared/components/ms-empty-state/ms-empty-state.component';
import { MsLineChartComponent } from '../shared/components/ms-line-chart/ms-line-chart.component';
import { ChartToolsGlobalSignalsService } from '../shared/components/ms-line-chart/services/chart-tools-global-signals.service';
import { EllipsisDirective } from '../shared/directives/ellipsis.directive';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { AdaptiveFileSizePipe } from '../shared/pipes/adaptive-file-size.pipe';
import { EmptyTableFieldPipe } from '../shared/pipes/empty-table-field.pipe';
import { HasKeysPipe } from '../shared/pipes/has-keys.pipe';
import { ParametersLabelPipe } from '../shared/pipes/parameters-label.pipe';
import { ReadableDurationPipe } from '../shared/pipes/readable-duration.pipe';
import { ReverseArrayPipe } from '../shared/pipes/reverse-array.pipe';
import { AlgorithmComparisonRoutingModule } from './algorithm-comparison-routing.module';
import { AlgorithmComparisonChartComponent } from './components/algorithm-comparison-chart/algorithm-comparison-chart.component';
import { AlgorithmComparisonListComponent } from './components/algorithm-comparison-list/algorithm-comparison-list.component';
import { AlgorithmComparisonTableComponent } from './components/algorithm-comparison-table/algorithm-comparison-table.component';
import { AlgorithmComparisonComponent } from './components/algorithm-comparison/algorithm-comparison.component';
import { ChartColorsFormControlsComponent } from './components/chart-colors-form-controls/chart-colors-form-controls.component';
import { RunDrawerActionsComponent } from './components/run-drawer-actions/run-drawer-actions.component';
import { RecordsDataService } from './services/records-data.service';
import { RecordsFacadeService } from './services/records-facade.service';

@NgModule({
	declarations: [
		AlgorithmComparisonComponent,
		RunDrawerActionsComponent,
		AlgorithmComparisonListComponent,
		AlgorithmComparisonChartComponent,
		ChartColorsFormControlsComponent,
		AlgorithmComparisonTableComponent
	],
	imports: [
		CommonModule,
		AlgorithmComparisonRoutingModule,
		MsDrawerComponent,
		NgxColorsModule,
		MsLineChartComponent,
		ReadableDurationPipe,
		ParametersLabelPipe,
		ReverseArrayPipe,
		MsEmptyStateComponent,
		EllipsisDirective,
		EmptyTableFieldPipe,
		AdaptiveFileSizePipe,
		HasKeysPipe,
		MatExpansionModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatDividerModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatCardModule,
		MatTableModule,
		MatSlideToggleModule,
		MatButtonModule,
		MatInputModule
	],
	providers: [DrawerService, RecordsFacadeService, RecordsDataService, ChartToolsGlobalSignalsService]
})
export class AlgorithmComparisonModule {}
