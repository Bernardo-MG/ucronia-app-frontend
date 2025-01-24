import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { EMPTY } from 'rxjs';
import { AccountService } from './account.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccountService', () => {
  let service: AccountService;
  let authContainer: AuthContainer;

  beforeEach(() => {
    authContainer = jasmine.createSpyObj('authContainer', ['getStatus']);
    (authContainer as any).getStatus.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      providers: [
        AccountService,
        { provide: AuthContainer, useValue: authContainer },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
