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

import { Overlay, OverlayRef, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector } from '@angular/core';
import { PopoverRef } from '../popover.ref';
import { POPOVER_DATA } from '../popover.tokens';

import {
	DEFAUlT_POPOVER_HEIGHT,
	DEFAULT_POPOVER_POSITION_VALUE,
	DEFAUlT_POPOVER_WIDTH,
	POPOVER_POSITIONS
} from '../models/constants/popover.constants';
import { PopoverConfig } from '../models/interfaces/popover-config.interface';
import { generateRandomId } from '../popover.utils';
import { PopoverManagerService } from './popover-manager.service';

// The PopoverService is responsible for creating and managing popover instances within an Angular application. It uses Angular CDK’s Overlay module to render popovers dynamically and position them relative to an origin element. The service provides methods to open, configure, and manage popovers, including handling dynamic positioning and scroll events. The PopoverService works in conjunction with the PopoverManagerService to track active popovers by their unique id, enabling you to manage them globally.
//
// Key Responsibilities:
// - Create and Attach Popovers: Dynamically creates popover instances and attaches them to the DOM using Angular CDK’s Overlay.
// - Positioning: Provides positioning strategies to place popovers relative to an origin element, supporting flexible placement (top, bottom, left, right).
// - Scroll and Viewport Management: Ensures that popovers stay properly positioned even when the user scrolls or resizes the viewport.
// - Manage Popovers by ID: Assigns unique identifiers to each popover, either user-specified or automatically generated, and registers them with the PopoverManagerService to facilitate global control.
// - Configurable Popovers: Allows for customization of popovers using the PopoverConfig, including dimensions, behavior on backdrop click, and keyboard interactions like the ESC key.

@Injectable()
export class PopoverService {
	constructor(
		private overlay: Overlay,
		private injector: Injector,
		private scrollDispatcher: ScrollDispatcher,
		private popoverManager: PopoverManagerService
	) {}

	open<T>(
		component: ComponentType<T>,
		origin: HTMLElement | ElementRef,
		config?: PopoverConfig,
		id?: string
	): PopoverRef {
		const positionStrategy = this.getPositionStrategy(origin, config?.position ?? DEFAULT_POPOVER_POSITION_VALUE);

		const overlayRef: OverlayRef = this.overlay.create({ positionStrategy, ...(config || {}) });
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

		const popoverId = id ?? generateRandomId();
		this.popoverManager.registerPopover(popoverId, popoverRef);

		// Handle scroll events by re-positioning the popover
		this.scrollDispatcher.scrolled().subscribe(() => {
			popoverRef.updatePosition();
		});

		return popoverRef;
	}

	private getPositionStrategy(origin: HTMLElement | ElementRef, position: 'top' | 'bottom' | 'left' | 'right') {
		const element = origin instanceof ElementRef ? origin.nativeElement : origin;

		const selectedPosition = POPOVER_POSITIONS[position];

		return this.overlay
			.position()
			.flexibleConnectedTo(element)
			.withFlexibleDimensions(false)
			.withPush(false)
			.withPositions([selectedPosition])
			.withViewportMargin(0);
	}
}
