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
import { RecordComparissonItem } from '../models/record-comparisson.interface';
import { recordsMock } from '../models/records-mock-data';

@Injectable()
export class RecordsDataService {
	private _records: BehaviorSubject<RecordComparissonItem[]> = new BehaviorSubject<RecordComparissonItem[]>(
		recordsMock
	);

	get records(): RecordComparissonItem[] {
		return this._records.value;
	}

	get records$(): Observable<RecordComparissonItem[]> {
		return this._records.asObservable();
	}

	addRecord(newRecord: RecordComparissonItem): void {
		const currentRecords = this._records.value;
		const updatedRecords = [...currentRecords, newRecord];

		this._records.next(updatedRecords);
	}

	updateRecord(index: number, updatedRecord: RecordComparissonItem): void {
		const currentRecords = this._records.value;
		if (index >= 0 && index < currentRecords.length) {
			const updatedRecords = [...currentRecords];
			updatedRecords[index] = updatedRecord;
			this._records.next(updatedRecords);
		}
	}

	removeRecord(index: number): void {
		const currentRecords = this._records.value;
		if (index >= 0 && index < currentRecords.length) {
			const updatedRecords = currentRecords.filter((_, i) => i !== index);
			this._records.next(updatedRecords);
		}
	}

	constructor() {}
}
