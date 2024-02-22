import { ParametersDto } from '../../../services/client/models/parameters/parameter.interface-dto';

export interface ParametersState {
	[key: string]: {
		data: ParametersDto[] | null;
		error: any | null;
		loaded: boolean;
	};
}
