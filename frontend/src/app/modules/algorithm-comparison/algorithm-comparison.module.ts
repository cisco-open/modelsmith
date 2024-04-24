import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { runRecordsReducers } from '../../state/run-records';
import { RecordsEffects } from '../../state/run-records/records';
import { SharedModule } from '../shared/shared.module';
import { MsDrawerComponent } from '../shared/standalone/ms-drawer';
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
		EffectsModule.forFeature([RecordsEffects])
	],
	providers: [RecordsFacadeService]
})
export class AlgorithmComparisonModule {}
