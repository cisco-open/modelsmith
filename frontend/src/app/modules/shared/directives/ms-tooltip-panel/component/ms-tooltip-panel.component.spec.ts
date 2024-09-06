import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsTooltipPanelComponent } from './ms-tooltip-panel.component';

describe('MsTooltipPanelComponent', () => {
  let component: MsTooltipPanelComponent;
  let fixture: ComponentFixture<MsTooltipPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsTooltipPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsTooltipPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
