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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MsPanelModelComponent } from '../shared/components/ms-panel-model/ms-panel-model.component';
import { MsPanelParametersComponent } from '../shared/components/ms-panel-parameters/ms-panel-parameters.component';
import { MsTerminalComponent } from '../shared/components/ms-terminal/components/ms-terminal/ms-terminal.component';
import { PanelAlgorithmComponent } from './components/panel-algorithm/panel-algorithm.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ModelCompressionRoutingModule } from './model-compression-routing.module';

@NgModule({
	declarations: [ProjectSettingsComponent, PanelAlgorithmComponent],
	imports: [
		CommonModule,
		ModelCompressionRoutingModule,
		MsTerminalComponent,
		MsPanelModelComponent,
		MsPanelParametersComponent,
		MatCardModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule
	]
})
export class ModelCompressionModule {}
