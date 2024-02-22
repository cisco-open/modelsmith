import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecommendBrecqComponent } from './step-recommend-brecq.component';

describe('StepRecommendBrecqComponent', () => {
	let component: StepRecommendBrecqComponent;
	let fixture: ComponentFixture<StepRecommendBrecqComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepRecommendBrecqComponent]
		});
		fixture = TestBed.createComponent(StepRecommendBrecqComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
