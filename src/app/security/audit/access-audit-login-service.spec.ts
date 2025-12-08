import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccessAuditLoginService } from './access-audit-login-service';

describe('AccessAuditLoginService', () => {
  let service: AccessAuditLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        AccessAuditLoginService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(AccessAuditLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
