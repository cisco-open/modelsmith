import { ChartTypeEnum } from '../../../../modules/shared/models/enums/chart-type.enum';
import { ChartConfigurationSettingsDictionary } from '../../models/charts/chart-settings.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetChartConfigurationSettings extends ServiceCallGET<ChartConfigurationSettingsDictionary> {
	constructor(chartTypes: ChartTypeEnum[]) {
		const queryString = `type=${chartTypes.join(',')}`;
		super(`/chart-configuration-settings?${queryString}`, undefined, undefined, false);
	}
}
