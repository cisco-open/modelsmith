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
import { KeyValue } from '../../../../services/client/models/key-value/key-value.interface-dto';

@Pipe({
	name: 'parametersLabel',
	standalone: true
})
export class ParametersLabelPipe implements PipeTransform {
	transform(value: string): string {
		const labels: KeyValue<string> = {
			creation_date: 'Creation Date',
			epochs: 'Epochs',
			file_size_bytes: 'File Size',
			learning_rate: 'Learning Rate',
			model: 'Model',
			training_duration_seconds: 'Training Duration',
			duration_seconds: 'Training Duration',
			arch: 'Model',
			best_acc: 'Best Accuracy',
			device: 'Device',
			lr: 'Learning Rate',
			pruning_ratio: 'Pruning Ratio',
			start_epoch: 'Start Epoch',
			pruning_times: 'Pruning Times',
			rewinding_epoch: 'Rewinding Epoch',
			save_dir: 'Saving Directory',
			algorithm_key: 'Algorithm',
			execution_date: 'Execution date'
		};

		return labels[value] || value;
	}
}
