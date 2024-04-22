import { TestBed } from '@angular/core/testing';

import { DataUsabilityService } from './data-usability.service';

describe('DataUsabilityService', () => {
  let service: DataUsabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataUsabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
