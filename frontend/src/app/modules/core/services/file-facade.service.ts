import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AuthState } from '../../../state/core/auth';

@Injectable()
export class FileFacadeService {
	constructor(private store: Store<AuthState>) {}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
