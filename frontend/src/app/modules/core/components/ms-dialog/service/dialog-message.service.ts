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

import { inject, Injectable } from '@angular/core';
import { DialogMessageComponent } from '../component/dialog-message/dialog-message.component';
import {
	DIALOG_MESSAGE_DEFAULT_HEIGHT,
	DIALOG_MESSAGE_DEFAULT_WIDTH
} from '../models/constants/dialog-message.constants';
import { DialogButtonPositionEnum } from '../models/enums/dialog-button-position.enum';
import { DialogMessageTypeEnum } from '../models/enums/dialog-message-type.enum';
import { DialogConfig } from '../models/interfaces/dialog-config.interface';
import { DialogMessageConfig } from '../models/interfaces/dialog-message-config.interface';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class DialogMessageService {
	private readonly dialogService = inject(DialogService);

	private mergeConfigs(
		defaultConfig: DialogConfig<DialogMessageConfig>,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	): DialogConfig<DialogMessageConfig> {
		return {
			...defaultConfig,
			...overrideConfig,
			data: {
				...defaultConfig.data,
				...overrideConfig?.data
			}
		};
	}

	openWarningDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.WARNING
			},
			showSaveButton: true,
			showCloseButton: true,
			saveButtonLabel: 'Yes',
			closeButtonLabel: 'Cancel',
			buttonPosition: DialogButtonPositionEnum.SPREAD,
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}

	openSuccessDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.SUCCESS
			},
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}

	openInfoDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.INFO
			},
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}

	openErrorDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.ERROR
			},
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}
}
