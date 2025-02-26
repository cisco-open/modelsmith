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

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModelMetadataDto } from '../../../services/client/models/models/model-metadata.interface-dto';
import { ModelDto } from '../../../services/client/models/models/models.interface-dto';
import {
	selectCurrentModel,
	selectModelMetadata,
	selectModelsByType
} from '../../../state/core/models/models.selector';
import { ModelsState } from '../../../state/core/models/models.state';
import { AlgorithmType } from '../../model-compression/models/enums/algorithms.enum';

@Injectable()
export class ModelsFacadeService {
	currentModel$: Observable<string>;
	modelMetadata$: Observable<ModelMetadataDto>;

	constructor(private store: Store<ModelsState>) {
		this.currentModel$ = this.store.select(selectCurrentModel);
		this.modelMetadata$ = this.store.select(selectModelMetadata);
	}

	getModelsByType(algorithmType: AlgorithmType): Observable<ModelDto[] | undefined> {
		return this.store.select(selectModelsByType(algorithmType));
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
