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

import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { DEFAULT_POPOVER_FADE_IN_OUT_ANIMATION_DURATION } from './models/constants/popover.constants';
import { PopoverClose } from './models/interfaces/popover-config.interface';

// The PopoverRef class represents a reference to an open popover in an Angular application. It provides a programmatic way to control the popover's lifecycle, such as closing the popover, emitting data to external listeners, and handling events like backdrop clicks. This class interacts directly with Angular CDK’s OverlayRef to manage the rendering and positioning of the popover.
//
// Key Responsibilities:
//
// - Control the Popover's Lifecycle: Provides methods to close the popover and handle related animations and cleanup.
// - Emit Data from the Popover: Enables the popover to communicate with its parent component or other external components in real time by emitting data through an observable.
// - Manage Positioning: Exposes functionality to update the popover's position dynamically, allowing it to stay aligned with its origin element even when the user scrolls or resizes the window.
// - Handle Backdrop Clicks: Allows listening to backdrop clicks, providing a way to close the popover or take action when the user clicks outside of the popover.

export class PopoverRef {
	/**
	 * Based on this value we trigger the fade-in and fade-out animations.
	 */
	public isClosing: boolean = false;

	private afterClosedSubject = new Subject<any>();

	/**
	 * Subject used to emit data from the popover to the outside while the popover is still open.
	 * This allows for real-time communication between the popover's internal components and external listeners.
	 */
	private dataSubject = new Subject<any>();

	/**
	 * Observable that external components can subscribe to in order to receive data emitted by the popover.
	 * It exposes the `dataSubject` as a read-only stream.
	 */
	public data$: Observable<any> = this.dataSubject.asObservable();

	constructor(private overlayRef: OverlayRef) {}

	public emitData(data: any): void {
		this.dataSubject.next(data);
	}

	public backdropClick(): Observable<MouseEvent> {
		return this.overlayRef.backdropClick();
	}

	public close(result?: PopoverClose<any>, showAnimation: boolean = true): void {
		this.isClosing = true;

		this.afterClosedSubject.next(result);
		this.afterClosedSubject.complete();
		this.dataSubject.complete();

		// If showAnimation is false, close immediately; otherwise, delay to allow fade-out animation
		const closeDelay = showAnimation ? DEFAULT_POPOVER_FADE_IN_OUT_ANIMATION_DURATION : 0;

		setTimeout(() => {
			this.overlayRef.dispose();
		}, closeDelay);
	}

	public afterClosed(): Observable<any> {
		return this.afterClosedSubject.asObservable();
	}

	public updatePosition(): void {
		this.overlayRef.updatePosition();
	}
}
