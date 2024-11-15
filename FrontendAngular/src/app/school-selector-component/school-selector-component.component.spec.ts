import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSelectorComponentComponent } from './school-selector-component.component';

describe('SchoolSelectorComponentComponent', () => {
  let component: SchoolSelectorComponentComponent;
  let fixture: ComponentFixture<SchoolSelectorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolSelectorComponentComponent]
    });
    fixture = TestBed.createComponent(SchoolSelectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
