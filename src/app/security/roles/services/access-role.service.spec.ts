import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccessRoleService } from './access-role.service';

describe('AccessRoleService', () => {
  let service: AccessRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AccessRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
