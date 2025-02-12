import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeTypes } from '../models/enums/theme-types.enum';

const THEME_LOCAL_STORAGE_KEY = 'theme';
const DEFAULT_THEME = ThemeTypes.DARK;

@Injectable()
export class ThemeService {
	private renderer2: Renderer2;
	private readonly themeAnchor = this.document.getElementById('theme');

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private rendererFactory: RendererFactory2
	) {
		this.renderer2 = this.rendererFactory.createRenderer(null, null);
	}

	public setTheme(theme: string): void {
		if (theme === ThemeTypes.LIGHT) {
			this.renderer2.setAttribute(this.themeAnchor, 'href', '/light-theme.css');
			localStorage.setItem(THEME_LOCAL_STORAGE_KEY, ThemeTypes.LIGHT);
		} else {
			this.renderer2.setAttribute(this.themeAnchor, 'href', '/dark-theme.css');
			localStorage.setItem(THEME_LOCAL_STORAGE_KEY, ThemeTypes.DARK);
		}
	}

	public setThemeFromStorage(): void {
		const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || DEFAULT_THEME;
		if (!theme) {
			return;
		}
		this.setTheme(theme);
	}

	public get theme(): ThemeTypes {
		return (localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || DEFAULT_THEME) as ThemeTypes;
	}
}
