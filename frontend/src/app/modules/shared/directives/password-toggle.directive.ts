import { Directive, ElementRef, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
	selector: '[msPasswordToggle]'
})
export class PasswordToggleDirective implements OnInit {
	private isHidden = true;

	private static readonly CLASS_ICON_SUFFIX = 'mat-mdc-form-field-icon-suffix';

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private viewContainer: ViewContainerRef
	) {}

	ngOnInit() {
		const matInputEl = this.el.nativeElement;

		const iconRef = this.createIcon();
		this.setupIconInContainer(matInputEl, iconRef);

		iconRef.location.nativeElement.addEventListener('click', () => {
			this.toggleVisibility(matInputEl, iconRef.instance);
		});
	}

	private createIcon() {
		const iconRef = this.viewContainer.createComponent(MatIcon);
		iconRef.instance.fontIcon = this.isHidden ? 'visibility_off' : 'visibility';
		return iconRef;
	}

	private setupIconInContainer(inputEl: HTMLElement, iconRef: any) {
		const iconSuffixWrapper = this.renderer.createElement('div');
		this.renderer.addClass(iconSuffixWrapper, PasswordToggleDirective.CLASS_ICON_SUFFIX);
		this.renderer.setStyle(iconRef.location.nativeElement, 'padding', '0');
		this.renderer.setAttribute(inputEl, 'type', this.isHidden ? 'password' : 'text');

		this.renderer.appendChild(iconSuffixWrapper, iconRef.location.nativeElement);
		this.renderer.appendChild(inputEl?.parentElement?.parentElement, iconSuffixWrapper);
	}

	private toggleVisibility(inputEl: HTMLElement, iconInstance: MatIcon) {
		this.isHidden = !this.isHidden;
		this.renderer.setAttribute(inputEl, 'type', this.isHidden ? 'password' : 'text');
		iconInstance.fontIcon = this.isHidden ? 'visibility_off' : 'visibility';
	}
}
