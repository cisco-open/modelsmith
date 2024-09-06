import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { tooltipStateAnimation } from './animations/ms-tooltip-panel.animations';

@Component({
	selector: 'ms-tooltip-panel',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule],
	templateUrl: './ms-tooltip-panel.component.html',
	styleUrl: './ms-tooltip-panel.component.scss',
	animations: [tooltipStateAnimation]
})
export class MsTooltipPanelComponent {
	@Input() contentTemplate?: TemplateRef<any>;
	@Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	@Input() showCloseButton = false;
	@Input() state: 'hidden' | 'visible' = 'hidden';

	@Output() close = new EventEmitter<void>();

	triggerClose() {
		this.state = 'hidden';
		setTimeout(() => this.close.emit(), 150);
	}
}
