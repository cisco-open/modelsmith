import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHeaderComponent } from './ms-header.component';

describe('MsHeaderComponent', () => {
	let component: MsHeaderComponent;
	let fixture: ComponentFixture<MsHeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsHeaderComponent]
		});
		fixture = TestBed.createComponent(MsHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
