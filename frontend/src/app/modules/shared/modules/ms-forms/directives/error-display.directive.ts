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

import { ComponentRef, Directive, HostListener, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MsErrorMessageComponent } from '../components/ms-error-message/ms-error-message.component';
import { getValidationErrorMessage } from '../utils/form.utils';

@Directive({
	selector: '[msErrorDisplay]'
})
export class ErrorDisplayDirective implements OnInit, OnDestroy {
	componentRef?: ComponentRef<MsErrorMessageComponent | null>;
	protected _destroyed$ = new Subject<void>();

	constructor(
		private control: NgControl,
		private vcr: ViewContainerRef
	) {}

	@HostListener('blur') onBlur(): void {
		if (this.control.invalid && !this.control.disabled) {
			this.insertErrorComponent();
		}
	}

	ngOnInit(): void {
		if (this.control.touched && this.control.invalid && !this.control.disabled) {
			this.insertErrorComponent();
		}

		this.control?.statusChanges?.pipe(takeUntil(this._destroyed$)).subscribe(() => {
			if (this.control.touched && this.control.invalid && !this.control.disabled) {
				this.insertErrorComponent();
			}

			if (this.control.valid || this.control.disabled) {
				this.destroyErrorComponent();
			}
		});
	}

	private insertErrorComponent(): void {
		if (!this.componentRef) {
			// Create and find the correct place of the error component.
			this.componentRef = this.vcr.createComponent(MsErrorMessageComponent);

			const elem: HTMLElement = this.componentRef.location.nativeElement;
			const parent = elem.parentElement?.parentElement?.parentElement?.parentElement;

			parent
				?.getElementsByClassName('mat-mdc-form-field-subscript-wrapper')[0]
				?.getElementsByClassName('mat-mdc-form-field-hint-wrapper')[0]
				?.getElementsByClassName('mat-mdc-form-field-hint-spacer')[0]
				.appendChild(elem);
		}

		if (this.componentRef.instance) {
			this.componentRef.instance.text = getValidationErrorMessage(this.control.errors);
		}
	}

	private destroyErrorComponent(): void {
		if (this.componentRef) {
			this.vcr.remove();
			this.componentRef.destroy();
			this.componentRef = undefined;
		}
	}

	ngOnDestroy(): void {
		this.destroyErrorComponent();
		this._destroyed$.next();
		this._destroyed$.complete();
	}
}
