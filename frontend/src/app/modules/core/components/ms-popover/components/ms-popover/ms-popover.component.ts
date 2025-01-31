//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, HostListener, Inject, Input, Output, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DEFAULT_POPOVER_FADE_IN_OUT_ANIMATION_DURATION } from '../../models/constants/popover.constants';
import { PopoverStatus } from '../../models/enums/popover-status.enum';
import { PopoverConfig } from '../../models/interfaces/popover-config.interface';
import { PopoverSizeStylesPipe } from '../../pipes/popover-size-style.pipe';
import { PopoverRef } from '../../popover.ref';
import { POPOVER_DATA } from '../../popover.tokens';

@Component({
	selector: 'ms-popover',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule, PopoverSizeStylesPipe],
	templateUrl: './ms-popover.component.html',
	styleUrl: './ms-popover.component.scss',
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0 })),
			state('true', style({ opacity: 0 })),
			state('false', style({ opacity: 1 })),
			transition(':enter', [
				animate(`${DEFAULT_POPOVER_FADE_IN_OUT_ANIMATION_DURATION}ms ease-in`, style({ opacity: 1 }))
			]),
			transition('false => true', [animate(`${DEFAULT_POPOVER_FADE_IN_OUT_ANIMATION_DURATION}ms ease-out`)])
		])
	]
})
export class MsPopoverComponent {
	@Input() contentTemplate?: TemplateRef<any>;
	@Output() actionEvent: EventEmitter<PopoverStatus> = new EventEmitter<PopoverStatus>();

	constructor(
		private destroyRef: DestroyRef,
		public popoverRef: PopoverRef,
		@Inject(POPOVER_DATA) public data: PopoverConfig
	) {
		this.closeDrawerOnBackdropClick();
	}

	onClose(): void {
		this.actionEvent.emit(PopoverStatus.CLOSE);
		this.popoverRef.close({ status: PopoverStatus.CLOSE });
	}

	onSave(): void {
		this.actionEvent.emit(PopoverStatus.SAVE);
		this.popoverRef.close({ status: PopoverStatus.SAVE });
	}

	onDismiss(): void {
		this.actionEvent.emit(PopoverStatus.DISMISS);
		this.popoverRef.close({ status: PopoverStatus.DISMISS });
	}

	private closeDrawerOnBackdropClick(): void {
		if (!this.data.closePopoverOnBackdropClick) {
			return;
		}

		this.popoverRef
			.backdropClick()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.onDismiss();
			});
	}

	@HostListener('window:keyup.esc') onEscKeyDown(): void {
		if (!this.data.closePopoverOnEscKeyUp) {
			return;
		}
		this.onDismiss();
	}
}
