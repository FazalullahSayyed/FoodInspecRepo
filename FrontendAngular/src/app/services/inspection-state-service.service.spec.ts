import { TestBed } from '@angular/core/testing';

import { InspectionStateServiceService } from './inspection-state-service.service';

describe('InspectionStateServiceService', () => {
  let service: InspectionStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
