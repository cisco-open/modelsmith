import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { MaterialModule } from '../../modules/material.module';
import { SharedModule } from '../../shared.module';
import { MsBannerComponent } from './ms-banner.component';

const MODULE_IMPORTS = [
	CoreModule,
	BrowserAnimationsModule,
	SharedModule,
	RouterTestingModule,
	HttpClientTestingModule,
	MaterialModule,
	ReactiveFormsModule
];

describe('MsBannerComponent', () => {
	let component: MsBannerComponent;
	let fixture: ComponentFixture<MsBannerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: MODULE_IMPORTS,
			declarations: [MsBannerComponent],
			providers: [
				{
					provide: MAT_SNACK_BAR_DATA,
					useValue: {}
				},
				{
					provide: MatSnackBarRef,
					useValue: {}
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MsBannerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});
});
