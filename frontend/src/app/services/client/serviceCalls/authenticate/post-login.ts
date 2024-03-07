//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

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
