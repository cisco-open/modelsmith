import { Injectable } from '@angular/core';
import { ISearchDecorationOptions } from '@xterm/addon-search';
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
		document.documentElement.style.setProperty('--terminal-color', styles.background);
	}

	restoreDefaultStyles(): void {
		localStorage.setItem(this.TERMINAL_STYLES_STORAGE_KEY, JSON.stringify(DEFAULT_TERMINAL_STYLES));
	}

	createTerminalInstance(optionsOverrides?: Partial<ITerminalOptions>, themeOverrides?: Partial<ITheme>): Terminal {
		const savedStyles = this.getTerminalStyles();

		document.documentElement.style.setProperty('--terminal-color', savedStyles.background);

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

	getSearchDecorationOptions(): ISearchDecorationOptions {
		const savedStyles = this.getTerminalStyles();
		const highlightColor = this.getContrastColor(savedStyles.background);

		return {
			matchBackground: highlightColor,
			matchBorder: highlightColor,
			matchOverviewRuler: highlightColor,
			activeMatchBackground: highlightColor,
			activeMatchBorder: highlightColor,
			activeMatchColorOverviewRuler: highlightColor
		};
	}

	private getContrastColor(hex: string): string {
		let c = hex.startsWith('#') ? hex.substring(1) : hex;
		// Convert 3-digit hex to 6-digit
		if (c.length === 3) {
			c = c
				.split('')
				.map((x) => x + x)
				.join('');
		}
		const rgb = parseInt(c, 16);
		const r = (rgb >> 16) & 0xff;
		const g = (rgb >> 8) & 0xff;
		const b = rgb & 0xff;

		// Simple luminance approximation
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

		// If background is dark, return a bright highlight color;
		// otherwise use a darker color that contrasts against light backgrounds.
		return luminance < 128 ? '#FFFF00' : '#FF8C00';
	}
}
