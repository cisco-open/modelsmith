import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';

@Component({
	selector: 'ms-step-ptq-time',
	templateUrl: './step-ptq-time.component.html',
	styleUrls: ['./step-ptq-time.component.scss']
})
export class StepPtqTimeComponent {
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
			this.router.navigate([WIZARD_STEPS_ROUTES.RECOMMENDED_MINMAX], { relativeTo: this.route.parent });
		} else if (this.selectedOption === 'No') {
			this.router.navigate([WIZARD_STEPS_ROUTES.HIGHER_ACCURACY], { relativeTo: this.route.parent });
		}
	}

	goToPreviousPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRETRAINED_MODEL], { relativeTo: this.route.parent });
	}
}
