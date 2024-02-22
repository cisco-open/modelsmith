import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsBackgroundGradientComponent } from './ms-background-gradient.component';

describe('MsBackgroundGradientComponent', () => {
	let component: MsBackgroundGradientComponent;
	let fixture: ComponentFixture<MsBackgroundGradientComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsBackgroundGradientComponent]
		});
		fixture = TestBed.createComponent(MsBackgroundGradientComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
