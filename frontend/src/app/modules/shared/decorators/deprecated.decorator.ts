//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { environment } from '../../../../environments/environment';

type Constructor<T = {}> = new (...args: any[]) => T;

export function Deprecated(oldSelector: string) {
	return <T extends Constructor>(Base: T) => {
		return class Deprecated extends Base {
			selectors = [];
			constructor(...args: any[]) {
				super(...args);
				if (!environment.production) {
					console.warn(`The selector ${oldSelector} is going to be deprecated. Please avoid using it.`);
				}
			}
		};
	};
}
