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

import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '../../../services/client/models/key-value/key-value.interface-dto';

@Pipe({
	name: 'readableStatisticsLabel'
})
export class ReadableStatisticsLabelPipe implements PipeTransform {
	private readonly keyMap: KeyValue<string> = {
		forget_acc: 'Forget Accuracy',
		retain_acc: 'Retain Accuracy',
		test_acc: 'Test Accuracy',
		val_acc: 'Validation Accuracy'
	};

	transform(value: string): string {
		if (!value) {
			return value;
		}
		const parts = value.split('_');
		if (parts.length < 3) {
			return value;
		}

		const keyName = parts.slice(0, -2).join('_');
		const testIndex = parts[parts.length - 1];

		const descriptiveLabel =
			this.keyMap[keyName] ||
			keyName
				.split('_')
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(' ');

		return `${descriptiveLabel} (Test #${testIndex})`;
	}
}
