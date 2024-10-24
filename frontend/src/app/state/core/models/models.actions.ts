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

import { createActionGroup, props } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';
import { ModelMetadataDto } from '../../../services/client/models/models/model-metadata.interface-dto';
import { ModelDto } from '../../../services/client/models/models/models.interface-dto';

export const ModelsActions = createActionGroup({
	source: '[Models]',
	events: {
		'Get Models List': props<{ algorithmType: AlgorithmType }>(),
		'Get Models List Success': props<{ algorithmType: AlgorithmType; models: ModelDto[] }>(),
		'Get Models List Failure': props<{ error: any }>(),
		'Get Current Or Previous Selected Model': props<{ algorithmType: AlgorithmType }>(),
		'Get Current Or Previous Selected Model Success': props<{ model: string }>(),
		'Get Current Or Previous Selected Model Failure': props<{ error: any }>(),
		'Get Model Metadata': props<{ algorithmType: AlgorithmType; modelName: string }>(),
		'Get Model Metadata Success': props<{ metadata: ModelMetadataDto }>(),
		'Get Model Metadata Failure': props<{ error: any }>()
	}
});
