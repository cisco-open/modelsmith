import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScriptConfigsDto } from '../../../../services/client/models/script/script-configs.interface-dto';
import { ScriptActions } from '../../../../state/core/script/script.actions';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import {
	MachineUnlearningAlgorithmsEnum,
	TrainAlgorithmsEnum
} from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { MsPanelParametersComponent } from '../../../shared/components/ms-panel-parameters/ms-panel-parameters.component';

@UntilDestroy()
@Component({
	selector: 'ms-machine-unlearning',
	templateUrl: './machine-unlearning.component.html',
	styleUrls: ['./machine-unlearning.component.scss']
})
export class MachineUnlearningComponent implements OnInit {
	isScriptActive: boolean = false;

	@ViewChild('panelParameters', { static: false }) panelParametersComponent!: MsPanelParametersComponent;

	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private scriptFacadeService: ScriptFacadeService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.initForm();
		this.listenToScriptStateChanges();
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);

			if (isScriptActive(state)) {
				this.form.disable();
			} else {
				this.form.enable();
			}
		});
	}

	private initForm() {
		this.form = this.fb.group({
			algorithm: this.fb.group({
				alg: []
			}),
			model: [],
			params: []
		});

		setTimeout(() => {
			this.form.get('algorithm.alg')?.setValue(MachineUnlearningAlgorithmsEnum.MU);
		}, 0);
	}

	submit() {
		if (this.isScriptActive) {
			return;
		}

		const { algorithm } = this.form.getRawValue();

		const configs: ScriptConfigsDto = {
			...algorithm,
			params: this.panelParametersComponent.parametersFormatted
		};

		this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}

	retrainModel() {
		if (this.isScriptActive) {
			return;
		}

		const configs: ScriptConfigsDto = {
			alg: TrainAlgorithmsEnum.MUT
		};

		this.scriptFacadeService.dispatch(ScriptActions.callScript({ configs }));
	}

	goToChartPage() {
		this.router.navigate([RoutesList.RUNNING.ROOT]);
	}
}
