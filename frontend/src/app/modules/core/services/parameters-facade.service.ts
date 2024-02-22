import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../state/core/auth';
import { selectParametersState } from '../../../state/core/parameters/parameters.selector';
import { ParametersState } from '../../../state/core/parameters/parameters.state';

@Injectable()
export class ParametersFacadeService {
	parameters$: Observable<ParametersState>;

	constructor(private store: Store<AuthState>) {
		this.parameters$ = this.store.select(selectParametersState);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
