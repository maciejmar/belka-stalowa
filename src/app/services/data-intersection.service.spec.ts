import { TestBed } from '@angular/core/testing';

import { DataIntersectionService } from './data-intersection.service';

describe('DataIntersectionService', () => {
  let service: DataIntersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataIntersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
