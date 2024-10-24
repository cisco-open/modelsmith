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
import { PopoverClose } from './models/interfaces/popover-config.interface';

export class PopoverRef {
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

	public close(result?: PopoverClose<any>) {
		this.overlayRef.dispose();
		this.afterClosedSubject.next(result);
		this.afterClosedSubject.complete();
		this.dataSubject.complete();
	}

	public afterClosed(): Observable<any> {
		return this.afterClosedSubject.asObservable();
	}
}
