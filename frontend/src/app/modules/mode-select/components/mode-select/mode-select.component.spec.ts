import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSelectComponent } from './mode-select.component';

describe('ModeSelectComponent', () => {
	let component: ModeSelectComponent;
	let fixture: ComponentFixture<ModeSelectComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ModeSelectComponent]
		});
		fixture = TestBed.createComponent(ModeSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
