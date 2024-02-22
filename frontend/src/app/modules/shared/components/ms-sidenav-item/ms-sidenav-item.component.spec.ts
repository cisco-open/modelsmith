import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSidenavItemComponent } from './ms-sidenav-item.component';

describe('MsSidenavItemComponent', () => {
	let component: MsSidenavItemComponent;
	let fixture: ComponentFixture<MsSidenavItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsSidenavItemComponent]
		});
		fixture = TestBed.createComponent(MsSidenavItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
