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
import { inject, Injectable, Injector } from '@angular/core';
import { DialogRef } from '../dialog.ref';
import { DIALOG_DATA } from '../dialog.tokens';
import { DEFAULT_DIALOG_HEIGHT, DEFAULT_DIALOG_WIDTH } from '../models/constants/dialog.constants';
import { DialogButtonPositionEnum } from '../models/enums/dialog-button-position.enum';
import { DialogConfig } from '../models/interfaces/dialog-config.interface';

@Injectable()
export class DialogService {
	readonly overlay = inject(Overlay);
	readonly injector = inject(Injector);

	open<T>(component: ComponentType<T>, config?: DialogConfig<unknown>): DialogRef {
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
						showHeader: true,
						showFooter: true,
						buttonPosition: DialogButtonPositionEnum.SPREAD,
						closeDialogOnBackdropClick: true,
						closeDialogOnEscKeyUp: true,
						width: config?.width || DEFAULT_DIALOG_WIDTH,
						height: config?.height || DEFAULT_DIALOG_HEIGHT,
						...config
					} as DialogConfig
				}
			]
		});

		const portal = new ComponentPortal(component, null, injector);
		overlayRef.attach(portal);

		return dialogRef;
	}
}
