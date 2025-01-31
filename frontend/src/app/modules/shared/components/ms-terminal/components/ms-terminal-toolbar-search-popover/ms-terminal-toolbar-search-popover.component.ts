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

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { delay } from 'rxjs';
import { POPOVER_DATA, PopoverRef } from '../../../../../core/components/ms-popover';
import { MsPopoverComponent } from '../../../../../core/components/ms-popover/components/ms-popover/ms-popover.component';
import { PopoverConfig } from '../../../../../core/components/ms-popover/models/interfaces/popover-config.interface';
import { AutofocusDirective } from '../../../../directives/autofocus.directive';
import { ErrorDisplayDirective } from '../../../../directives/error-display/error-display.directive';

@Component({
	selector: 'ms-terminal-toolbar-search-popover',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MsPopoverComponent,
		ErrorDisplayDirective,
		AutofocusDirective
	],
	templateUrl: './ms-terminal-toolbar-search-popover.component.html',
	styleUrls: ['./ms-terminal-toolbar-search-popover.component.scss']
})
export class MsTerminalToolbarSearchPopoverComponent implements OnInit {
	searchForm: FormGroup = new FormGroup({});

	get searchFormControl(): FormGroup {
		return this.searchForm.get('search') as FormGroup;
	}

	constructor(
		private destroyRef: DestroyRef,
		private popoverRef: PopoverRef,
		@Inject(POPOVER_DATA) public iconPanelConfig: PopoverConfig,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.initForm();
		this.listenToSearchFormControlValueChanges();
	}

	private initForm(): void {
		this.searchForm = this.fb.group({
			search: ['']
		});
	}

	private listenToSearchFormControlValueChanges() {
		this.searchFormControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef), delay(200)).subscribe((value) => {
			this.popoverRef.emitData(value);
		});
	}
}
