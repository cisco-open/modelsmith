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

import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { ConfigActions } from '../../../../state/core/configs';
import { DialogClose, DialogStatus } from '../../../core/components/ms-dialog';
import { DialogMessageService } from '../../../core/components/ms-dialog/service/dialog-message.service';
import { CanComponentDeactivate } from '../../../core/guards/can-component-deactivate.guard';
import { AppModes } from '../../../core/models/enums/app-modes.enum';
import { ConfigsFacadeService } from '../../../core/services';
import { MsTerminalStyleConfiguratorComponent } from '../../../shared/components/ms-terminal/components/ms-terminal-style-configurator/ms-terminal-style-configurator.component';
import { isNilOrEmptyString } from '../../../shared/shared.utils';

@Component({
	selector: 'ms-admin',
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, CanComponentDeactivate {
	@ViewChild(MsTerminalStyleConfiguratorComponent, { static: true })
	configurator!: MsTerminalStyleConfiguratorComponent;

	readonly destroyRef = inject(DestroyRef);
	readonly dialogMessageService = inject(DialogMessageService);
	readonly configsFacadeService = inject(ConfigsFacadeService);

	readonly AppModes: typeof AppModes = AppModes;

	selectedModeControl = new FormControl('');

	ngOnInit() {
		this.loadDefaultValue();
		this.listenToModeChanges();
	}

	private listenToModeChanges(): void {
		this.selectedModeControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((mode) => {
			if (isNilOrEmptyString(mode)) {
				return;
			}

			this.configsFacadeService.dispatch(ConfigActions.setDefaultMode({ mode: mode as AppModes }));
		});
	}

	canDeactivate(): Observable<boolean> | boolean {
		if (!this.configurator?.hasUnsavedChanges()) {
			return true;
		}

		const dialogMessageConfirmation = this.dialogMessageService.openWarningDialog(
			{
				message: 'You have unsaved changes. Leave without saving?'
			},
			{
				closeButtonLabel: 'No',
				width: '800px'
			}
		);

		return dialogMessageConfirmation.afterClosed().pipe(
			take(1),
			map((dialogCloseEvent: DialogClose<unknown>) => {
				return dialogCloseEvent.status === DialogStatus.SAVE;
			})
		);
	}

	private loadDefaultValue(): void {
		this.configsFacadeService.defaultMode$.pipe(take(1)).subscribe((defaultMode) => {
			if (isNilOrEmptyString(defaultMode)) {
				return;
			}
			this.selectedModeControl.setValue(defaultMode!);
		});
	}
}
