import { TestBed } from '@angular/core/testing';

import { UcroniaClient } from './ucronia-client';

describe('UcroniaClient', () => {
  let service: UcroniaClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UcroniaClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
