//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { ModeSelectGuard } from './modules/core/guards/mode-select.guard';
import { RedirectIfAuthenticatedGuard } from './modules/core/guards/redirect-if-authenticated.guard';
import { RoutesList } from './modules/core/models/enums/routes-list.enum';
import { MsMainLayoutComponent } from './modules/shared/components/ms-main-layout/ms-main-layout.component';
import { runRecordsReducers } from './state/run-records';
import { RecordsEffects } from './state/run-records/records';

export const routes: Routes = [
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
			},
			{
				path: RoutesList.AWQ.ROOT,
				loadChildren: () =>
					import('./modules/llm-quantization/llm-quantization.module').then((m) => m.LlmQuantizationModule)
			},
			{
				path: RoutesList.RUNNING.ROOT,
				loadChildren: () => import('./modules/running/running.module').then((m) => m.RunningModule)
			},
			{
				path: RoutesList.MODEL_TRAINING.ROOT,
				loadChildren: () => import('./modules/model-training/model-training.module').then((m) => m.ModelTrainingModule)
			},
			{
				path: RoutesList.ALGORITHM_COMPARISON.ROOT,
				loadChildren: () =>
					import('./modules/algorithm-comparison/algorithm-comparison.module').then((m) => m.AlgorithmComparisonModule),
				providers: [
					importProvidersFrom(StoreModule.forFeature('runRecords', runRecordsReducers)),
					importProvidersFrom(EffectsModule.forFeature([RecordsEffects]))
				]
			},
			{
				path: RoutesList.MULTI_MODAL.ROOT,
				loadChildren: () => import('./modules/multi-modal/multi-modal.module').then((m) => m.MultiModalModule)
			},
			{
				path: RoutesList.ADMIN.ROOT,
				loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
			}
		]
	}
];
