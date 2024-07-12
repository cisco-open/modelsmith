import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[msUseEllipsis]',
	standalone: true,
	providers: [MatTooltip]
})
export class EllipsisDirective implements AfterViewInit {
	@Input() maxEllipsisLines: number = 2;

	@HostBinding('style.display') display = '-webkit-box';
	@HostBinding('style.overflow') overflow = 'hidden';
	@HostBinding('style.-webkit-box-orient') boxOrient = 'vertical';
	@HostBinding('style.-webkit-line-clamp') get lineClamp(): number {
		return this.maxEllipsisLines;
	}
	@HostBinding('style.text-overflow') textOverflow = 'ellipsis';
	@HostBinding('style.white-space') whiteSpace = 'normal';
	@HostBinding('style.word-break') wordBreak = 'break-all';

	@HostListener('mouseenter') onMouseEnter() {
		if (this.isTextOverflowing) {
			this.tooltip.show();
		} else {
			this.tooltip.hide();
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.tooltip.hide();
	}

	constructor(
		private tooltip: MatTooltip,
		private elementRef: ElementRef
	) {}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.tooltip.message = this.elementRef.nativeElement.textContent.trim();
			this.tooltip.position = 'above';
		}, 0);
	}

	private get isTextOverflowing(): boolean {
		const lineHeight = parseInt(window.getComputedStyle(this.elementRef.nativeElement).lineHeight);
		const maxVisibleHeight = this.maxEllipsisLines * lineHeight;
		return this.elementRef.nativeElement.scrollHeight > maxVisibleHeight;
	}
}
