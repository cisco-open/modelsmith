import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsTerminalStyleConfiguratorComponent } from './ms-terminal-style-configurator.component';

describe('MsTerminalStyleConfiguratorComponent', () => {
	let component: MsTerminalStyleConfiguratorComponent;
	let fixture: ComponentFixture<MsTerminalStyleConfiguratorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MsTerminalStyleConfiguratorComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(MsTerminalStyleConfiguratorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
