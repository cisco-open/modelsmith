import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScriptActions } from '../../../state/core/script/script.actions';
import { ScriptFacadeService } from '../../core/services/script-facade.service';
import { findAlgorithmKeyBasedOnValue } from '../../model-compression/models/constants/algorithm.constants';
import { isScriptActive } from '../../model-compression/models/enums/script-status.enum';

@UntilDestroy()
@Injectable()
export class WizardUtilsService {
	isScriptActive: boolean = false;

	constructor(private scriptFacadeService: ScriptFacadeService) {
		this.listenToScriptStateChanges();
	}

	listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	ctaCallScript(option: string | null) {
		if (!option) {
			return;
		}

		const alg = findAlgorithmKeyBasedOnValue(option);
		if (!alg) {
			return;
		}

		this.scriptFacadeService.dispatch(
			ScriptActions.callScript({
				configs: {
					alg
				}
			})
		);
	}
}
