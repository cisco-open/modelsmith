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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyValue } from '../../../../services/client/models/key-value/key-value.interface-dto';
import { StatisticsActions } from '../../../../state/core/statistics';
import { StatisticsFacadeService } from '../../../core/services';

@Component({
	selector: 'ms-running-statistics',
	templateUrl: './running-statistics.component.html',
	styleUrls: ['./running-statistics.component.scss']
})
export class RunningStatisticsComponent implements OnInit {
	statistics$: Observable<KeyValue<string> | null>;

	constructor(private statisticsFacadeService: StatisticsFacadeService) {
		this.statistics$ = this.statisticsFacadeService.statistics$;
	}

	ngOnInit(): void {
		this.statisticsFacadeService.dispatch(StatisticsActions.getStatistics());
	}
}
