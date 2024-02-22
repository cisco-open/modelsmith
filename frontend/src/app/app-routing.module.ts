import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { ModeSelectGuard } from './modules/core/guards/mode-select.guard';
import { RedirectIfAuthenticatedGuard } from './modules/core/guards/redirect-if-authenticated.guard';
import { RoutesList } from './modules/core/models/enums/routes-list.enum';
import { MsMainLayoutComponent } from './modules/shared/components/ms-main-layout/ms-main-layout.component';

const routes: Routes = [
	{
		path: RoutesList.AUTH.ROOT,
		loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
		canActivate: [RedirectIfAuthenticatedGuard]
	},
	{
		path: RoutesList.MODE_SELECT.ROOT,
		loadChildren: () => import('./modules/mode-select/mode-select.module').then((m) => m.ModeSelectModule),
		canActivate: [AuthGuard, ModeSelectGuard]
	},
	{
		path: RoutesList.DEMO.ROOT,
		loadChildren: () => import('./modules/demo/demo.module').then((m) => m.DemoModule)
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: RoutesList.AUTH.ROOT
	},
	{
		path: '',
		component: MsMainLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: RoutesList.WIZARD.ROOT, pathMatch: 'full' },
			{
				path: RoutesList.WIZARD.ROOT,
				loadChildren: () => import('./modules/wizard/wizard.module').then((m) => m.WizardModule)
			},
			{
				path: RoutesList.MODEL_COMPRESSION.ROOT,
				loadChildren: () =>
					import('./modules/model-compression/model-compression.module').then((m) => m.ModelCompressionModule)
			},
			{
				path: RoutesList.MACHINE_UNLEARNING.ROOT,
				loadChildren: () =>
					import('./modules/machine-unlearning/machine-unlearning.module').then((m) => m.MachineUnlearningModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
