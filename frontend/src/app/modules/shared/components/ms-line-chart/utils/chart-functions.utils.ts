//   Copyright 2024 Cisco Systems, Inc.

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

export const rgbaToHex = (input: string): string => {
	// Check if input is already a hex color
	if (input.startsWith('#')) {
		return input;
	}

	// Parse RGBA values
	const values: string[] | null = input.match(/\d+/g);
	if (!values || values.length < 3) {
		throw new Error('Invalid input format');
	}

	// Convert to integers and ensure valid ranges
	let [r, g, b, a]: number[] = values.map(Number);
	r = Math.min(255, Math.max(0, r));
	g = Math.min(255, Math.max(0, g));
	b = Math.min(255, Math.max(0, b));
	a = a !== undefined ? Math.min(1, Math.max(0, a)) : 1;

	// Convert to hex
	const toHex = (value: number): string => {
		const hex = Math.round(value).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	let hexColor = '#' + toHex(r) + toHex(g) + toHex(b);

	// Add alpha channel if it's not 1
	if (a !== 1) {
		hexColor += toHex(Math.round(a * 255));
	}

	return hexColor;
};
