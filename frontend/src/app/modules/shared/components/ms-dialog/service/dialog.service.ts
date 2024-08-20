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

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogRef } from '../dialog.ref';
import { DIALOG_DATA } from '../dialog.tokens';
import { DialogConfig } from '../models/dialog-config.interface';
import { DEFAULT_DIALOG_HEIGHT, DEFAULT_DIALOG_WIDTH } from '../models/dialog.constants';

@Injectable()
export class DialogService {
	constructor(
		private overlay: Overlay,
		private injector: Injector
	) {}

	open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
		const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

		const overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			backdropClass: 'dialog-backdrop',
			...config
		});

		const dialogRef = new DialogRef(overlayRef);

		const injector = Injector.create({
			parent: this.injector,
			providers: [
				{ provide: DialogRef, useValue: dialogRef },
				{
					provide: DIALOG_DATA,
					useValue: {
						saveButtonLabel: 'Save',
						closeButtonLabel: 'Close',
						showSaveButton: true,
						showCloseButton: true,
						width: config?.width || DEFAULT_DIALOG_WIDTH,
						height: config?.height || DEFAULT_DIALOG_HEIGHT,
						...config
					}
				}
			]
		});

		const portal = new ComponentPortal(component, null, injector);
		overlayRef.attach(portal);

		return dialogRef;
	}
}
