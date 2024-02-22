import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAlgorithmComponent } from './panel-algorithm.component';

describe('PanelAlgorithmComponent', () => {
	let component: PanelAlgorithmComponent;
	let fixture: ComponentFixture<PanelAlgorithmComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PanelAlgorithmComponent]
		});
		fixture = TestBed.createComponent(PanelAlgorithmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
