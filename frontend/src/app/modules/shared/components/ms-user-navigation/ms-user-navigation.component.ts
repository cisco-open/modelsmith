import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../../../services/client/models/user/user.interface-dto';
import { AuthActions } from '../../../../state/core/auth';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { AuthFacadeService } from '../../../core/services/auth-facade.service';

@Component({
	selector: 'ms-user-navigation',
	templateUrl: './ms-user-navigation.component.html',
	styleUrls: ['./ms-user-navigation.component.scss']
})
export class MsUserNavigationComponent {
	readonly RoutesList = RoutesList;
	user$: Observable<UserDto>;

	constructor(private authFacadeService: AuthFacadeService) {
		this.user$ = this.authFacadeService.user$;
	}

	logout() {
		this.authFacadeService.dispatch(AuthActions.logout());
	}
}
