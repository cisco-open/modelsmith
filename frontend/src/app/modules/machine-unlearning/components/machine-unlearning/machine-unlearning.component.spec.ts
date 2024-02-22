import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUnlearningComponent } from './machine-unlearning.component';

describe('MachineUnlearningComponent', () => {
	let component: MachineUnlearningComponent;
	let fixture: ComponentFixture<MachineUnlearningComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MachineUnlearningComponent]
		});
		fixture = TestBed.createComponent(MachineUnlearningComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
