import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecommendBasicPtqComponent } from './step-recommend-basic-ptq.component';

describe('StepRecommendBasicPtqComponent', () => {
	let component: StepRecommendBasicPtqComponent;
	let fixture: ComponentFixture<StepRecommendBasicPtqComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepRecommendBasicPtqComponent]
		});
		fixture = TestBed.createComponent(StepRecommendBasicPtqComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
