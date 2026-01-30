import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { AccessAuditLoginService } from './access-audit-login-service';

describe('AccessAuditLoginService', () => {
  let service: AccessAuditLoginService;

  const securityClientMock = {
    login: {
      register: {
        page: jasmine.createSpy().and.returnValue(of({
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0
        }))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    });
    service = TestBed.inject(AccessAuditLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
