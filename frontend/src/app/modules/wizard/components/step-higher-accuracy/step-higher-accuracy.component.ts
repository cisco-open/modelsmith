import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';

@Component({
	selector: 'ms-step-higher-accuracy',
	templateUrl: './step-higher-accuracy.component.html',
	styleUrls: ['./step-higher-accuracy.component.scss']
})
export class StepHigherAccuracyComponent {
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
			this.router.navigate([WIZARD_STEPS_ROUTES.RECOMMENDED_BASIC_PTQ], {
				relativeTo: this.route.parent
			});
		} else if (this.selectedOption === 'No') {
			this.router.navigate([WIZARD_STEPS_ROUTES.RECOMMENDED_BRECQ], { relativeTo: this.route.parent });
		}
	}

	goToPreviousPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PTQ_TIME], { relativeTo: this.route.parent });
	}

	goToPretrainedPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRETRAINED_MODEL], { relativeTo: this.route.parent });
	}
}
