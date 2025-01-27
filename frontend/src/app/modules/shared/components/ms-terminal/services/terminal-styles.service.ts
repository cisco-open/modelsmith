import { Injectable } from '@angular/core';
import { ITerminalOptions, ITheme, Terminal } from '@xterm/xterm';
import { DEFAULT_TERMINAL_STYLES } from '../models/default-terminal-styles.const';
import { DefaultTerminalStyles } from '../models/default-terminal-styles.interface';

@Injectable({ providedIn: 'root' })
export class TerminalStylesService {
	private readonly TERMINAL_STYLES_STORAGE_KEY = 'terminal-styles';

	getTerminalStyles(): DefaultTerminalStyles {
		const data = localStorage.getItem(this.TERMINAL_STYLES_STORAGE_KEY);
		return data ? JSON.parse(data) : { ...DEFAULT_TERMINAL_STYLES };
	}

	saveTerminalStyles(styles: DefaultTerminalStyles): void {
		localStorage.setItem(this.TERMINAL_STYLES_STORAGE_KEY, JSON.stringify(styles));
	}

	restoreDefaultStyles(): void {
		localStorage.setItem(this.TERMINAL_STYLES_STORAGE_KEY, JSON.stringify(DEFAULT_TERMINAL_STYLES));
	}

	createTerminalInstance(optionsOverrides?: Partial<ITerminalOptions>, themeOverrides?: Partial<ITheme>): Terminal {
		const savedStyles = this.getTerminalStyles();

		const theme = {
			background: savedStyles.background,
			foreground: savedStyles.foreground,
			cursor: savedStyles.cursor,
			selectionBackground: savedStyles.selectionBackground,
			selectionForeground: savedStyles.selectionForeground,
			...themeOverrides
		};

		const options: ITerminalOptions = {
			cursorBlink: true,
			theme,
			fontFamily: savedStyles.fontFamily,
			fontWeight: savedStyles.fontWeight as ITerminalOptions['fontWeight'],
			fontSize: savedStyles.fontSize,
			allowProposedApi: true,
			scrollback: 1000,
			...optionsOverrides
		};

		return new Terminal(options);
	}
}
