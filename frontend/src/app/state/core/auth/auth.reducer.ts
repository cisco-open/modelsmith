import { createReducer, on } from '@ngrx/store';
import { UserDto } from '../../../services/client/models/user/user.interface-dto';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
	isAuthenticated: false,
	user: {} as UserDto,
	error: null
};

export const authReducer = createReducer(
	initialState,
	on(AuthActions.loginSuccess, (state, { user }) => {
		return {
			...state,
			isAuthenticated: true,
			user: { ...user },
			error: null
		};
	}),
	on(AuthActions.loginFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(AuthActions.logoutSuccess, () => {
		return {
			isAuthenticated: false,
			user: {} as UserDto,
			token: null,
			error: null
		};
	}),
	on(AuthActions.logoutFailure, (state, { error }) => ({
		...state,
		error
	}))
);

export const authReducers = {
	auth: authReducer
};
