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

import { Pipe, PipeTransform } from '@angular/core';
import { PopoverCSSSize } from '../models/types/popover-css-size.type';
import { getPopoverSizeStyles } from '../popover.utils';

@Pipe({
	name: 'iconPanelSizeStyles',
	standalone: true,
	pure: true
})
export class PopoverSizeStylesPipe implements PipeTransform {
	transform(width?: PopoverCSSSize, height?: PopoverCSSSize): { [klass: string]: any } {
		return getPopoverSizeStyles(width, height);
	}
}
