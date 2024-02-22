import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPretrainedModelComponent } from './step-pretrained-model.component';

describe('StepPretrainedModelComponent', () => {
	let component: StepPretrainedModelComponent;
	let fixture: ComponentFixture<StepPretrainedModelComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StepPretrainedModelComponent]
		});
		fixture = TestBed.createComponent(StepPretrainedModelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
