import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesList } from '../core/models/enums/routes-list.enum';
import { MachineUnlearningComponent } from './components/machine-unlearning/machine-unlearning.component';

export const MACHINE_UNLEARNING_ROUTES: Routes = [
	{
		path: '',
		component: MachineUnlearningComponent
	},
	{
		path: RoutesList.MACHINE_UNLEARNING.RUNNING.ROOT,
		loadChildren: () => import('../running/running.module').then((m) => m.RunningModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(MACHINE_UNLEARNING_ROUTES)],
	exports: [RouterModule]
})
export class MachineUnlearningRoutingModule {}
