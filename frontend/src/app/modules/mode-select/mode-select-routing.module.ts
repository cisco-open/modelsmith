import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeSelectComponent } from './components/mode-select/mode-select.component';

export const MODE_SELECT_ROUTES: Routes = [
	{
		path: '',
		component: ModeSelectComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(MODE_SELECT_ROUTES)],
	exports: [RouterModule]
})
export class ModeSelectRoutingModule {}
