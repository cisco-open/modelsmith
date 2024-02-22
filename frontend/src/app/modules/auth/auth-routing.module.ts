import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesList } from '../core/models/enums/routes-list.enum';
import { LoginComponent } from './components/login/login.component';

export const AUTH_ROUTES: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: RoutesList.AUTH.LOGIN
	},
	{
		path: RoutesList.AUTH.LOGIN,
		component: LoginComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(AUTH_ROUTES)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
