import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningStatisticsComponent } from './running-statistics.component';

describe('RunningStatisticsComponent', () => {
  let component: RunningStatisticsComponent;
  let fixture: ComponentFixture<RunningStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningStatisticsComponent]
    });
    fixture = TestBed.createComponent(RunningStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
