import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDemoComponent } from './notifications-demo.component';

describe('NotificationsDemoComponent', () => {
  let component: NotificationsDemoComponent;
  let fixture: ComponentFixture<NotificationsDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsDemoComponent]
    });
    fixture = TestBed.createComponent(NotificationsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
