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

import { animate, style, transition, trigger } from '@angular/animations';

export const fadeRightToLeftAnimation = trigger('fadeRightToLeft', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateX(100%)' }),
		animate('300ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
	]),
	transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0, transform: 'translateX(100%)' }))])
]);
