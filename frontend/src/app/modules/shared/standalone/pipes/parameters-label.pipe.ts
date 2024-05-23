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
			epochs: 'Number of Epochs',
			file_size_bytes: 'File Size (bytes)',
			learning_rate: 'Learning Rate',
			model: 'Model Architecture',
			training_duration_seconds: 'Training Duration',
			duration_seconds: 'Total Duration',
			arch: 'Model Architecture',
			best_acc: 'Best Accuracy',
			device: 'Device Used',
			lr: 'Learning Rate',
			pruning_ratio: 'Pruning Ratio',
			start_epoch: 'Starting Epoch',
			pruning_times: 'Pruning Iterations',
			rewinding_epoch: 'Rewinding Epoch',
			save_dir: 'Saving Directory',
			algorithm_key: 'Algorithm Key',
			execution_date: 'Execution Date',
			seed: 'Random Seed',
			dataset: 'Dataset Name',
			batch_size: 'Batch Size',
			workers: 'Number of Workers',
			n_bits_w: 'Bitwidth for Weights',
			channel_wise: 'Channel-wise Quantization',
			n_bits_a: 'Bitwidth for Activations',
			disable_8bit_head_stem: 'Disable 8-bit Head and Stem',
			num_samples: 'Number of Samples',
			iters_w: 'Number of Iterations',
			weight: 'Weight Parameter',
			keep_cpu: 'Keep Calibration Data on CPU',
			wwq: 'Weight Quantization',
			waq: 'Activation Quantization',
			b_start: 'Initial Temperature',
			b_end: 'Final Temperature',
			warmup: 'Warmup Period',
			awq: 'Activation Weight Quantization',
			aaq: 'Activation Activation Quantization',
			init_wmode: 'Weight Initialization Mode',
			init_amode: 'Activation Initialization Mode',
			order: 'Order of Quantization',
			prob: 'Probability',
			input_prob: 'Input Probability',
			act_quant: 'Apply Activation Quantization'
		};

		return labels[value] || value;
	}
}
