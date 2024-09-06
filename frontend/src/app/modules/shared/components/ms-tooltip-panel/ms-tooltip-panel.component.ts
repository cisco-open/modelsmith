import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'ms-tooltip-panel',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule],
	templateUrl: './ms-tooltip-panel.component.html',
	styleUrl: './ms-tooltip-panel.component.scss'
})
export class MsTooltipPanelComponent {
	@Input() contentTemplate?: TemplateRef<any>;
	@Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	@Input() showCloseButton = false;

	@Output() close = new EventEmitter<void>();
}
