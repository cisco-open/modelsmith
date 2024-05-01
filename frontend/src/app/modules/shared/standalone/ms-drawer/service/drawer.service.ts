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
import { DrawerRef } from '../drawer.ref';
import { DRAWER_DATA } from '../drawer.tokens';
import { DrawerConfig } from '../models/drawer-config.interface';

@Injectable()
export class DrawerService {
	constructor(
		private overlay: Overlay,
		private injector: Injector
	) {}

	open<T>(component: ComponentType<T>, config?: DrawerConfig): DrawerRef {
		const positionStrategy = this.overlay.position().global().right();

		const overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			backdropClass: 'drawer-backdrop',
			height: '100vh',
			width: 768,
			...config
		});

		const drawerRef = new DrawerRef(overlayRef);

		const injector = Injector.create({
			parent: this.injector,
			providers: [
				{ provide: DrawerRef, useValue: drawerRef },
				{
					provide: DRAWER_DATA,
					useValue: {
						saveButtonLabel: 'Save',
						closeButtonLabel: 'Close',
						showSaveButton: true,
						showCloseButton: true,
						width: 768,
						...config
					}
				}
			]
		});

		const portal = new ComponentPortal(component, null, injector);
		overlayRef.attach(portal);

		return drawerRef;
	}
}
