import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmQuantizationComponent } from './llm-quantization.component';

describe('LlmQuantizationComponent', () => {
  let component: LlmQuantizationComponent;
  let fixture: ComponentFixture<LlmQuantizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [LlmQuantizationComponent]
});
    fixture = TestBed.createComponent(LlmQuantizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
