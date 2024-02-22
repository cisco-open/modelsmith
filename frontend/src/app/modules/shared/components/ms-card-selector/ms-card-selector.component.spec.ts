import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsCardSelectorComponent } from './ms-card-selector.component';

describe('MsCardSelectorComponent', () => {
	let component: MsCardSelectorComponent;
	let fixture: ComponentFixture<MsCardSelectorComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsCardSelectorComponent]
		});
		fixture = TestBed.createComponent(MsCardSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
