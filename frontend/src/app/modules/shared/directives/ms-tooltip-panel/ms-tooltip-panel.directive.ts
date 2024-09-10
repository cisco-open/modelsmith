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

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnDestroy,
	Output,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MsTooltipPanelComponent } from './component/ms-tooltip-panel.component';

@Directive({
	selector: '[msTooltipPanel]',
	standalone: true
})
export class MsTooltipPanelDirective implements OnDestroy {
	@Input('msTooltipPanel') contentTemplate!: TemplateRef<any>;

	@Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	@Input() showCloseButton = false;
	@Input() closeOnBackdropClick = true;
	@Input() allowCloseOnEspPress = true; // Close panel on 'Esc' keypress
	@Input() freezePageScroll = true; // Freeze page scroll, default is true

	@Output() closed = new EventEmitter<void>();

	private overlayRef: OverlayRef | null = null;
	private backdropClickSubscription!: Subscription;

	constructor(
		private overlay: Overlay,
		private viewContainerRef: ViewContainerRef,
		private elementRef: ElementRef
	) {}

	@HostListener('click') onClick() {
		if (this.overlayRef) {
			this.closePanel();
		} else {
			this.openPanel();
		}
	}

	@HostListener('document:keydown.escape', ['$event']) handleEscKey(event: KeyboardEvent) {
		if (this.allowCloseOnEspPress) {
			this.closePanel();
		}
	}

	private openPanel() {
		const positionStrategy = this.getPositionStrategy();

		this.overlayRef = this.overlay.create({
			positionStrategy
		});

		const tooltipPortal = new ComponentPortal(MsTooltipPanelComponent, this.viewContainerRef);
		const tooltipRef = this.overlayRef.attach(tooltipPortal);

		const tooltipInstance = tooltipRef.instance;
		tooltipInstance.contentTemplate = this.contentTemplate;
		tooltipInstance.position = this.position;
		tooltipInstance.showCloseButton = this.showCloseButton;

		if (this.freezePageScroll) {
			document.body.classList.add('no-scroll');
		}

		setTimeout(() => {
			tooltipInstance.state = 'visible';
		}, 0);

		tooltipInstance.close.subscribe(() => {
			this.closePanel();
		});

		if (this.closeOnBackdropClick) {
			this.backdropClickSubscription = this.overlayRef.backdropClick().subscribe(() => {
				this.closePanel();
			});
		}
	}

	private closePanel() {
		if (this.overlayRef) {
			const tooltipComponentRef = this.overlayRef.overlayElement.querySelector('ms-tooltip-panel') as any;
			if (tooltipComponentRef) {
				tooltipComponentRef.state = 'hidden';
				setTimeout(() => {
					this.overlayRef?.detach();
					this.overlayRef = null;
					this.closed.emit();
				}, 150);
			}

			if (this.freezePageScroll) {
				document.body.classList.remove('no-scroll');
			}

			if (this.backdropClickSubscription) {
				this.backdropClickSubscription.unsubscribe();
			}
		}
	}

	private getPositionStrategy() {
		const positions: any = {
			top: {
				originX: 'center',
				originY: 'top',
				overlayX: 'center',
				overlayY: 'bottom'
			},
			bottom: {
				originX: 'center',
				originY: 'bottom',
				overlayX: 'center',
				overlayY: 'top'
			},
			left: {
				originX: 'start',
				originY: 'center',
				overlayX: 'end',
				overlayY: 'center'
			},
			right: {
				originX: 'end',
				originY: 'center',
				overlayX: 'start',
				overlayY: 'center'
			}
		};

		return this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([positions[this.position]]);
	}

	ngOnDestroy() {
		if (this.overlayRef) {
			this.overlayRef.dispose();
		}

		if (this.backdropClickSubscription) {
			this.backdropClickSubscription.unsubscribe();
		}
	}
}
