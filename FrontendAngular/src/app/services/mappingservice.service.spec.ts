import { TestBed } from '@angular/core/testing';

import { MappingserviceService } from './mappingservice.service';

describe('MappingserviceService', () => {
  let service: MappingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
