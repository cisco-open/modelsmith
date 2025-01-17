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
import { BehaviorSubject, Observable, filter, skip, switchMap, take, tap } from 'rxjs';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';
import { ScriptActions } from '../../../state/core/script';
import { AlgorithmType } from '../../model-compression/models/enums/algorithms.enum';
import { ScriptStatusEnum } from '../../model-compression/models/enums/script-status.enum';
import { isNilOrEmptyString } from '../../shared/shared.utils';
import { PageKey } from '../models/enums/page-key.enum';
import { CurrentRunningPageInfo } from '../models/interfaces/current-running-page-info.interface';
import { ScriptFacadeService } from './script-facade.service';

@Injectable()
export class PageRunningScriptSpiningIndicatorService {
	private _currentRunningPageInfo = new BehaviorSubject<CurrentRunningPageInfo>({
		page: PageKey.NONE,
		algKey: '',
		type: null
	});

	get currentRunningPageInfo$(): Observable<CurrentRunningPageInfo> {
		return this._currentRunningPageInfo.asObservable();
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
				)
			)
			.subscribe((scriptDetails: ScriptDetails) => {
				let page: PageKey;

				switch (scriptDetails.type) {
					case AlgorithmType.PRUNING:
					case AlgorithmType.QUANTIZATION:
						page = PageKey.MODEL_COMPRESSION;
						break;
					case AlgorithmType.MACHINE_UNLEARNING:
						page = PageKey.MACHINE_UNLEARNING;
						break;
					case AlgorithmType.AWQ:
						page = PageKey.AWQ;
						break;
					case AlgorithmType.TRAIN:
						page = PageKey.MODEL_TRAINING;
						break;
					case AlgorithmType.MULTIFLOW:
						page = PageKey.MODEL_SPECIALIZATION;
						break;
					case AlgorithmType.DIFFUSION_MODEL:
						page = PageKey.DIFFUSION_MODEL;
						break;
					default:
						page = PageKey.NONE;
						break;
				}

				this._currentRunningPageInfo.next({
					page,
					algKey: scriptDetails.algKey ?? '',
					type: scriptDetails.type ?? null
				});
			});

		this.scriptFacadeService.scriptStatus$.subscribe((status: ScriptStatusEnum | null) => {
			if (status !== ScriptStatusEnum.RUNNING && status !== ScriptStatusEnum.STOPPING) {
				this._currentRunningPageInfo.next({
					page: PageKey.NONE,
					algKey: '',
					type: null
				});
			}
		});
	}
}
