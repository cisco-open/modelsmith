import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningMachineUnlearningChartsComponent } from './running-machine-unlearning-charts.component';

describe('RunningMachineUnlearningChartsComponent', () => {
  let component: RunningMachineUnlearningChartsComponent;
  let fixture: ComponentFixture<RunningMachineUnlearningChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningMachineUnlearningChartsComponent]
    });
    fixture = TestBed.createComponent(RunningMachineUnlearningChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
