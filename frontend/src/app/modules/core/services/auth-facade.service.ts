import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../../../services/client/models/user/user.interface-dto';
import { AuthState, selectIsAuthenticated, selectUser } from '../../../state/core/auth';

@Injectable()
export class AuthFacadeService {
	isAuthenticated$: Observable<boolean>;
	user$: Observable<UserDto>;

	constructor(private store: Store<AuthState>) {
		this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
		this.user$ = this.store.select(selectUser);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
