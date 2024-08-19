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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogRef } from '../dialog.ref';
import { DIALOG_DATA } from '../dialog.tokens';
import { DialogConfig } from '../models/dialog-config.interface';
import { DialogStatus } from '../models/dialog-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-dialog',
	templateUrl: './ms-dialog.component.html',
	styleUrls: ['./ms-dialog.component.scss'],
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class MsDialogComponent {
	@Input() headerTemplate!: TemplateRef<any>;
	@Input() actionsTemplate!: TemplateRef<any>;

	@Input() isSaveDisabled: boolean = false;
	@Input() isDismissDisabled: boolean = false;

	@Input() closeDialogOnBackdropClick: boolean = true;
	@Input() closeDialogOnEscKeyUp: boolean = true;

	@Output() actionEvent: EventEmitter<DialogStatus> = new EventEmitter<DialogStatus>();

	constructor(
		private dialogRef: DialogRef,
		@Inject(DIALOG_DATA) public data: DialogConfig
	) {
		this.closeDrawerOnBackdropClick();
	}

	onClose(): void {
		this.actionEvent.emit(DialogStatus.CLOSE);
		this.dialogRef.close({ status: DialogStatus.CLOSE });
	}

	onSave(): void {
		this.actionEvent.emit(DialogStatus.SAVE);
	}

	onDismiss(): void {
		this.actionEvent.emit(DialogStatus.DISMISS);
		this.dialogRef.close({ status: DialogStatus.DISMISS });
	}

	private closeDrawerOnBackdropClick(): void {
		if (!this.closeDialogOnBackdropClick) {
			return;
		}

		this.dialogRef
			.backdropClick()
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.onDismiss();
			});
	}

	@HostListener('window:keyup.esc') onEscKeyDown(): void {
		if (!this.closeDialogOnEscKeyUp) {
			return;
		}
		this.onDismiss();
	}
}
