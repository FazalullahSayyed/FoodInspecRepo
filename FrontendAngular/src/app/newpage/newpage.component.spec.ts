import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpageComponent } from './newpage.component';

describe('NewpageComponent', () => {
  let component: NewpageComponent;
  let fixture: ComponentFixture<NewpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewpageComponent]
    });
    fixture = TestBed.createComponent(NewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
