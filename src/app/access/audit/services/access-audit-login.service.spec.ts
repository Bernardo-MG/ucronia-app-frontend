import { TestBed } from '@angular/core/testing';

import { AccessAuditLoginService } from './access-audit-login.service';

describe('AccessAuditLoginService', () => {
  let service: AccessAuditLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessAuditLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
