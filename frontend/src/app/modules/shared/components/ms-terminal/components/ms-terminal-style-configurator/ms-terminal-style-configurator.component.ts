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
import {
	Component,
	DestroyRef,
	ElementRef,
	inject,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FitAddon } from '@xterm/addon-fit';
import { SearchAddon } from '@xterm/addon-search';
import { Terminal } from '@xterm/xterm';
import { NgxColorsModule } from 'ngx-colors';
import { take } from 'rxjs';
import { PopoverRef } from '../../../../../core/components/ms-popover';
import { PopoverPosition } from '../../../../../core/components/ms-popover/models/enums/popover-position.enum';
import { PopoverService } from '../../../../../core/components/ms-popover/service/popover.service';
import { isNil } from '../../../../shared.utils';
import { BannerService } from '../../../ms-banner/services/banner.service';
import { FONT_FAMILIES } from '../../models/font-families.const';
import { FONT_WEIGHT } from '../../models/font-weight.const';
import { TerminalStylesService } from '../../services/terminal-styles.service';
import { MsTerminalToolbarSearchPopoverComponent } from '../ms-terminal-toolbar-search-popover/ms-terminal-toolbar-search-popover.component';

@Component({
	selector: 'ms-terminal-style-configurator',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		NgxColorsModule,
		MatTooltipModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule
	],
	templateUrl: './ms-terminal-style-configurator.component.html',
	styleUrl: './ms-terminal-style-configurator.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [PopoverService]
})
export class MsTerminalStyleConfiguratorComponent implements OnInit, OnDestroy {
	@ViewChild('terminalContainer', { static: true }) terminalDiv!: ElementRef;

	private destroyRef = inject(DestroyRef);
	private fb = inject(FormBuilder);
	private terminalStylesService = inject(TerminalStylesService);
	private bannerService = inject(BannerService);
	private popoverService = inject(PopoverService);

	public fontFamilies = FONT_FAMILIES;
	public fontWeight = FONT_WEIGHT;

	private terminal!: Terminal;
	private fitAddon = new FitAddon();
	private resizeObserver?: ResizeObserver;
	private searchPanelRef?: PopoverRef;

	public form: FormGroup = new FormGroup({});

	private searchAddon = new SearchAddon();

	ngOnInit(): void {
		this.initializeForm();
		this.initializeTerminal();
		this.writeTerminalDemoText();
		this.listenToStyleChanges();
	}

	private initializeForm() {
		const savedStyles = this.terminalStylesService.getTerminalStyles();

		this.form = this.fb.group({
			fontSize: [savedStyles.fontSize],
			fontFamily: [savedStyles.fontFamily],
			fontWeight: [savedStyles.fontWeight],
			background: [savedStyles.background],
			foreground: [savedStyles.foreground],
			cursor: [savedStyles.cursor],
			selectionBackground: [savedStyles.selectionBackground],
			selectionForeground: [savedStyles.selectionForeground]
		});
	}

	private initializeTerminal(): void {
		this.terminal = this.terminalStylesService.createTerminalInstance();

		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);

		this.terminal.open(this.terminalDiv.nativeElement);
		this.setupResizeObserver();
	}

	private listenToStyleChanges(): void {
		this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
			this.terminal.options.fontFamily = values.fontFamily;
			this.terminal.options.fontSize = values.fontSize;
			this.terminal.options.fontWeight = values.fontWeight;

			this.terminal.options.theme = {
				...this.terminal.options.theme,
				cursor: values.cursor,
				background: values.background,
				foreground: values.foreground,
				selectionBackground: values.selectionBackground,
				selectionForeground: values.selectionForeground
			};

			this.fitAddon.fit();
		});
	}

	private setupResizeObserver(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
		this.resizeObserver = new ResizeObserver(() => {
			this.fitAddon.fit();
		});
		this.resizeObserver.observe(this.terminalDiv.nativeElement);
	}

	private writeTerminalDemoText(): void {
		this.terminal.writeln('Welcome to ModelSmith terminal style configurator!\n');
		this.terminal.writeln(
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vestibulum vehicula ex eu gravida cursus. Curabitur ac ultrices odio. Integer sit amet neque at elit facilisis placerat. Phasellus euismod, sapien a interdum tempus, leo sapien commodo lacus, a posuere lacus tortor at justo. Sed sit amet urna vitae tortor commodo luctus. Nulla facilisi. Vivamus at felis eget sapien volutpat tincidunt. Mauris ut massa vel nunc aliquam semper. Praesent at dui ut neque dapibus tincidunt. Etiam euismod, metus at facilisis finibus, massa arcu bibendum orci, in semper justo turpis nec arcu.'
		);
	}

	applyChanges(): void {
		this.terminalStylesService.saveTerminalStyles(this.form.value);
		this.form.markAsPristine();
		this.bannerService.showSuccess('Terminal styles have been successfully applied.');
	}

	restoreDefaults(): void {
		this.terminalStylesService.restoreDefaultStyles();
		const defaultStyles = this.terminalStylesService.getTerminalStyles();
		this.form.setValue(defaultStyles);
		this.bannerService.showInfo(`Terminal styles have been restored to default settings.`);
	}

	public hasUnsavedChanges(): boolean {
		return this.form.dirty;
	}

	public search(value: string): void {
		this.searchAddon.findNext(value, {
			decorations: this.terminalStylesService.getSearchDecorationOptions()
		});
	}

	public openPanel(origin: MatIconButton) {
		if (!isNil(this.searchPanelRef)) {
			return;
		}

		this.searchPanelRef = this.popoverService.open(
			MsTerminalToolbarSearchPopoverComponent,
			origin._elementRef,
			{
				position: PopoverPosition.LEFT,
				width: '200px',
				height: '60px'
			},
			''
		);

		this.searchPanelRef.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: any) => {
			this.search(data);
		});

		this.searchPanelRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				this.searchPanelRef = undefined;
				this.searchAddon.clearDecorations();
				this.searchAddon.findNext('');
			});
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		if (this.terminal) {
			this.terminal.dispose();
		}
	}
}
