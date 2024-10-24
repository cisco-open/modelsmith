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

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector } from '@angular/core';
import { PopoverRef } from '../popover.ref';
import { POPOVER_DATA } from '../popover.tokens';

import {
	DEFAUlT_POPOVER_HEIGHT,
	DEFAULT_POPOVER_POSITION_VALUE,
	DEFAUlT_POPOVER_WIDTH
} from '../models/constants/popover.constants';
import { PopoverConfig } from '../models/interfaces/popover-config.interface';

@Injectable()
export class PopoverService {
	constructor(
		private overlay: Overlay,
		private injector: Injector
	) {}

	open<T>(component: ComponentType<T>, origin: HTMLElement | ElementRef, config?: PopoverConfig): PopoverRef {
		const positionStrategy = this.getPositionStrategy(origin, config?.position ?? DEFAULT_POPOVER_POSITION_VALUE);

		const overlayRef = this.overlay.create({
			positionStrategy,
			...(config || {})
		});

		const popoverRef = new PopoverRef(overlayRef);

		const injector = Injector.create({
			parent: this.injector,
			providers: [
				{ provide: PopoverRef, useValue: popoverRef },
				{
					provide: POPOVER_DATA,
					useValue: {
						position: DEFAULT_POPOVER_POSITION_VALUE,
						closePopoverOnBackdropClick: false,
						closePopoverOnEscKeyUp: true,
						width: config?.width || DEFAUlT_POPOVER_WIDTH,
						height: config?.height || DEFAUlT_POPOVER_HEIGHT,
						...config
					}
				}
			]
		});

		const portal = new ComponentPortal(component, null, injector);
		overlayRef.attach(portal);

		return popoverRef;
	}

	private getPositionStrategy(origin: HTMLElement | ElementRef, position: 'top' | 'bottom' | 'left' | 'right') {
		const element = origin instanceof ElementRef ? origin.nativeElement : origin;

		const positions: Record<string, any> = {
			top: {
				originX: 'center',
				originY: 'top',
				overlayX: 'center',
				overlayY: 'bottom',
				offsetY: -24,
				offsetX: -9
			},
			bottom: {
				originX: 'center',
				originY: 'bottom',
				overlayX: 'center',
				overlayY: 'top',
				offsetY: 4,
				offsetX: -7
			},
			left: {
				originX: 'start',
				originY: 'center',
				overlayX: 'end',
				overlayY: 'center',
				offsetX: -22,
				offsetY: -12
			},
			right: {
				originX: 'end',
				originY: 'center',
				overlayX: 'start',
				overlayY: 'center',
				offsetX: 8,
				offsetY: -10
			}
		};

		const selectedPosition = positions[position];

		return this.overlay
			.position()
			.flexibleConnectedTo(element)
			.withFlexibleDimensions(false)
			.withPush(false)
			.withPositions([selectedPosition]);
	}
}
