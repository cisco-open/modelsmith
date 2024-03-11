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

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ag-cards-demo',
	templateUrl: './cards-demo.component.html',
	styleUrls: ['./cards-demo.component.scss']
})
export class CardsDemoComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	handleSelected(option: string | null) {
		console.log('Selected option:', option);
	}
}
