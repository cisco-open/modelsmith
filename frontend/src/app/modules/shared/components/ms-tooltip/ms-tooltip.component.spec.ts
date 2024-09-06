import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsTooltipComponent } from './ms-tooltip.component';

describe('MsTooltipComponent', () => {
  let component: MsTooltipComponent;
  let fixture: ComponentFixture<MsTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
