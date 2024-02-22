import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecommendIterativeOneShotComponent } from './step-recommend-iterative-one-shot.component';

describe('StepRecommendIterativeOneShotComponent', () => {
	let component: StepRecommendIterativeOneShotComponent;
	let fixture: ComponentFixture<StepRecommendIterativeOneShotComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepRecommendIterativeOneShotComponent]
		});
		fixture = TestBed.createComponent(StepRecommendIterativeOneShotComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
