import { TestBed } from '@angular/core/testing';

import { CalculatedResultsService } from './calculated-results.service';

describe('CalculatedResultsService', () => {
  let service: CalculatedResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatedResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
