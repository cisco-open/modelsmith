import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MsTooltipComponent } from '../ms-tooltip.component';

@Directive({
	selector: '[msTooltip]',
	standalone: true
})
export class MsTooltipDirective implements OnDestroy {
	@Input('contentTemplate') contentTemplate!: TemplateRef<any>;
	@Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	@Input() showCloseButton = false;
	@Input() closeOnBackdropClick = true;

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

	private openPanel() {
		const positionStrategy = this.getPositionStrategy();

		this.overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			backdropClass: 'cdk-overlay-transparent-backdrop'
		});

		const tooltipPortal = new ComponentPortal(MsTooltipComponent, this.viewContainerRef);
		const tooltipRef = this.overlayRef.attach(tooltipPortal);

		tooltipRef.instance.contentTemplate = this.contentTemplate;
		tooltipRef.instance.position = this.position;
		tooltipRef.instance.showCloseButton = this.showCloseButton;

		tooltipRef.instance.close.subscribe(() => {
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
			this.overlayRef.detach();
			this.overlayRef = null;

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
