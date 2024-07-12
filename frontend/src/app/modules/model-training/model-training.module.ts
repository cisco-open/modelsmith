// Copyright 2024 Cisco Systems, Inc. and its affiliates

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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MsEmptyStateComponent } from '../shared/components/ms-empty-state/ms-empty-state.component';
import { MsPanelModelTrainingComponent } from '../shared/components/ms-panel-model-training/ms-panel-model-training.component';
import { MsPanelParametersComponent } from '../shared/components/ms-panel-parameters/ms-panel-parameters.component';
import { MsTerminalComponent } from '../shared/components/ms-terminal/ms-terminal.component';
import { AdaptiveFileSizePipe } from '../shared/pipes/adaptive-file-size.pipe';
import { ParametersLabelPipe } from '../shared/pipes/parameters-label.pipe';
import { ReadableDurationPipe } from '../shared/pipes/readable-duration.pipe';
import { ModelTrainingComponent } from './components/model-training/model-training.component';
import { PanelAlgorithmTypeForTrainingComponent } from './components/panel-algorithm-type-for-training/panel-algorithm-type-for-training.component';
import { PanelModelMetadataComponent } from './components/panel-model-metadata/panel-model-metadata.component';
import { ModelTrainingRoutingModule } from './model-training-routing.module';

@NgModule({
	declarations: [ModelTrainingComponent, PanelAlgorithmTypeForTrainingComponent, PanelModelMetadataComponent],
	imports: [
		CommonModule,
		ModelTrainingRoutingModule,
		MsTerminalComponent,
		MsPanelModelTrainingComponent,
		MsPanelParametersComponent,
		AdaptiveFileSizePipe,
		ReadableDurationPipe,
		ParametersLabelPipe,
		MsEmptyStateComponent,
		MatCardModule,
		MatDividerModule,
		MatSelectModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule
	]
})
export class ModelTrainingModule {}
