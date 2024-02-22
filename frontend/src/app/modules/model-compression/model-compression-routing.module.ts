import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesList } from '../core/models/enums/routes-list.enum';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';

export const MODEL_COMPRESSION_ROUTES: Routes = [
	{
		path: '',
		component: ProjectSettingsComponent
	},
	{
		path: RoutesList.MODEL_COMPRESSION.RUNNING.ROOT,
		loadChildren: () => import('../running/running.module').then((m) => m.RunningModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(MODEL_COMPRESSION_ROUTES)],
	exports: [RouterModule]
})
export class ModelCompressionRoutingModule {}
