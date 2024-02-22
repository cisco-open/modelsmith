import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecommendIterativeComponent } from './step-recommend-iterative.component';

describe('StepRecommendIterativeComponent', () => {
	let component: StepRecommendIterativeComponent;
	let fixture: ComponentFixture<StepRecommendIterativeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepRecommendIterativeComponent]
		});
		fixture = TestBed.createComponent(StepRecommendIterativeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
