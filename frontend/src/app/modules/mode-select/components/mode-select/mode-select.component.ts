import { Component, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ConfigActions } from '../../../../state/core/configs/configs.actions';
import { AppModes } from '../../../core/models/enums/app-modes.enum';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { AuthFacadeService } from '../../../core/services/auth-facade.service';
import { ConfigsFacadeService } from '../../../core/services/configs-facade.service';

@Component({
	selector: 'ms-mode-select',
	templateUrl: './mode-select.component.html',
	styleUrls: ['./mode-select.component.scss']
})
export class ModeSelectComponent {
	@ViewChild('configureDefaultMode') defaultModeCheckbox!: MatCheckbox;

	constructor(
		public authFacadeService: AuthFacadeService,
		private configFacadeService: ConfigsFacadeService,
		private router: Router
	) {}

	setModeAndNavigate(mode?: AppModes) {
		const selectedMode = this.defaultModeCheckbox.checked ? mode : undefined;
		this.configFacadeService.dispatch(ConfigActions.setDefaultMode({ mode: selectedMode }));
		this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: selectedMode }));
	}

	goToExpertMode() {
		this.setModeAndNavigate(AppModes.EXPERT);
		this.router.navigate([RoutesList.MODEL_COMPRESSION.ROOT]);
	}

	goToGuidedMode() {
		this.setModeAndNavigate(AppModes.GUIDED);
		this.router.navigate([RoutesList.WIZARD.ROOT]);
	}
}
