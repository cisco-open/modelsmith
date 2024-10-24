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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { WIZARD_STEPS_ROUTES } from './models/wizard-steps-routes.constants';

export const GUIDED_MODE_ROUTES: Routes = [
	{
		path: '',
		component: WizardComponent,
		children: [
			{
				path: '',
				redirectTo: WIZARD_STEPS_ROUTES.PRETRAINED_MODEL,
				pathMatch: 'full'
			},
			{
				path: WIZARD_STEPS_ROUTES.PRETRAINED_MODEL,
				component: StepPretrainedModelComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.PRUNING_TIME,
				component: StepPruningTimeComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.PTQ_TIME,
				component: StepPtqTimeComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.SIMILAR_ACCURACY,
				component: StepSimilarAccuracyComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.HIGHER_ACCURACY,
				component: StepHigherAccuracyComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.RECOMMENDED_BASIC_PTQ,
				component: StepRecommendBasicPtqComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.RECOMMENDED_BRECQ,
				component: StepRecommendBrecqComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.RECOMMENDED_GRASP,
				component: StepRecommendGraspComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.RECOMMENDED_ITERATIVE,
				component: StepRecommendIterativeComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.RECOMMENDED_MINMAX,
				component: StepRecommendMinmaxComponent
			},
			{
				path: WIZARD_STEPS_ROUTES.RECOMMENDED_ITERATIVE_ONE_SHOT,
				component: StepRecommendIterativeOneShotComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(GUIDED_MODE_ROUTES)],
	exports: [RouterModule]
})
export class WizardRoutingModule {}
