import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPanelParametersComponent } from '../panel-parameters/panel-parameters.component';

describe('MsPanelParametersComponent', () => {
	let component: MsPanelParametersComponent;
	let fixture: ComponentFixture<MsPanelParametersComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsPanelParametersComponent]
		});
		fixture = TestBed.createComponent(MsPanelParametersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
