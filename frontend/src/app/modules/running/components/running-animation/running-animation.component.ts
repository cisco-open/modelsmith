//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { Required } from '../../../shared/decorators/required.decorator';
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
export class RunningAnimationComponent implements OnInit {
	@Input() @Required animationType!: AnimationType;
	@ViewChild('dotlottieCanvas', { static: true }) dotlottieCanvas!: ElementRef<HTMLCanvasElement>;
	private dotLottie?: DotLottie;

	constructor(
		private scriptFacadeService: ScriptFacadeService,
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		const config = ANIMATION_CONFIGS[this.animationType];
		if (!config) {
			throw new Error(`Unknown animation type: ${this.animationType}`);
		}

		this.initializeAnimation(config);
	}

	private initializeAnimation(config: AnimationConfig): void {
		this.dotLottie = new DotLottie({
			autoplay: false,
			loop: true,
			canvas: this.dotlottieCanvas.nativeElement,
			src: config.path,
			speed: config.speed || 1
		});

		this.dotLottie.addEventListener('load', () => {
			this.listenToScriptStateChanges();
		});

		this.renderer.addClass(this.el.nativeElement, config.className);
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			if (isScriptActive(state)) {
				this.playAnimation();
			} else {
				this.stopAnimation();
			}
		});
	}

	playAnimation(): void {
		this.dotLottie?.play();
	}

	stopAnimation(): void {
		this.dotLottie?.stop();
	}
}
