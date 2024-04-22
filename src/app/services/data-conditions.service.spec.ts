import { TestBed } from '@angular/core/testing';

import { DataConditionsService } from './data-conditions.service';

describe('DataConditionsService', () => {
  let service: DataConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
