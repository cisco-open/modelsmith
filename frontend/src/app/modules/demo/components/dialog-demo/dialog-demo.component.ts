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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DialogConfig, DialogService } from '../../../core/components/ms-dialog';
import { DialogBasicDemoComponent } from './dialog-basic-demo/dialog-basic-demo.component';
import { DialogCustomSizeComponent } from './dialog-custom-size/dialog-custom-size.component';

@Component({
	selector: 'ms-dialog-demo',
	templateUrl: './dialog-demo.component.html',
	styleUrls: ['./dialog-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDemoComponent implements OnInit {
	constructor(private dialogService: DialogService) {}

	ngOnInit(): void {}

	openBasicDialog() {
		const dialogRef = this.dialogService.open(DialogBasicDemoComponent, { title: 'Lorem Ipsum' } as DialogConfig);

		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Dialog closed!');
			});
	}

	openCustomSizeDialog() {
		const dialogRef = this.dialogService.open(DialogCustomSizeComponent, {
			title: 'Lorem Ipsum',
			width: '40vw',
			height: '50vh'
		} as DialogConfig);

		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Dialog with custom width closed!');
			});
	}
}
