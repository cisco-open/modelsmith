import { ENVIRONMENT_INITIALIZER, inject, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ScriptActions } from '../../state/core/script';
import { TerminalWebSocketService } from '../shared/components/ms-terminal/services/terminal-websocket.service';
import { DialogService } from './components/ms-dialog';
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
		TerminalWebSocketService,
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
		DialogService,
		{
			provide: ENVIRONMENT_INITIALIZER,
			multi: true,
			useValue() {
				const navigationService = inject(NavigationService);
				const pageSpinningIndicatorService = inject(PageRunningScriptSpiningIndicatorService);
				const registry = inject(MatIconRegistry);
				const scriptFacadeService = inject(ScriptFacadeService);
				const websocketService = inject(WebsocketService);
				const terminalWebSocketService = inject(TerminalWebSocketService);

				websocketService.connect();
				terminalWebSocketService.connect();

				navigationService.trackNavigationHistory();
				pageSpinningIndicatorService.trackCurrentRunningPage();
				registry.registerFontClassAlias('icomoon', 'ms');
				scriptFacadeService.dispatch(ScriptActions.fetchScriptStatus());
			}
		}
	];
}
