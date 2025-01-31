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
import { Component, DestroyRef, EventEmitter, HostListener, Inject, Input, Output, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogRef } from '../../dialog.ref';
import { DIALOG_DATA } from '../../dialog.tokens';
import { getDialogSizeStyles } from '../../dialog.utils';
import { DialogStatus } from '../../models/enums/dialog-status.enum';
import { DialogConfig } from '../../models/interfaces/dialog-config.interface';
import { DialogSizeStylesPipe } from '../../pipes/dialog-size-style.pipe';

@Component({
	selector: 'ms-dialog',
	templateUrl: './ms-dialog.component.html',
	styleUrls: ['./ms-dialog.component.scss'],
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, DialogSizeStylesPipe]
})
export class MsDialogComponent {
	@Input() headerTemplate!: TemplateRef<any>;
	@Input() actionsTemplate!: TemplateRef<any>;

	@Input() isSaveDisabled: boolean = false;
	@Input() isDismissDisabled: boolean = false;

	@Output() actionEvent: EventEmitter<DialogStatus> = new EventEmitter<DialogStatus>();

	@HostListener('window:keyup.esc') onEscKeyDown(): void {
		if (!this.data.closeDialogOnEscKeyUp) {
			return;
		}
		this.onDismiss();
	}

	constructor(
		private destroyRef: DestroyRef,
		private dialogRef: DialogRef,
		@Inject(DIALOG_DATA) public data: DialogConfig
	) {
		this.closeDrawerOnBackdropClick();
	}

	get dialogSizeStyles(): { [klass: string]: any } {
		return getDialogSizeStyles(this.data.width, this.data.height);
	}

	get isSingleButton(): boolean {
		return (
			(!!this.data.showCloseButton && !this.data.showSaveButton) ||
			(!this.data.showCloseButton && !!this.data.showSaveButton)
		);
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
		if (!this.data.closeDialogOnBackdropClick) {
			return;
		}

		this.dialogRef
			.backdropClick()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.onDismiss();
			});
	}
}
