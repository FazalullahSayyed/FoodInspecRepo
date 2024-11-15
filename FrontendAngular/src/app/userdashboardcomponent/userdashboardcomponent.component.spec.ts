import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashboardcomponentComponent } from './userdashboardcomponent.component';

describe('UserdashboardcomponentComponent', () => {
  let component: UserdashboardcomponentComponent;
  let fixture: ComponentFixture<UserdashboardcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserdashboardcomponentComponent]
    });
    fixture = TestBed.createComponent(UserdashboardcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
