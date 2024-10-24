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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DrawerRef } from '../drawer.ref';
import { DRAWER_DATA } from '../drawer.tokens';
import { DrawerStatus } from '../models/enums/drawer-status.enum';
import { DrawerConfig } from '../models/interfaces/drawer-config.interface';
import { DrawerSizeStylesPipe } from '../pipes/drawer-size-style.pipe';

@UntilDestroy()
@Component({
	selector: 'ms-drawer',
	templateUrl: './ms-drawer.component.html',
	styleUrls: ['./ms-drawer.component.scss'],
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, DrawerSizeStylesPipe]
})
export class MsDrawerComponent {
	@Input() headerTemplate!: TemplateRef<any>;
	@Input() actionsTemplate!: TemplateRef<any>;

	@Input() isSaveDisabled: boolean = false;
	@Input() isDismissDisabled: boolean = false;

	@Output() actionEvent: EventEmitter<DrawerStatus> = new EventEmitter<DrawerStatus>();

	constructor(
		private drawerRef: DrawerRef,
		@Inject(DRAWER_DATA) public data: DrawerConfig
	) {
		this.closeDrawerOnBackdropClick();
	}

	onClose(): void {
		this.actionEvent.emit(DrawerStatus.CLOSE);
		this.drawerRef.close({ status: DrawerStatus.CLOSE });
	}

	onSave(): void {
		this.actionEvent.emit(DrawerStatus.SAVE);
	}

	onDismiss(): void {
		this.actionEvent.emit(DrawerStatus.DISMISS);
		this.drawerRef.close({ status: DrawerStatus.DISMISS });
	}

	private closeDrawerOnBackdropClick(): void {
		if (!this.data.closeDialogOnBackdropClick) {
			return;
		}

		this.drawerRef
			.backdropClick()
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.onDismiss();
			});
	}

	@HostListener('window:keyup.esc') onEscKeyDown(): void {
		if (!this.data.closeDialogOnEscKeyUp) {
			return;
		}
		this.onDismiss();
	}
}
