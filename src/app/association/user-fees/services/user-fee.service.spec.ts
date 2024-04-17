import { TestBed } from '@angular/core/testing';

import { UserFeeService } from './user-fee.service';

describe('UserFeeService', () => {
  let service: UserFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
