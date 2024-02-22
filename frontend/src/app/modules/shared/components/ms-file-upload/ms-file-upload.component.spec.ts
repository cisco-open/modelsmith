import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsFileUploadComponent } from './ms-file-upload.component';

describe('MsFileUploadComponent', () => {
	let component: MsFileUploadComponent;
	let fixture: ComponentFixture<MsFileUploadComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MsFileUploadComponent]
		});
		fixture = TestBed.createComponent(MsFileUploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
