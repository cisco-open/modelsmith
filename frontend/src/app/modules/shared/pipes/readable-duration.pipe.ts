//  Copyright 2024 Cisco Systems, Inc. and its affiliates

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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'readableDuration',
	standalone: true
})
export class ReadableDurationPipe implements PipeTransform {
	transform(value: string | number): string {
		const seconds = Number(value);
		if (isNaN(seconds)) return 'Invalid duration';

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		let result = '';
		if (hours > 0) result += `${hours}h `;
		if (minutes > 0 || hours > 0) result += `${minutes}m `;
		result += `${secs}s`;

		return result.trim();
	}
}
