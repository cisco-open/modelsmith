import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelModelComponent } from './panel-model.component';

describe('PanelModelComponent', () => {
	let component: PanelModelComponent;
	let fixture: ComponentFixture<PanelModelComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PanelModelComponent]
		});
		fixture = TestBed.createComponent(PanelModelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
