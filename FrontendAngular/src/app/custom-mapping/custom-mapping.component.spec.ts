import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMappingComponent } from './custom-mapping.component';

describe('CustomMappingComponent', () => {
  let component: CustomMappingComponent;
  let fixture: ComponentFixture<CustomMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomMappingComponent]
    });
    fixture = TestBed.createComponent(CustomMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
