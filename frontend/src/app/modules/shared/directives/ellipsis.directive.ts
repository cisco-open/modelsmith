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
