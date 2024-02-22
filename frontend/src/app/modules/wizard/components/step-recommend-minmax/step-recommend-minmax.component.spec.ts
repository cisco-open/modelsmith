import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecommendMinmaxComponent } from './step-recommend-minmax.component';

describe('StepRecommendMinmaxComponent', () => {
	let component: StepRecommendMinmaxComponent;
	let fixture: ComponentFixture<StepRecommendMinmaxComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepRecommendMinmaxComponent]
		});
		fixture = TestBed.createComponent(StepRecommendMinmaxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
