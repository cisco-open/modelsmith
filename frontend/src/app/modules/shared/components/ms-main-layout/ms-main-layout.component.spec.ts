import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMainLayoutComponent } from './ms-main-layout.component';

describe('MsMainLayoutComponent', () => {
	let component: MsMainLayoutComponent;
	let fixture: ComponentFixture<MsMainLayoutComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsMainLayoutComponent]
		});
		fixture = TestBed.createComponent(MsMainLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
