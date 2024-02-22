import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLineChartComponent } from './ms-line-chart.component';

describe('MsLineChartComponent', () => {
	let component: MsLineChartComponent;
	let fixture: ComponentFixture<MsLineChartComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsLineChartComponent]
		});
		fixture = TestBed.createComponent(MsLineChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
