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
import { BehaviorSubject, Observable } from 'rxjs';
import { AlgorithmType } from '../../model-compression/models/enums/algorithms.enum';
import { ChartToolsGlobalSignalsService } from '../../shared/components/ms-line-chart/services/chart-tools-global-signals.service';
import { RecordComparisonItem } from '../models/record-comparisson.interface';

@Injectable()
export class RecordsDataService {
	private _recordsMap: Map<AlgorithmType, RecordComparisonItem[]> = new Map();
	private _records: BehaviorSubject<RecordComparisonItem[]> = new BehaviorSubject<RecordComparisonItem[]>([]);
	private _algorithmType: BehaviorSubject<AlgorithmType> = new BehaviorSubject<AlgorithmType>(AlgorithmType.PRUNING);

	get algorithmType(): AlgorithmType {
		return this._algorithmType.value;
	}

	get algorithmType$(): Observable<AlgorithmType> {
		return this._algorithmType.asObservable();
	}

	set algorithmType(algorithmType: AlgorithmType) {
		this._recordsMap.set(this._algorithmType.value, this._records.value);
		this._algorithmType.next(algorithmType);
		const newRecords = this._recordsMap.get(algorithmType) || [];
		this._records.next(newRecords);
	}

	get records(): RecordComparisonItem[] {
		return this._records.value;
	}

	get records$(): Observable<RecordComparisonItem[]> {
		return this._records.asObservable();
	}

	addRecord(newRecord: RecordComparisonItem): void {
		this.stopTooltips();

		const currentRecords = this._records.value;
		const updatedRecords = [...currentRecords, newRecord];
		this._records.next(updatedRecords);
		this._recordsMap.set(this._algorithmType.value, updatedRecords);
	}

	updateRecord(index: number, updatedRecord: RecordComparisonItem): void {
		this.stopTooltips();

		const currentRecords = this._records.value;
		if (index >= 0 && index < currentRecords.length) {
			const updatedRecords = [...currentRecords];
			updatedRecords[index] = updatedRecord;
			this._records.next(updatedRecords);
			this._recordsMap.set(this._algorithmType.value, updatedRecords);
		}
	}

	removeRecord(index: number): void {
		this.stopTooltips();

		const currentRecords = this._records.value;
		if (index >= 0 && index < currentRecords.length) {
			const updatedRecords = currentRecords.filter((_, i) => i !== index);
			this._records.next(updatedRecords);
			this._recordsMap.set(this._algorithmType.value, updatedRecords);
		}
	}

	stopTooltips() {
		this.chartToolsGlobalSignalsService.toggleTooltips = false;
		this.chartToolsGlobalSignalsService.toggleZoom = false;
	}

	constructor(private chartToolsGlobalSignalsService: ChartToolsGlobalSignalsService) {}
}
