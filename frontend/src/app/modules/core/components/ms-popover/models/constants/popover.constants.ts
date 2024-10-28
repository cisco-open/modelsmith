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

import { PopoverPosition } from '../enums/popover-position.enum';
import { PopoverCSSSize } from '../types/popover-css-size.type';

export const DEFAUlT_POPOVER_WIDTH: PopoverCSSSize = '200px';
export const DEFAUlT_POPOVER_HEIGHT: PopoverCSSSize = '80px';

export const DEFAULT_POPOVER_POSITION_VALUE: PopoverPosition = PopoverPosition.TOP;

export const DEFAULT_POPOVER_FADE_IN_OUT_ANIMATION_DURATION: number = 150;

export const POPOVER_POSITIONS: Record<string, any> = {
	top: {
		originX: 'center',
		originY: 'top',
		overlayX: 'center',
		overlayY: 'bottom',
		offsetY: -24,
		offsetX: -9
	},
	bottom: {
		originX: 'center',
		originY: 'bottom',
		overlayX: 'center',
		overlayY: 'top',
		offsetY: 4,
		offsetX: -7
	},
	left: {
		originX: 'start',
		originY: 'center',
		overlayX: 'end',
		overlayY: 'center',
		offsetX: -22,
		offsetY: -12
	},
	right: {
		originX: 'end',
		originY: 'center',
		overlayX: 'start',
		overlayY: 'center',
		offsetX: 8,
		offsetY: -10
	}
};
