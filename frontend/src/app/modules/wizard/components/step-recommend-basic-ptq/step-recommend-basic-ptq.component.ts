//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { getSpecificAlgorithmOptions } from '../../../model-compression/models/constants/algorithm.constants';
import { QuantizationAlgorithmsEnum } from '../../../model-compression/models/enums/algorithms.enum';
import { WIZARD_STEPS_ROUTES } from '../../models/wizard-steps-routes.constants';
import { WizardUtilsService } from '../../services/wizard-utils.service';

@Component({
	selector: 'ms-step-recommend-basic-ptq',
	templateUrl: './step-recommend-basic-ptq.component.html',
	styleUrls: ['./step-recommend-basic-ptq.component.scss']
})
export class StepRecommendBasicPtqComponent {
	selectedOption: string | null = '';
	algorithms: string[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public wizardUtilsService: WizardUtilsService
	) {
		this.algorithms = getSpecificAlgorithmOptions([QuantizationAlgorithmsEnum.BPTQ]);
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

	goToPTQPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PTQ_TIME], { relativeTo: this.route.parent });
	}

	goToPretrainedPage() {
		this.router.navigate([WIZARD_STEPS_ROUTES.PRETRAINED_MODEL], { relativeTo: this.route.parent });
	}

	goToChartPage() {
		this.router.navigate([`${RoutesList.RUNNING.ROOT}`]);
	}
}
