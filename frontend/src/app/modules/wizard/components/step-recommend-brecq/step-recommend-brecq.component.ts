import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { getSpecificAlgorithmOptions } from '../../../model-compression/models/constants/algorithm.constants';
import { QuantizationAlgorithmsEnum } from '../../../model-compression/models/enums/algorithms.enum';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';
import { WizardUtilsService } from '../../services/wizard-utils.service';

@Component({
	selector: 'ms-step-recommend-brecq',
	templateUrl: './step-recommend-brecq.component.html',
	styleUrls: ['./step-recommend-brecq.component.scss']
})
export class StepRecommendBrecqComponent {
	selectedOption: string | null = '';
	algorithms: string[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public wizardUtilsService: WizardUtilsService
	) {
		this.algorithms = getSpecificAlgorithmOptions([QuantizationAlgorithmsEnum.BRECQ]);
	}

	trackSelection(option: string | null) {
		this.selectedOption = option;
	}

	handleSelection() {
		this.wizardUtilsService.ctaCallScript(this.selectedOption);
	}

	goToPreviousPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.HIGHER_ACCURACY], { relativeTo: this.route.parent });
	}

	goToPretrainedPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRETRAINED_MODEL], { relativeTo: this.route.parent });
	}

	goToPTQPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PTQ_TIME], { relativeTo: this.route.parent });
	}

	goToChartPage() {
		this.router.navigate([`${RoutesList.MODEL_COMPRESSION.ROOT}/${RoutesList.MODEL_COMPRESSION.RUNNING.ROOT}`]);
	}
}
