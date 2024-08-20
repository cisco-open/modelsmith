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

import { OverlayConfig } from '@angular/cdk/overlay';
import { DialogActionTypeEnum } from './dialog-action-type.enum';
import { DialogStatus } from './dialog-status.enum';

export interface DialogConfig extends OverlayConfig {
	data?: any;
	title?: string;
	showSaveButton?: boolean;
	showCloseButton?: boolean;
	saveButtonLabel?: string;
	closeButtonLabel?: string;
	width?: number;
	height?: number;
	actionType?: DialogActionTypeEnum;
}

export interface DialogClose<T> {
	result?: T;
	status: DialogStatus;
}
