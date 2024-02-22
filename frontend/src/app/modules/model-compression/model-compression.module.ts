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
