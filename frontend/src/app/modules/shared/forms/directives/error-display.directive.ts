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
