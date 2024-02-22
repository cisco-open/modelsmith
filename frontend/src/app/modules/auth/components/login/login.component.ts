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
