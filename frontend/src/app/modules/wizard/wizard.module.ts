import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
	imports: [CommonModule, SharedModule, WizardRoutingModule],
	providers: [WizardUtilsService]
})
export class WizardModule {}
