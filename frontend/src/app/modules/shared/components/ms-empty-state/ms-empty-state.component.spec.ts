import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsEmptyStateComponent } from './ms-ms-empty-state.component';

describe('MsEmptyStateComponent', () => {
  let component: MsEmptyStateComponent;
  let fixture: ComponentFixture<MsEmptyStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsEmptyStateComponent]
    });
    fixture = TestBed.createComponent(MsEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
