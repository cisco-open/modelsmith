import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepHigherAccuracyComponent } from './step-higher-accuracy.component';

describe('StepHigherAccuracyComponent', () => {
	let component: StepHigherAccuracyComponent;
	let fixture: ComponentFixture<StepHigherAccuracyComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepHigherAccuracyComponent]
		});
		fixture = TestBed.createComponent(StepHigherAccuracyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
