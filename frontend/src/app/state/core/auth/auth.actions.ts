import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
	source: '[Core -> Auth]',
	events: {
		Login: props<{ email: string; password: string }>(),
		'Login Success': props<{ user: any }>(),
		'Login Failure': props<{ error: any }>(),
		Logout: emptyProps(),
		'Logout Success': emptyProps(),
		'Logout Failure': props<{ error: any }>()
	}
});
