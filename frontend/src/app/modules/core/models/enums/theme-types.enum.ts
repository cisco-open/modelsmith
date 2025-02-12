export const ThemeTypes = {
	LIGHT: 'light',
	DARK: 'dark'
} as const;

export type ThemeTypes = (typeof ThemeTypes)[keyof typeof ThemeTypes];
