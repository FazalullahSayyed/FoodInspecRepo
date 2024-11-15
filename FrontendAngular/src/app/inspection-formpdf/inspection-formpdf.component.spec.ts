import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionFormpdfComponent } from './inspection-formpdf.component';

describe('InspectionFormpdfComponent', () => {
  let component: InspectionFormpdfComponent;
  let fixture: ComponentFixture<InspectionFormpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionFormpdfComponent]
    });
    fixture = TestBed.createComponent(InspectionFormpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
