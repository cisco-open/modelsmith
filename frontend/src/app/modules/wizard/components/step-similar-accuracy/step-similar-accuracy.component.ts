import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';

@Component({
	selector: 'ms-step-similar-accuracy',
	templateUrl: './step-similar-accuracy.component.html',
	styleUrls: ['./step-similar-accuracy.component.scss']
})
export class StepSimilarAccuracyComponent {
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
			this.router.navigate([WIZARD_STEPS_ROUTES.RECOMMENDED_ITERATIVE_ONE_SHOT], { relativeTo: this.route.parent });
		} else if (this.selectedOption === 'No') {
			this.router.navigate([WIZARD_STEPS_ROUTES.RECOMMENDED_GRASP], { relativeTo: this.route.parent });
		}
	}

	goToPreviousPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRUNING_TIME], { relativeTo: this.route.parent });
	}

	goToPretrainedPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRETRAINED_MODEL], { relativeTo: this.route.parent });
	}
}
