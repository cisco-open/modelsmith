import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningPruningChartsComponent } from './running-pruning-charts.component';

describe('RunningPruningChartsComponent', () => {
	let component: RunningPruningChartsComponent;
	let fixture: ComponentFixture<RunningPruningChartsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RunningPruningChartsComponent]
		});
		fixture = TestBed.createComponent(RunningPruningChartsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
