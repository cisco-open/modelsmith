import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningComponent } from './running.component';

describe('RunningComponent', () => {
	let component: RunningComponent;
	let fixture: ComponentFixture<RunningComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RunningComponent]
		});
		fixture = TestBed.createComponent(RunningComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
