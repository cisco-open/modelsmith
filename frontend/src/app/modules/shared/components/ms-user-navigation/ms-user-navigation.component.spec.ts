import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsUserNavigationComponent } from './ms-user-navigation.component';

describe('MsUserNavigationComponent', () => {
	let component: MsUserNavigationComponent;
	let fixture: ComponentFixture<MsUserNavigationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsUserNavigationComponent]
		});
		fixture = TestBed.createComponent(MsUserNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
