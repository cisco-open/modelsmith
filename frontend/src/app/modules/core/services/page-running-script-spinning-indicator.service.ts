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
import { BehaviorSubject, Observable, filter, map, skip, switchMap, take, tap } from 'rxjs';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from '../../../state/core/script';
import { AlgorithmType } from '../../model-compression/models/enums/algorithms.enum';
import { ScriptStatusEnum } from '../../model-compression/models/enums/script-status.enum';
import { isNilOrEmptyString } from '../../shared/shared.utils';
import { PageKey } from '../models/enums/page-key.enum';
import { ScriptFacadeService } from './script-facade.service';

@Injectable()
export class PageRunningScriptSpiningIndicatorService {
	private _currentRunningPage: BehaviorSubject<PageKey> = new BehaviorSubject<PageKey>(PageKey.NONE);

	get currentRunningPage$(): Observable<PageKey> {
		return this._currentRunningPage.asObservable();
	}

	constructor(private scriptFacadeService: ScriptFacadeService) {}

	public trackCurrentRunningPage() {
		this.scriptFacadeService.scriptStatus$
			.pipe(
				filter(
					(status: ScriptStatusEnum | null) =>
						status === ScriptStatusEnum.RUNNING || status === ScriptStatusEnum.STOPPING
				),
				tap(() => this.scriptFacadeService.dispatch(ScriptActions.getCurrentOrLastActiveScriptDetails())),
				switchMap(() =>
					this.scriptFacadeService.scriptDetails$.pipe(
						skip(1),
						take(1),
						filter((scriptDetails): scriptDetails is ScriptDetails => !isNilOrEmptyString(scriptDetails?.algKey))
					)
				),
				map((scriptDetails: ScriptDetails) => scriptDetails.type)
			)
			.subscribe((type: AlgorithmType) => {
				switch (type) {
					case AlgorithmType.PRUNING:
					case AlgorithmType.QUANTIZATION:
						this._currentRunningPage.next(PageKey.MODEL_COMPRESSION);
						break;
					case AlgorithmType.MACHINE_UNLEARNING: {
						this._currentRunningPage.next(PageKey.MACHINE_UNLEARNING);
						break;
					}
					case AlgorithmType.AWQ: {
						this._currentRunningPage.next(PageKey.AWQ);
						break;
					}
					case AlgorithmType.TRAIN: {
						this._currentRunningPage.next(PageKey.MODEL_TRAINING);
						break;
					}
					case AlgorithmType.MULTIFLOW: {
						this._currentRunningPage.next(PageKey.MODEL_SPECIALIZATION);
						break;
					}
					default: {
						this._currentRunningPage.next(PageKey.NONE);
						break;
					}
				}
			});

		this.scriptFacadeService.scriptStatus$.subscribe((status: ScriptStatusEnum | null) => {
			if (status !== ScriptStatusEnum.RUNNING && status !== ScriptStatusEnum.STOPPING) {
				this._currentRunningPage.next(PageKey.NONE);
			}
		});
	}
}
