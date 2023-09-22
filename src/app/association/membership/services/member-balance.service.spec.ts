import { TestBed } from '@angular/core/testing';

import { MemberBalanceService } from './member-balance.service';

describe('MemberBalanceService', () => {
  let service: MemberBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
