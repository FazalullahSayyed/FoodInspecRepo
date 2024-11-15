import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorSelectorComponentComponent } from './inspector-selector-component.component';

describe('InspectorSelectorComponentComponent', () => {
  let component: InspectorSelectorComponentComponent;
  let fixture: ComponentFixture<InspectorSelectorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectorSelectorComponentComponent]
    });
    fixture = TestBed.createComponent(InspectorSelectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
