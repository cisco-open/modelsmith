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

import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScriptActions } from '../../../state/core/script/script.actions';
import { ScriptFacadeService } from '../../core/services/script-facade.service';
import { findAlgorithmKeyBasedOnValue } from '../../model-compression/models/constants/algorithm.constants';
import { isScriptActive } from '../../model-compression/models/enums/script-status.enum';

@UntilDestroy()
@Injectable()
export class WizardUtilsService {
	isScriptActive: boolean = false;

	constructor(private scriptFacadeService: ScriptFacadeService) {
		this.listenToScriptStateChanges();
	}

	listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	ctaCallScript(option: string | null) {
		if (!option) {
			return;
		}

		const alg = findAlgorithmKeyBasedOnValue(option);
		if (!alg) {
			return;
		}

		this.scriptFacadeService.dispatch(
			ScriptActions.callScript({
				configs: {
					alg
				}
			})
		);
	}
}
