import { TestBed } from '@angular/core/testing';

import { AccountLayoutService } from './account-layout.service';

describe('AccountLayoutService', () => {
  let service: AccountLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
