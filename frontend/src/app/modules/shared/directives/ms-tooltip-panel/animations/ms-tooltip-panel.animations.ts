import { animate, state, style, transition, trigger } from '@angular/animations';

export const tooltipStateAnimation = trigger('tooltipState', [
	state(
		'hidden',
		style({
			opacity: 0,
			transform: 'scale(0.9)'
		})
	),
	state(
		'visible',
		style({
			opacity: 1,
			transform: 'scale(1)'
		})
	),
	transition('hidden => visible', animate('150ms ease-in')), // Ease-in on open
	transition('visible => hidden', animate('150ms ease-out')) // Ease-out on close
]);
