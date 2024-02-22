import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecommendGraspComponent } from './step-recommend-grasp.component';

describe('StepRecommendGraspComponent', () => {
	let component: StepRecommendGraspComponent;
	let fixture: ComponentFixture<StepRecommendGraspComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepRecommendGraspComponent]
		});
		fixture = TestBed.createComponent(StepRecommendGraspComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
