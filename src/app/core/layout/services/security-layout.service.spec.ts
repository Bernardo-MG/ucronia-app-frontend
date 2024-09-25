import { TestBed } from '@angular/core/testing';

import { SecurityLayoutService } from './security-layout.service';

describe('SecurityLayoutService', () => {
  let service: SecurityLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
