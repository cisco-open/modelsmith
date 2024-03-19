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
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MsEmptyStateComponent } from '../shared/standalone/ms-empty-state/ms-empty-state.component';
import { MsLineChartComponent } from '../shared/standalone/ms-line-chart/ms-line-chart.component';
import { ChartToolsGlobalSignalsService } from '../shared/standalone/ms-line-chart/services/chart-tools-global-signals.service';
import { RunningAnimationComponent } from './components/running-animation/running-animation.component';
import { RunningMachineUnlearningChartsComponent } from './components/running-machine-unlearning-charts/running-machine-unlearning-charts.component';
import { RunningPruningChartsComponent } from './components/running-pruning-charts/running-pruning-charts.component';
import { RunningQuantizationChartsComponent } from './components/running-quantization-charts/running-quantization-charts.component';
import { RunningStatisticsComponent } from './components/running-statistics/running-statistics.component';
import { RunningComponent } from './components/running/running.component';
import { RunningRoutingModule } from './running-routing.module';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [
		RunningComponent,
		RunningPruningChartsComponent,
		RunningQuantizationChartsComponent,
		RunningMachineUnlearningChartsComponent,
		RunningAnimationComponent,
		RunningStatisticsComponent
	],
	imports: [RunningRoutingModule, CommonModule, SharedModule, MsEmptyStateComponent, MsLineChartComponent],
	providers: [ChartToolsGlobalSignalsService]
})
export class RunningModule {}
