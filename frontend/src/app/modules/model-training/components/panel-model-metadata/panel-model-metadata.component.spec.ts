import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelModelMetadataComponent } from './panel-model-metadata.component';

describe('PanelModelMetadataComponent', () => {
  let component: PanelModelMetadataComponent;
  let fixture: ComponentFixture<PanelModelMetadataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [PanelModelMetadataComponent]
});
    fixture = TestBed.createComponent(PanelModelMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
