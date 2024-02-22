import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningAnimationComponent } from './running-animation.component';

describe('RunningAnimationComponent', () => {
  let component: RunningAnimationComponent;
  let fixture: ComponentFixture<RunningAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningAnimationComponent]
    });
    fixture = TestBed.createComponent(RunningAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
