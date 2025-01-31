export const PopoverPosition = {
	TOP: 'top',
	LEFT: 'left',
	RIGHT: 'right',
	BOTTOM: 'bottom'
} as const;

export type PopoverPosition = (typeof PopoverPosition)[keyof typeof PopoverPosition];
