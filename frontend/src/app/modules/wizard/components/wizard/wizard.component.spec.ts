import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardComponent } from './wizard.component';

describe('WizardComponent', () => {
	let component: WizardComponent;
	let fixture: ComponentFixture<WizardComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [WizardComponent]
		});
		fixture = TestBed.createComponent(WizardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
