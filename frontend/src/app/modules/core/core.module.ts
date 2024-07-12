//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MAT_SELECTSEARCH_DEFAULT_OPTIONS, MatSelectSearchOptions } from 'ngx-mat-select-search';
import { CLIENT } from '../../app.tokens';
import { ClientBackend } from '../../services/client/client-backend';
import { AppErrorHandlingInterceptor } from '../../services/interceptor/app-error-handling-interceptor';
import { AppLoadingInterceptor } from '../../services/interceptor/app-loading-interceptor';
import { coreReducers } from '../../state/core';
import { AuthEffects } from '../../state/core/auth';
import { ChartsEffects } from '../../state/core/charts';
import { FileEffects } from '../../state/core/file';
import { ModelsEffects } from '../../state/core/models/models.effects';
import { ParametersEffects } from '../../state/core/parameters';
import { ScriptActions, ScriptEffects } from '../../state/core/script';
import { StatisticsEffects } from '../../state/core/statistics';
import { TerminalEffects } from '../../state/core/terminal';
import { AuthGuard } from './guards/auth.guard';
import { ModeSelectGuard } from './guards/mode-select.guard';
import { RedirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';
import {
	AuthFacadeService,
	ChartsFacadeService,
	ConfigsFacadeService,
	FileFacadeService,
	FileService,
	NavigationService,
	ParametersFacadeService,
	ScriptFacadeService,
	StatisticsFacadeService,
	TerminalFacadeService,
	WebsocketService
} from './services';
import { ModelsFacadeService } from './services/models-facade.service';
import { PageRunningScriptSpiningIndicatorService } from './services/page-running-script-spinning-indicator.service';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		StoreModule.forFeature('core', coreReducers),
		EffectsModule.forFeature([
			AuthEffects,
			ScriptEffects,
			FileEffects,
			ChartsEffects,
			ParametersEffects,
			TerminalEffects,
			StatisticsEffects,
			ModelsEffects
		])
	],
	providers: [
		WebsocketService,
		AuthGuard,
		NavigationService,
		RedirectIfAuthenticatedGuard,
		ModeSelectGuard,
		ScriptFacadeService,
		ConfigsFacadeService,
		AuthFacadeService,
		FileService,
		FileFacadeService,
		ChartsFacadeService,
		ParametersFacadeService,
		TerminalFacadeService,
		StatisticsFacadeService,
		PageRunningScriptSpiningIndicatorService,
		ModelsFacadeService,
		{
			provide: CLIENT,
			useFactory: (httpClient: HttpClient) => {
				return new ClientBackend(httpClient);
			},
			deps: [HttpClient]
		},
		{
			provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
			useValue: <MatSelectSearchOptions>{
				placeholderLabel: 'Search...',
				noEntriesFoundLabel: 'No matching entries found...'
			}
		},
		{ provide: HTTP_INTERCEPTORS, useClass: AppErrorHandlingInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AppLoadingInterceptor, multi: true },
		provideHttpClient(withInterceptorsFromDi())
	]
})
export class CoreModule {
	constructor(
		@Optional() @SkipSelf() parent: CoreModule,
		private registry: MatIconRegistry,
		private scriptFacadeService: ScriptFacadeService,
		private navigationService: NavigationService,
		private pageSpinningIndicatorService: PageRunningScriptSpiningIndicatorService
	) {
		if (parent !== null) {
			throw new Error('Core Module already loaded.');
		}

		this.navigationService.trackNavigationHistory();
		this.pageSpinningIndicatorService.trackCurrentRunningPage();

		this.registerModelSmithIcons();
		this.scriptFacadeService.dispatch(ScriptActions.fetchScriptStatus());
	}

	private registerModelSmithIcons(): void {
		this.registry.registerFontClassAlias('icomoon', 'ms');
	}
}
