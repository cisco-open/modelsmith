import { AppModes } from '../../../modules/core/models/enums/app-modes.enum';

export interface ConfigsState {
	defaultMode?: AppModes;
	currentMode?: AppModes;
}
