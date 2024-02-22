import { Component } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap, take } from 'rxjs';
import { ScriptDetails } from '../../../../services/client/models/script/script-details.interface-dto';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { isEmptyObject } from '../../../core/utils/core.utils';
import {
	DEFAULT_SELECTED_ALGORITHM,
	PRUNING_ALGORITHMS_LIST,
	QUANTIZATION_ALGORITHMS_LIST
} from '../../models/constants/algorithm.constants';
import { AlgorithmType } from '../../models/enums/algorithms.enum';
import { isScriptActive } from '../../models/enums/script-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-algorithm',
	templateUrl: './panel-algorithm.component.html',
	styleUrls: ['./panel-algorithm.component.scss']
})
export class PanelAlgorithmComponent {
	form!: FormGroup;

	readonly pruningAlgorithmsList = PRUNING_ALGORITHMS_LIST;
	readonly quantAlgorithmsList = QUANTIZATION_ALGORITHMS_LIST;

	readonly ALGORITHM_CONTROL_NAME: string = 'alg';

	get algorithmFormControl(): AbstractControl | null {
		return this.form.get(this.ALGORITHM_CONTROL_NAME);
	}

	constructor(
		private fb: FormBuilder,
		private controlContainer: ControlContainer,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initForm();
		this.listenToScriptStateChanges();
		this.loadInitialData();
	}

	/**
	 * Initializes the loading process based on the script's active status.
	 * It checks whether a script is currently active. If it is, the function
	 * retrieves the active script's details. If no script is active, it sets
	 * the algorithm value to a default constant.
	 */
	private loadInitialData() {
		this.scriptFacadeService.scriptStatus$
			.pipe(
				switchMap((status) => {
					return isScriptActive(status)
						? this.scriptFacadeService.scriptDetails$.pipe(take(1))
						: of({ algKey: DEFAULT_SELECTED_ALGORITHM } as ScriptDetails);
				}),
				take(1)
			)
			.subscribe((data: ScriptDetails | null) => {
				if (isEmptyObject(data)) {
					return;
				}

				const algorithmType = data?.type;
				const isPruningOrQuantization = 
					algorithmType === AlgorithmType.PRUNING || 
					algorithmType === AlgorithmType.QUANTIZATION;

				const initialAlgorithmValue = isPruningOrQuantization ? data!.algKey : DEFAULT_SELECTED_ALGORITHM;

				this.setInitialAlgorithmValue(initialAlgorithmValue);
			});
	}

	private setInitialAlgorithmValue(algorithm: string): void {
		this.algorithmFormControl?.setValue(algorithm, { emitEvent: true });
	}

	private initForm() {
		this.form = this.fb.group({
			[this.ALGORITHM_CONTROL_NAME]: ['', Validators.required]
		});

		(this.controlContainer?.control?.parent as FormGroup)?.setControl(this.controlContainer.name as string, this.form);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			if (isScriptActive(state)) {
				this.form.disable();
			} else {
				this.form.enable();
			}
		});
	}

	trackByAlgorithmKey(_: number, algorithm: { key: any; value: any }): any {
		return algorithm.key;
	}
}
