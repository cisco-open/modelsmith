import { UserDto } from '../../models/user/user.interface-dto';
import { ServiceCallPOST } from '../service-call';

export class PostLogin extends ServiceCallPOST<UserDto> {
	constructor(body: { email: string; password: string }) {
		super(`login/authenticate`, { ...body });

		if (this.mock) {
			this.url += '/post-response-body-200.json';
		}
	}
}
