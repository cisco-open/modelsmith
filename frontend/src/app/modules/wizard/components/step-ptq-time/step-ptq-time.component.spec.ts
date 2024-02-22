import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPtqTimeComponent } from './step-ptq-time.component';

describe('StepPtqTimeComponent', () => {
	let component: StepPtqTimeComponent;
	let fixture: ComponentFixture<StepPtqTimeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepPtqTimeComponent]
		});
		fixture = TestBed.createComponent(StepPtqTimeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
