import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CLIENT } from '../../app.tokens';
import { ClientBackend } from '../../services/client/client-backend';
import { AppHttpInterceptor } from '../../services/interceptor/app-http-interceptor';
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
	BannerService,
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

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
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
		RedirectIfAuthenticatedGuard,
		ModeSelectGuard,
		BannerService,
		ScriptFacadeService,
		ConfigsFacadeService,
		AuthFacadeService,
		FileService,
		FileFacadeService,
		NavigationService,
		ChartsFacadeService,
		ParametersFacadeService,
		TerminalFacadeService,
		StatisticsFacadeService,
		{
			provide: CLIENT,
			useFactory: (httpClient: HttpClient) => {
				return new ClientBackend(httpClient);
			},
			deps: [HttpClient]
		},
		{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
	]
})
export class CoreModule {
	constructor(
		@Optional() @SkipSelf() parent: CoreModule,
		private registry: MatIconRegistry,
		private scriptFacadeService: ScriptFacadeService
	) {
		if (parent != null) {
			throw new Error('Core Module already loaded.');
		}

		this.registerModelsmithIcons();
		this.scriptFacadeService.dispatch(ScriptActions.fetchScriptStatus());
	}

	private registerModelsmithIcons(): void {
		this.registry.registerFontClassAlias('icomoon', 'ms');
	}
}
