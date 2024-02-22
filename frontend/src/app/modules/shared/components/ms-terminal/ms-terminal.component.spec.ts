import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsTerminalComponent } from './ms-terminal.component';

describe('MsTerminalComponent', () => {
	let component: MsTerminalComponent;
	let fixture: ComponentFixture<MsTerminalComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsTerminalComponent]
		});
		fixture = TestBed.createComponent(MsTerminalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
