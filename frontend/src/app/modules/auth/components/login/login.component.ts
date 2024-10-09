//   Copyright 2024 Cisco Systems, Inc.

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

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthActions } from '../../../../state/core/auth';
import { AuthFacadeService } from '../../../core/services/auth-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form!: FormGroup;

	readonly CONTROL_NAMES = {
		EMAIL: 'email',
		PASSWORD: 'password'
	};

	constructor(
		private fb: FormBuilder,
		private authFacadeService: AuthFacadeService
	) {}

	ngOnInit(): void {
		this.initForm();
	}

	private initForm() {
		this.form = this.fb.group({
			[this.CONTROL_NAMES.EMAIL]: ['alexander@cisco.com', [Validators.email, Validators.required]],
			[this.CONTROL_NAMES.PASSWORD]: ['GUfCRHz7VD9R', [Validators.required]]
		});
	}

	get emailControl(): AbstractControl | null {
		return this.form.get(this.CONTROL_NAMES.EMAIL);
	}

	get passwordControl(): AbstractControl | null {
		return this.form.get(this.CONTROL_NAMES.PASSWORD);
	}

	login() {
		const loginData = this.form.getRawValue();
		this.authFacadeService.dispatch(AuthActions.login(loginData));
	}
}
