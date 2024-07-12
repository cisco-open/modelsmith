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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { UserDto } from '../../../../services/client/models/user/user.interface-dto';
import { AuthActions } from '../../../../state/core/auth';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { AuthFacadeService } from '../../../core/services/auth-facade.service';

@Component({
	selector: 'ms-user-navigation',
	templateUrl: './ms-user-navigation.component.html',
	styleUrls: ['./ms-user-navigation.component.scss'],
	standalone: true,
	imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule]
})
export class MsUserNavigationComponent {
	readonly RoutesList = RoutesList;
	user$: Observable<UserDto>;

	constructor(private authFacadeService: AuthFacadeService) {
		this.user$ = this.authFacadeService.user$;
	}

	logout() {
		this.authFacadeService.dispatch(AuthActions.logout());
	}
}
