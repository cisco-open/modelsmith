import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogRef } from '../dialog.ref';
import { DIALOG_DATA } from '../dialog.tokens';
import { getDialogSizeStyles } from '../dialog.utils';
import { DialogStatus } from '../models/enums/dialog-status.enum';
import { DialogConfig } from '../models/interfaces/dialog-config.interface';

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

	get dialogSizeStyles(): { [klass: string]: any } {
		return getDialogSizeStyles(this.data.width, this.data.height);
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
