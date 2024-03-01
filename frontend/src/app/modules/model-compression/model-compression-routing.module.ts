import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';

export const MODEL_COMPRESSION_ROUTES: Routes = [
	{
		path: '',
		component: ProjectSettingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(MODEL_COMPRESSION_ROUTES)],
	exports: [RouterModule]
})
export class ModelCompressionRoutingModule {}
