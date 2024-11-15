import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnannouncedCertificationComponent } from './unannounced-certification.component';

describe('UnannouncedCertificationComponent', () => {
  let component: UnannouncedCertificationComponent;
  let fixture: ComponentFixture<UnannouncedCertificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnannouncedCertificationComponent]
    });
    fixture = TestBed.createComponent(UnannouncedCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
