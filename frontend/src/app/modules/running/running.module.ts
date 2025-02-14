//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MsEmptyStateComponent } from '../shared/components/ms-empty-state/ms-empty-state.component';
import { MsLineChartComponent } from '../shared/components/ms-line-chart/ms-line-chart.component';
import { ChartToolsGlobalSignalsService } from '../shared/components/ms-line-chart/services/chart-tools-global-signals.service';
import { RunningAnimationComponent } from './components/running-animation/running-animation.component';
import { RunningMachineUnlearningChartsComponent } from './components/running-machine-unlearning-charts/running-machine-unlearning-charts.component';
import { RunningPruningChartsComponent } from './components/running-pruning-charts/running-pruning-charts.component';
import { RunningQuantizationChartsComponent } from './components/running-quantization-charts/running-quantization-charts.component';
import { RunningStatisticsComponent } from './components/running-statistics/running-statistics.component';
import { RunningStatusBarComponent } from './components/running-status-bar/running-status-bar.component';
import { RunningComponent } from './components/running/running.component';
import { ReadableStatisticsLabelPipe } from './pipes/readable-statistics-label.pipe';
import { RunningRoutingModule } from './running-routing.module';

@NgModule({
	declarations: [
		RunningComponent,
		RunningPruningChartsComponent,
		RunningQuantizationChartsComponent,
		RunningMachineUnlearningChartsComponent,
		RunningAnimationComponent,
		RunningStatisticsComponent,
		ReadableStatisticsLabelPipe,
		RunningStatusBarComponent
	],
	imports: [
		CommonModule,
		RunningRoutingModule,
		MsEmptyStateComponent,
		MsLineChartComponent,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		FormsModule,
		ReactiveFormsModule,
		MatSlideToggleModule,
		MatTooltipModule
	],
	providers: [ChartToolsGlobalSignalsService]
})
export class RunningModule {}
