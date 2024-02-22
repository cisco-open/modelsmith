import { MachineUnlearningProgress } from '../../models/charts/chart-data.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetCurrentMachineUnlearningChartData extends ServiceCallGET<MachineUnlearningProgress[]> {
	constructor() {
		super(`/current-machine-unlearning-chart-data`, undefined, undefined, false);
	}
}
