import { TestBed } from '@angular/core/testing';

import { SecurityChangePasswordService } from './security-change-password.service';

describe('SecurityChangePasswordService', () => {
  let service: SecurityChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
