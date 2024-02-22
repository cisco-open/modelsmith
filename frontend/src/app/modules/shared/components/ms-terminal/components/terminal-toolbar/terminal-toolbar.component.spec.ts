import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalToolbarComponent } from './terminal-toolbar.component';

describe('TerminalToolbarComponent', () => {
	let component: TerminalToolbarComponent;
	let fixture: ComponentFixture<TerminalToolbarComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TerminalToolbarComponent]
		});
		fixture = TestBed.createComponent(TerminalToolbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
