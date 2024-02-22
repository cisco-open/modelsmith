import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigActions } from '../../../state/core/configs/configs.actions';
import { StorageKeys } from '../models/constants/storage.constants';
import { AppModes } from '../models/enums/app-modes.enum';
import { RoutesList } from '../models/enums/routes-list.enum';
import { ConfigsFacadeService } from '../services/configs-facade.service';
import { StorageApp } from '../storage/storage-app';

@Injectable()
export class ModeSelectGuard {
	constructor(
		private router: Router,
		private configFacadeService: ConfigsFacadeService
	) {}

	canActivate(): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
		const defaultMode = StorageApp.getNestedItem(
			StorageKeys.CORE.ROOT,
			`${StorageKeys.CONFIGS.ROOT}.${StorageKeys.CONFIGS.DEFAULT_MODE}`
		);

		if (!!defaultMode) {
			if (defaultMode === AppModes.GUIDED) {
				this.router.navigate([`/${RoutesList.WIZARD.ROOT}`]);
				this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.GUIDED }));
			} else {
				this.router.navigate([`/${RoutesList.MODEL_COMPRESSION.ROOT}`]);
				this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.EXPERT }));
			}
		}

		return true;
	}
}
