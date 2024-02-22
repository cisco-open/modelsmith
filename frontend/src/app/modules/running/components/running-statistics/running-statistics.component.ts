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
