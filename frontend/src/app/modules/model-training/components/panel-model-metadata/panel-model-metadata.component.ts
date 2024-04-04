import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skip, tap } from 'rxjs';
import { ModelMetadataDto } from '../../../../services/client/models/models/model-metadata.interface-dto';
import { ModelsActions } from '../../../../state/core/models/models.actions';
import { ModelsFacadeService } from '../../../core/services/models-facade.service';
import { AlgorithmType } from '../../../model-compression/models/enums/algorithms.enum';

@UntilDestroy()
@Component({
	selector: 'ms-panel-model-metadata',
	templateUrl: './panel-model-metadata.component.html',
	styleUrls: ['./panel-model-metadata.component.scss']
})
export class PanelModelMetadataComponent implements OnInit {
	constructor(private modelsFacadeService: ModelsFacadeService) {}

	ngOnInit(): void {
		this.modelsFacadeService.modelMetadata$
			.pipe(untilDestroyed(this), skip(1), tap(console.log))
			.subscribe((data: ModelMetadataDto) => {
				console.log(data);
			});

		this.modelsFacadeService.dispatch(
			ModelsActions.getModelMetadata({ algorithmType: AlgorithmType.PRUNING, modelName: 'ResNet34' })
		);
	}
}
