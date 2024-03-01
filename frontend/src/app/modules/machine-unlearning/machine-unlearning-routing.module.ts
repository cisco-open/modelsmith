import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineUnlearningComponent } from './components/machine-unlearning/machine-unlearning.component';

export const MACHINE_UNLEARNING_ROUTES: Routes = [
	{
		path: '',
		component: MachineUnlearningComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(MACHINE_UNLEARNING_ROUTES)],
	exports: [RouterModule]
})
export class MachineUnlearningRoutingModule {}
