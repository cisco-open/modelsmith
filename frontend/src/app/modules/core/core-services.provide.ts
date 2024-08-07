import { ENVIRONMENT_INITIALIZER, inject, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ScriptActions } from '../../state/core/script';
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

export function provideCoreServices(): Provider[] {
	return [
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
			provide: ENVIRONMENT_INITIALIZER,
			multi: true,
			useValue() {
				const navigationService = inject(NavigationService);
				const pageSpinningIndicatorService = inject(PageRunningScriptSpiningIndicatorService);
				const registry = inject(MatIconRegistry);
				const scriptFacadeService = inject(ScriptFacadeService);

				navigationService.trackNavigationHistory();
				pageSpinningIndicatorService.trackCurrentRunningPage();
				registry.registerFontClassAlias('icomoon', 'ms');
				scriptFacadeService.dispatch(ScriptActions.fetchScriptStatus());
			}
		}
	];
}
