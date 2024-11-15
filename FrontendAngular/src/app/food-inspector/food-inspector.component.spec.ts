import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInspectorComponent } from './food-inspector.component';

describe('FoodInspectorComponent', () => {
  let component: FoodInspectorComponent;
  let fixture: ComponentFixture<FoodInspectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodInspectorComponent]
    });
    fixture = TestBed.createComponent(FoodInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
