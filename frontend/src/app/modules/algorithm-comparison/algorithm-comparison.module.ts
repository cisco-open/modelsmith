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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { runRecordsReducers } from '../../state/run-records';
import { RecordsEffects } from '../../state/run-records/records';
import { SharedModule } from '../shared/shared.module';
import { DrawerService, MsDrawerComponent } from '../shared/standalone/ms-drawer';
import { MsEmptyStateComponent } from '../shared/standalone/ms-empty-state/ms-empty-state.component';
import { MsLineChartComponent } from '../shared/standalone/ms-line-chart/ms-line-chart.component';
import { ParametersLabelPipe } from '../shared/standalone/pipes/parameters-label.pipe';
import { ReadableDurationPipe } from '../shared/standalone/pipes/readable-duration.pipe';
import { AlgorithmComparisonRoutingModule } from './algorithm-comparison-routing.module';
import { AddRunDrawerComponent } from './components/add-run-drawer/add-run-drawer.component';
import { AlgorithmComparisonComponent } from './components/algorithm-comparison/algorithm-comparison.component';
import { RecordsFacadeService } from './services/records-facade.service';

@NgModule({
	declarations: [AlgorithmComparisonComponent, AddRunDrawerComponent],
	imports: [
		CommonModule,
		AlgorithmComparisonRoutingModule,
		MsDrawerComponent,
		SharedModule,
		StoreModule.forFeature('runRecords', runRecordsReducers),
		EffectsModule.forFeature([RecordsEffects]),
		MsLineChartComponent,
		ReadableDurationPipe,
		ParametersLabelPipe,
		MsEmptyStateComponent
	],
	providers: [DrawerService, RecordsFacadeService]
})
export class AlgorithmComparisonModule {}
