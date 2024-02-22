import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
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
	imports: [RunningRoutingModule, CommonModule, SharedModule]
})
export class RunningModule {}
