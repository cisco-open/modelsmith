import { QuantizationProgress } from '../../models/charts/chart-data.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetCurrentQuantizationChartData extends ServiceCallGET<QuantizationProgress[]> {
	constructor() {
		super(`/current-quantization-chart-data`, undefined, undefined, false);
	}
}
