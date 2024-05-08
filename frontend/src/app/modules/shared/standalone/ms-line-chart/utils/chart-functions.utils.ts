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

import { Color } from '@angular-material-components/color-picker';

export const rgbaToColor = (rgba: string): Color => {
	const matches = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)$/);
	if (matches) {
		const r = parseInt(matches[1], 10);
		const g = parseInt(matches[2], 10);
		const b = parseInt(matches[3], 10);
		const a = parseFloat(matches[4] ?? '1');
		return new Color(r, g, b, a);
	}
	console.warn('Failed to parse color:', rgba);
	return new Color(0, 0, 0);
};
