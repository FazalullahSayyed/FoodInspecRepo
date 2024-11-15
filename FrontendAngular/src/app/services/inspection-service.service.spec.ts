import { TestBed } from '@angular/core/testing';

import { InspectionServiceService } from './inspection-service.service';

describe('InspectionServiceService', () => {
  let service: InspectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
