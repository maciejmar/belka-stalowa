import { TestBed } from '@angular/core/testing';

import { DataSupportService } from './data-support.service';

describe('DataSupportService', () => {
  let service: DataSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
