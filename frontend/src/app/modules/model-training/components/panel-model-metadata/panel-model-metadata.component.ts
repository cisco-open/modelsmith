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

import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skip } from 'rxjs';
import { ModelMetadataDto } from '../../../../services/client/models/models/model-metadata.interface-dto';
import { ModelsFacadeService } from '../../../core/services/models-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-panel-model-metadata',
	templateUrl: './panel-model-metadata.component.html',
	styleUrls: ['./panel-model-metadata.component.scss']
})
export class PanelModelMetadataComponent implements OnInit {
	metadata: ModelMetadataDto = {};

	constructor(private modelsFacadeService: ModelsFacadeService) {}

	ngOnInit(): void {
		this.modelsFacadeService.modelMetadata$
			.pipe(skip(1), untilDestroyed(this))
			.subscribe((metadata: ModelMetadataDto) => {
				this.metadata = metadata;
			});
	}
}
