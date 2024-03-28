import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAlgorithmTypeComponent } from './panel-algorithm-type.component';

describe('PanelAlgorithmTypeComponent', () => {
  let component: PanelAlgorithmTypeComponent;
  let fixture: ComponentFixture<PanelAlgorithmTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelAlgorithmTypeComponent]
    });
    fixture = TestBed.createComponent(PanelAlgorithmTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
