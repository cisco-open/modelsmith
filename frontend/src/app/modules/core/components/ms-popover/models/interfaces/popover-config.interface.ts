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
import { PopoverActionTypeEnum } from '../enums/popover-action-type.enum';
import { PopoverStatus } from '../enums/popover-status.enum';
import { PopoverCSSSize } from '../types/popover-css-size.type';

export interface PopoverConfig extends OverlayConfig {
	data?: any;
	position?: 'top' | 'bottom' | 'left' | 'right';
	closePopoverOnBackdropClick?: boolean;
	closePopoverOnEscKeyUp?: boolean;
	width?: PopoverCSSSize;
	height?: PopoverCSSSize;
	actionType?: PopoverActionTypeEnum;
}

export interface PopoverClose<T> {
	result?: T;
	status: PopoverStatus;
}
