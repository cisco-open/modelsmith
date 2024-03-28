import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KeyValueObject } from '../../../../services/client/models/key-value/key-value.interface-dto';
import { ScriptFacadeService } from '../../../core/services';
import { AlgorithmType, AlgorithmTypeKeyValue } from '../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-algorithm-type',
	templateUrl: './panel-algorithm-type.component.html',
	styleUrls: ['./panel-algorithm-type.component.scss'],
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class PanelAlgorithmTypeComponent implements OnInit {
	@Input({ required: true }) controlKey = '';

	readonly algorithmTypesOptions = AlgorithmTypeKeyValue.filter((option) => option.key !== AlgorithmType.TRAIN);
	readonly ALGORITHM_TYPE_CONTROL_NAME = 'algorithmType';

	get parentFormGroup() {
		return this.controlContainer.control as FormGroup;
	}

	get algorithmTypeFormGroup(): FormGroup {
		return this.parentFormGroup.get(this.controlKey) as FormGroup;
	}

	get algorithmTypeFormControl(): FormControl {
		return this.algorithmTypeFormGroup.get(this.ALGORITHM_TYPE_CONTROL_NAME) as FormControl;
	}

	constructor(
		private controlContainer: ControlContainer,
		private scriptFacadeService: ScriptFacadeService
	) {}

	ngOnInit() {
		this.initForm();

		this.listenToScriptStateChanges();
	}

	private initForm() {
		this.parentFormGroup.addControl(
			this.controlKey,
			new FormGroup({
				[this.ALGORITHM_TYPE_CONTROL_NAME]: new FormControl(AlgorithmType.PRUNING, Validators.required)
			})
		);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			isScriptActive(state) ? this.algorithmTypeFormGroup.disable() : this.algorithmTypeFormGroup.enable();
		});
	}

	trackByAlgorithmType(_: number, algorithmType: KeyValueObject<string>): any {
		return algorithmType.key;
	}
}
