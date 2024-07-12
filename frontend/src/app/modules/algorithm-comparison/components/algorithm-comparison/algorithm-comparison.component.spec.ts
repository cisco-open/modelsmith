import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmComparisonComponent } from './algorithm-comparison.component';

describe('AlgorithmComparisonComponent', () => {
	let component: AlgorithmComparisonComponent;
	let fixture: ComponentFixture<AlgorithmComparisonComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
    declarations: [AlgorithmComparisonComponent]
});
		fixture = TestBed.createComponent(AlgorithmComparisonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
