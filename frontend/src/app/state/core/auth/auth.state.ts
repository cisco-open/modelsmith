import { UserDto } from '../../../services/client/models/user/user.interface-dto';

export interface AuthState {
	isAuthenticated: boolean;
	user: UserDto;
	error: any | null;
}
