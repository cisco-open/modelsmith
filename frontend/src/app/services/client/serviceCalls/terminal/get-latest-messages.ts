import { TerminalMessage } from '../../../../modules/core/models/interfaces/terminal-message.interface';
import { ServiceCallGET } from '../service-call';

export class GetLatestMessages extends ServiceCallGET<TerminalMessage[]> {
	constructor() {
		super(`latest-messages`, undefined, undefined, false);
	}
}
