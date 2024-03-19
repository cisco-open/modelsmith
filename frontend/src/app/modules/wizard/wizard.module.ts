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
import { MsCardSelectorComponent } from '../shared/components/ms-card-selector/ms-card-selector.component';
import { MsTerminalComponent } from '../shared/components/ms-terminal/ms-terminal.component';
import { SharedModule } from '../shared/shared.module';
import { StepHigherAccuracyComponent } from './components/step-higher-accuracy/step-higher-accuracy.component';
import { StepPretrainedModelComponent } from './components/step-pretrained-model/step-pretrained-model.component';
import { StepPruningTimeComponent } from './components/step-pruning-time/step-pruning-time.component';
import { StepPtqTimeComponent } from './components/step-ptq-time/step-ptq-time.component';
import { StepRecommendBasicPtqComponent } from './components/step-recommend-basic-ptq/step-recommend-basic-ptq.component';
import { StepRecommendBrecqComponent } from './components/step-recommend-brecq/step-recommend-brecq.component';
import { StepRecommendGraspComponent } from './components/step-recommend-grasp/step-recommend-grasp.component';
import { StepRecommendIterativeOneShotComponent } from './components/step-recommend-iterative-one-shot/step-recommend-iterative-one-shot.component';
import { StepRecommendIterativeComponent } from './components/step-recommend-iterative/step-recommend-iterative.component';
import { StepRecommendMinmaxComponent } from './components/step-recommend-minmax/step-recommend-minmax.component';
import { StepSimilarAccuracyComponent } from './components/step-similar-accuracy/step-similar-accuracy.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizardUtilsService } from './services/wizard-utils.service';
import { WizardRoutingModule } from './wizard-routing.module';

@NgModule({
	declarations: [
		WizardComponent,
		StepPretrainedModelComponent,
		StepPruningTimeComponent,
		StepRecommendIterativeComponent,
		StepSimilarAccuracyComponent,
		StepRecommendIterativeOneShotComponent,
		StepRecommendGraspComponent,
		StepPtqTimeComponent,
		StepHigherAccuracyComponent,
		StepRecommendBrecqComponent,
		StepRecommendBasicPtqComponent,
		StepRecommendMinmaxComponent
	],
	imports: [CommonModule, SharedModule, WizardRoutingModule, MsTerminalComponent, MsCardSelectorComponent],
	providers: [WizardUtilsService]
})
export class WizardModule {}
