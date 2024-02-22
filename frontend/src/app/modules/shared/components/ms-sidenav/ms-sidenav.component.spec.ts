import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSidenavComponent } from './ms-sidenav.component';

describe('MsSidenavComponent', () => {
	let component: MsSidenavComponent;
	let fixture: ComponentFixture<MsSidenavComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsSidenavComponent]
		});
		fixture = TestBed.createComponent(MsSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
