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
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogRef } from '../../dialog.ref';
import { DIALOG_DATA } from '../../dialog.tokens';
import { DialogMessageTypeEnum } from '../../models/enums/dialog-message-type.enum';
import { DialogStatus } from '../../models/enums/dialog-status.enum';
import { DialogConfig } from '../../models/interfaces/dialog-config.interface';
import { DialogMessageConfig } from '../../models/interfaces/dialog-message-config.interface';
import { MsDialogComponent } from '../ms-dialog/ms-dialog.component';

@Component({
	selector: 'as-dialog-message',
	standalone: true,
	imports: [CommonModule, MsDialogComponent, MatButtonModule, MatIconModule],
	templateUrl: './dialog-message.component.html',
	styleUrl: './dialog-message.component.scss'
})
export class DialogMessageComponent {
	readonly dialogData = inject<DialogConfig<DialogMessageConfig>>(DIALOG_DATA);
	readonly dialogRef = inject(DialogRef);

	readonly DialogMessageTypeEnum: typeof DialogMessageTypeEnum = DialogMessageTypeEnum;

	readonly data = this.dialogData.data || ({} as DialogMessageConfig);

	save(status: DialogStatus): void {
		this.dialogRef.close({ status });
	}
}
