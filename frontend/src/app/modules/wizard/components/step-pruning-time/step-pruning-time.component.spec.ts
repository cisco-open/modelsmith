import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPruningTimeComponent } from './step-pruning-time.component';

describe('StepPruningTimeComponent', () => {
	let component: StepPruningTimeComponent;
	let fixture: ComponentFixture<StepPruningTimeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepPruningTimeComponent]
		});
		fixture = TestBed.createComponent(StepPruningTimeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
