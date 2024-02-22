import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../state/core/auth';
import { selectCurrentMode, selectDefaultMode } from '../../../state/core/configs/configs.selector';
import { AppModes } from '../models/enums/app-modes.enum';

@Injectable()
export class ConfigsFacadeService {
	defaultMode$: Observable<AppModes | undefined>;
	currentMode$: Observable<AppModes | undefined>;

	constructor(private store: Store<AuthState>) {
		this.defaultMode$ = this.store.select(selectDefaultMode);
		this.currentMode$ = this.store.select(selectCurrentMode);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
