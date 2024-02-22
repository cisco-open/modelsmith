import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'ms-card-selector',
	templateUrl: './ms-card-selector.component.html',
	styleUrls: ['./ms-card-selector.component.scss']
})
export class MsCardSelectorComponent {
	@Input() options: string[] = [];
	@Output() selectedOption = new EventEmitter<string | null>();

	activeCard: string | null = null;

	selectCard(option: string) {
		this.activeCard = this.activeCard === option ? null : option;
		this.selectedOption.emit(this.activeCard);
	}

	trackByOption(index: number, option: string): string {
		return option;
	}
}
