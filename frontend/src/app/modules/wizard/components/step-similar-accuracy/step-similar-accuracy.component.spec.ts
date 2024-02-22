import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSimilarAccuracyComponent } from './step-similar-accuracy.component';

describe('StepSimilarAccuracyComponent', () => {
	let component: StepSimilarAccuracyComponent;
	let fixture: ComponentFixture<StepSimilarAccuracyComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepSimilarAccuracyComponent]
		});
		fixture = TestBed.createComponent(StepSimilarAccuracyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
