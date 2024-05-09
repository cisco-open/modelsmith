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

export const convertColor = (colorString: string): Color => {
	if (/^#([0-9A-F]{3,4}){1,2}$/i.test(colorString)) {
		return hexToColor(colorString);
	} else if (/^rgba?\(\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*\d*\.?\d+)?\)$/i.test(colorString)) {
		return rgbaToColor(colorString);
	} else {
		console.warn('Unsupported color format:', colorString);
		return new Color(0, 0, 0);
	}
};

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

export const hexToColor = (hex: string): Color => {
	const cleanedHex = hex.replace('#', '').toUpperCase();

	let r: number,
		g: number,
		b: number,
		a: number = 1;

	if ([3, 4].includes(cleanedHex.length)) {
		r = parseInt(cleanedHex.charAt(0).repeat(2), 16);
		g = parseInt(cleanedHex.charAt(1).repeat(2), 16);
		b = parseInt(cleanedHex.charAt(2).repeat(2), 16);
		if (cleanedHex.length === 4) {
			a = parseInt(cleanedHex.charAt(3).repeat(2), 16) / 255;
		}
	} else if ([6, 8].includes(cleanedHex.length)) {
		r = parseInt(cleanedHex.substring(0, 2), 16);
		g = parseInt(cleanedHex.substring(2, 4), 16);
		b = parseInt(cleanedHex.substring(4, 6), 16);
		if (cleanedHex.length === 8) {
			a = parseInt(cleanedHex.substring(6, 8), 16) / 255;
		}
	} else {
		console.warn('Invalid hex color format:', hex);
		return new Color(0, 0, 0);
	}

	return new Color(r, g, b, a);
};
