import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfigActions } from '../../../../state/core/configs/configs.actions';
import { SidenavConstants } from '../../../core/models/constants/sidenav.constants';
import { AppModes } from '../../../core/models/enums/app-modes.enum';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { SidenavItem } from '../../../core/models/interfaces/sidenav.interface';
import { ConfigsFacadeService } from '../../../core/services/configs-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-sidenav',
	templateUrl: './ms-sidenav.component.html',
	styleUrls: ['./ms-sidenav.component.scss']
})
export class MsSidenavComponent implements OnInit {
	readonly SidenavConstants = SidenavConstants;
	readonly Modes = AppModes;
	currentMode: AppModes | undefined;

	constructor(
		private router: Router,
		private configFacadeService: ConfigsFacadeService
	) {}

	ngOnInit(): void {
		this.configFacadeService.currentMode$.pipe(untilDestroyed(this)).subscribe((currentMode) => {
			this.currentMode = currentMode;
		});
	}

	toggleMode(): void {
		if (this.currentMode === AppModes.GUIDED) {
			this.router.navigate([`/${RoutesList.MODEL_COMPRESSION.ROOT}`]);
			this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.EXPERT }));
		} else {
			this.router.navigate([`/${RoutesList.WIZARD.ROOT}`]);
			this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.GUIDED }));
		}
	}

	trackByRoute(index: number, item: SidenavItem): string {
		return item.route;
	}
}
