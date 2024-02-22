import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	Renderer2,
	ViewChild
} from '@angular/core';
import '@dotlottie/player-component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Required } from '../../../core/decorators/required.decorator';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { ANIMATION_CONFIGS } from '../../models/constants/animation-config.constants';
import { AnimationType } from '../../models/enums/animation-type.enum';
import { AnimationConfig } from '../../models/interfaces/animation-config.interface';

@UntilDestroy()
@Component({
	selector: 'ms-running-animation',
	templateUrl: './running-animation.component.html',
	styleUrls: ['./running-animation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunningAnimationComponent implements AfterViewInit {
	@Input() @Required animationType!: AnimationType;
	@ViewChild('lottiePlayer', { static: true }) lottiePlayer: any;

	constructor(
		private scriptFacadeService: ScriptFacadeService,
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit(): void {
		const config = ANIMATION_CONFIGS[this.animationType];
		if (!config) {
			throw new Error(`Unknown animation type: ${this.animationType}`);
		}

		this.initializeAnimation(config);
	}

	private initializeAnimation(config: AnimationConfig): void {
		setTimeout(() => {
			this.lottiePlayer.nativeElement.load(config.path, {
				progresiveLoad: true
			});
		}, 0);

		this.renderer.addClass(this.el.nativeElement, config.className);
	}

	listenToScriptStateChanges(): void {
		const config = ANIMATION_CONFIGS[this.animationType];
		this.lottiePlayer.nativeElement.setSpeed(config.speed);

		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			if (isScriptActive(state)) {
				this.playAnimation();
			} else {
				this.stopAnimation();
			}
		});
	}

	playAnimation(): void {
		this.lottiePlayer.nativeElement.play();
	}

	stopAnimation(): void {
		this.lottiePlayer.nativeElement.stop();
	}
}
