import { Observable } from 'rxjs';
import { ServiceCall } from './serviceCalls/service-call';

export interface Client {
	serviceCall<Response>(serviceCall: ServiceCall<Response>): Observable<Response>;
}
