//   Copyright 2024 Cisco Systems, Inc.

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

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isEmptyObject } from '../../../shared/shared.utils';
import { AlgorithmComparisonTableItem } from '../../models/algorithm-comparison-table-item.interface';
import { RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';

@UntilDestroy()
@Component({
	selector: 'ms-algorithm-comparison-table',
	templateUrl: './algorithm-comparison-table.component.html',
	styleUrls: ['./algorithm-comparison-table.component.scss']
})
export class AlgorithmComparisonTableComponent implements OnInit, AfterViewInit {
	dataSource = new MatTableDataSource<AlgorithmComparisonTableItem>();
	displayedColumns: string[] = [];

	@ViewChild(MatSort) sort?: MatSort;

	constructor(private recordsDataService: RecordsDataService) {}

	ngOnInit(): void {
		this.recordsDataService.records$.pipe(untilDestroyed(this)).subscribe((records) => {
			this.updateDisplayedColumns(records);
			this.updateDataSource(records);
		});
	}

	ngAfterViewInit() {
		if (!isEmptyObject(this.sort)) {
			setTimeout(() => {
				this.dataSource.sort = this.sort!;
			}, 1200);
		}
	}

	updateDisplayedColumns(records: RecordComparisonItem[]): void {
		const allParameters = new Set<string>();

		records.forEach((record) => {
			Object.keys(record.record.parameters).forEach((param) => {
				if (param !== 'save_dir' && param !== 'data') {
					allParameters.add(param);
				}
			});
		});

		this.displayedColumns = ['recordName', ...Array.from(allParameters)];
	}

	updateDataSource(records: RecordComparisonItem[]): void {
		const data = records.map((record) => {
			const params = record.record.parameters;
			return { recordName: record.recordName, ...params } as AlgorithmComparisonTableItem;
		});
		this.dataSource.data = data;
	}
}
