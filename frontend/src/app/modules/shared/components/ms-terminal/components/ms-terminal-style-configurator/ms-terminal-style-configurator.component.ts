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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import { fontFamilies } from '../../models/font-families.const';

@Component({
	selector: 'ms-terminal-style-configurator',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
	templateUrl: './ms-terminal-style-configurator.component.html',
	styleUrl: './ms-terminal-style-configurator.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class MsTerminalStyleConfiguratorComponent implements OnInit, OnDestroy {
	@ViewChild('terminalContainer', { static: true }) terminalDiv!: ElementRef;

	private destroyRef = inject(DestroyRef);
	private fb = inject(FormBuilder);
	public fontFamilies = fontFamilies;

	private terminal!: Terminal;
	private fitAddon = new FitAddon();
	private resizeObserver?: ResizeObserver;

	public form: FormGroup = this.fb.group({
		fontSize: [14],
		fontFamily: ['Courier New'],
		background: ['#1e1e1e'],
		foreground: ['#ffffff']
	});

	ngOnInit(): void {
		this.initializeTerminal();

		this.writeTerminalDemoText();
		this.listenToStyleChanges();
	}

	private initializeTerminal(): void {
		this.terminal = new Terminal({
			cursorBlink: true,
			theme: {
				background: '#D0D4D9',
				foreground: '#000000',
				cursor: '#000000',
				selectionBackground: '#FFDD00',
				selectionForeground: '#000000'
			},
			allowProposedApi: true,
			scrollback: 1000
		});

		this.terminal.loadAddon(this.fitAddon);
		this.terminal.open(this.terminalDiv.nativeElement);
		this.setupResizeObserver();
	}

	private listenToStyleChanges(): void {
		this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
			this.terminal.options.fontSize = values.fontSize;
			this.terminal.options.fontFamily = values.fontFamily;

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
		const demoText =
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vestibulum vehicula ex eu gravida cursus. Curabitur ac ultrices odio. Integer sit amet neque at elit facilisis placerat. Phasellus euismod, sapien a interdum tempus, leo sapien commodo lacus, a posuere lacus tortor at justo. Sed sit amet urna vitae tortor commodo luctus. Nulla facilisi. Vivamus at felis eget sapien volutpat tincidunt. Mauris ut massa vel nunc aliquam semper. Praesent at dui ut neque dapibus tincidunt. Etiam euismod, metus at facilisis finibus, massa arcu bibendum orci, in semper justo turpis nec arcu.';

		this.terminal.writeln('Welcome to xterm.js!\n');
		this.terminal.writeln(demoText);
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		if (this.terminal) {
			this.terminal.dispose();
		}
	}
}
