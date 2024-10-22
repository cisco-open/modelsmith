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

import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { DialogClose } from './models/interfaces/dialog-config.interface';

export class DialogRef {
	private afterClosedSubject = new Subject<any>();

	constructor(private overlayRef: OverlayRef) {}

	public backdropClick(): Observable<MouseEvent> {
		return this.overlayRef.backdropClick();
	}

	public close(result?: DialogClose<any>) {
		this.overlayRef.dispose();
		this.afterClosedSubject.next(result);
		this.afterClosedSubject.complete();
	}

	public afterClosed(): Observable<any> {
		return this.afterClosedSubject.asObservable();
	}
}
