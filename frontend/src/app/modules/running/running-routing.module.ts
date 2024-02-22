import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunningComponent } from './components/running/running.component';

export const RUNNING_ROUTES: Routes = [
	{
		path: '',
		component: RunningComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(RUNNING_ROUTES)],
	exports: [RouterModule]
})
export class RunningRoutingModule {}
