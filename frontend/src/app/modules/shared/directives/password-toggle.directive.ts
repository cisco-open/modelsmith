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

import { Directive, ElementRef, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
	selector: '[msPasswordToggle]',
	standalone: true
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
