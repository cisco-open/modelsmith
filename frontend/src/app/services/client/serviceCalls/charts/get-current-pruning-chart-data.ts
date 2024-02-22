import { PruningProgress } from '../../models/charts/chart-data.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetCurrentPruningChartData extends ServiceCallGET<PruningProgress[]> {
	constructor() {
		super(`/current-pruning-chart-data`, undefined, undefined, false);
	}
}
