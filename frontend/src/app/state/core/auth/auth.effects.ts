//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { CLIENT } from '../../../app.tokens';
import { RoutesList } from '../../../modules/core/models/enums/routes-list.enum';
import { Client } from '../../../services/client/client';
import { PostLogin } from '../../../services/client/serviceCalls/authenticate/post-login';
import { PostLogout } from '../../../services/client/serviceCalls/user/post-logout';
import { AuthActions } from './auth.actions';
import { selectIsAuthenticated } from './auth.selector';
import { AuthState } from './auth.state';

@Injectable()
export class AuthEffects {
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.login),
			withLatestFrom(this.store.select(selectIsAuthenticated)),
			filter(([_, isAuthenticated]) => !isAuthenticated),
			mergeMap(([action, _]) =>
				this.apiClient.serviceCall(new PostLogin({ email: action.email, password: action.password })).pipe(
					map((user) => AuthActions.loginSuccess({ user })),
					catchError((error) => [AuthActions.loginFailure({ error })])
				)
			)
		)
	);

	loginRedirect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.loginSuccess),
				tap(() => this.router.navigate([`${RoutesList.MODE_SELECT.ROOT}`]))
			),
		{ dispatch: false }
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.logout),
			mergeMap(() =>
				this.apiClient.serviceCall(new PostLogout()).pipe(
					map(() => AuthActions.logoutSuccess()),
					catchError((error) => [AuthActions.logoutFailure({ error })])
				)
			)
		)
	);

	logoutRedirect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.logoutSuccess),
				tap(() => this.router.navigate([`${RoutesList.AUTH.ROOT}`]))
			),
		{ dispatch: false }
	);

	constructor(
		@Inject(CLIENT) private apiClient: Client,
		private actions$: Actions,
		private store: Store<AuthState>,
		private router: Router
	) {}
}
