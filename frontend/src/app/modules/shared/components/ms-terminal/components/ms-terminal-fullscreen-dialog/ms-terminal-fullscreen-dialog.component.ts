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
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DialogRef, MsDialogComponent } from '../../../../../core/components/ms-dialog';
import { MsTerminalToolbarComponent } from '../ms-terminal-toolbar/ms-terminal-toolbar.component';
import { MsTerminalXtermComponent } from '../ms-terminal-xterm/ms-terminal-xterm.component';

@UntilDestroy({})
@Component({
	selector: 'ms-terminal-fullscreen-dialog',
	standalone: true,
	imports: [CommonModule, MsDialogComponent, MsTerminalToolbarComponent, MsTerminalXtermComponent],
	templateUrl: './ms-terminal-fullscreen-dialog.component.html',
	styleUrl: './ms-terminal-fullscreen-dialog.component.scss'
})
export class MsTerminalFullscreenDialogComponent {
	constructor(private dialogRef: DialogRef) {}

	closeDialog(): void {
		this.dialogRef.close();
	}
}
