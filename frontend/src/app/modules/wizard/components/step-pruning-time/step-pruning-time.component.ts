import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';

@Component({
	selector: 'ms-step-pruning-time',
	templateUrl: './step-pruning-time.component.html',
	styleUrls: ['./step-pruning-time.component.scss']
})
export class StepPruningTimeComponent {
	wizardSteps = WIZARD_STEPS_ROUTES;

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
			this.router.navigate([WIZARD_STEPS_ROUTES.RECOMMENDED_ITERATIVE], { relativeTo: this.route.parent });
		} else if (this.selectedOption === 'No') {
			this.router.navigate([WIZARD_STEPS_ROUTES.SIMILAR_ACCURACY], { relativeTo: this.route.parent });
		}
	}

	goToPreviousPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRETRAINED_MODEL], { relativeTo: this.route.parent });
	}
}
