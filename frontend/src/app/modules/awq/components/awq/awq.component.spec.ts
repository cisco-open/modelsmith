import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwqComponent } from './awq.component';

describe('AwqComponent', () => {
  let component: AwqComponent;
  let fixture: ComponentFixture<AwqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwqComponent]
    });
    fixture = TestBed.createComponent(AwqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
