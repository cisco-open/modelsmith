import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningQuantizationChartsComponent } from './running-quantization-charts.component';

describe('RunningQuantizationChartsComponent', () => {
	let component: RunningQuantizationChartsComponent;
	let fixture: ComponentFixture<RunningQuantizationChartsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RunningQuantizationChartsComponent]
		});
		fixture = TestBed.createComponent(RunningQuantizationChartsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
