import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';

@Component({
	selector: 'ms-step-pretrained-model',
	templateUrl: './step-pretrained-model.component.html',
	styleUrls: ['./step-pretrained-model.component.scss']
})
export class StepPretrainedModelComponent {
	selectedOption: string | null = '';

	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {}

	trackSelection(option: string | null) {
		this.selectedOption = option;
	}

	handleSelection() {
		if (this.selectedOption === 'Yes') {
			this.router.navigate([WIZARD_STEPS_ROUTES.PTQ_TIME], { relativeTo: this.route.parent });
		} else if (this.selectedOption === 'No') {
			this.router.navigate([WIZARD_STEPS_ROUTES.PRUNING_TIME], { relativeTo: this.route.parent });
		}
	}
}
