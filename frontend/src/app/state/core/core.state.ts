import { AuthState } from './auth';
import { ChartsState } from './charts';
import { ConfigsState } from './configs';
import { FileState } from './file';
import { ParametersState } from './parameters';
import { ScriptState } from './script';
import { StatisticsState } from './statistics';
import { TerminalState } from './terminal';

export interface CoreState {
	auth: AuthState;
	configs: ConfigsState;
	script: ScriptState;
	fileState: FileState;
	charts: ChartsState;
	parameters: ParametersState;
	terminal: TerminalState;
	statistics: StatisticsState;
}
