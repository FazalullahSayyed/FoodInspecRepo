import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboardcomponentComponent } from './admindashboardcomponent.component';

describe('AdmindashboardcomponentComponent', () => {
  let component: AdmindashboardcomponentComponent;
  let fixture: ComponentFixture<AdmindashboardcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindashboardcomponentComponent]
    });
    fixture = TestBed.createComponent(AdmindashboardcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
