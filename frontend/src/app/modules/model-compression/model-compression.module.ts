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
import { modelCompressionReducers } from '../../state/model-compression/model-compression.reducer';
import { ModelsEffects } from '../../state/model-compression/models/models.effects';
import { SharedModule } from '../shared/shared.module';
import { PanelAlgorithmComponent } from './components/panel-algorithm/panel-algorithm.component';
import { PanelModelComponent } from './components/panel-model/panel-model.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ModelCompressionRoutingModule } from './model-compression-routing.module';
import { ModelsFacadeService } from './services/models-facade.service';

@NgModule({
	declarations: [ProjectSettingsComponent, PanelModelComponent, PanelAlgorithmComponent],
	imports: [
		CommonModule,
		SharedModule,
		ModelCompressionRoutingModule,
		StoreModule.forFeature('model-compression', modelCompressionReducers),
		EffectsModule.forFeature([ModelsEffects])
	],
	providers: [ModelsFacadeService]
})
export class ModelCompressionModule {}
