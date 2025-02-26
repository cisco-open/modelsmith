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

import { OverlayConfig } from '@angular/cdk/overlay';
import { DialogActionTypeEnum } from '../enums/dialog-action-type.enum';
import { DialogButtonPositionEnum } from '../enums/dialog-button-position.enum';
import { DialogStatus } from '../enums/dialog-status.enum';
import { DialogCSSSize } from '../types/dialog-css-size.type';

export interface DialogConfig<T = unknown> extends OverlayConfig {
	data?: T;
	title?: string;
	showSaveButton?: boolean;
	showCloseButton?: boolean;
	saveButtonLabel?: string;
	closeButtonLabel?: string;
	buttonPosition?: DialogButtonPositionEnum;
	showHeader?: boolean;
	showFooter?: boolean;
	closeDialogOnBackdropClick?: boolean;
	closeDialogOnEscKeyUp?: boolean;
	width?: DialogCSSSize;
	height?: DialogCSSSize;
	actionType?: DialogActionTypeEnum;
}

export interface DialogClose<T = unknown> {
	result?: T;
	status: DialogStatus;
}
