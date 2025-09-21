import { TestBed } from '@angular/core/testing';
import { LoginService } from './login-service';
import { AuthContainer, SecurityDetails } from '@bernardo-mg/authentication';
import { UserLogin } from './models/user-login';
import { of } from 'rxjs';
import { AngularCrudClientProvider } from '@bernardo-mg/request';

describe('LoginService', () => {
  let service: LoginService;
  let authContainerSpy: jasmine.SpyObj<AuthContainer>;

  beforeEach(() => {
    authContainerSpy = jasmine.createSpyObj('AuthContainer', ['setDetails']);

    const mockClient = {
      create: jasmine.createSpy('create').and.returnValue(
        of({ content: { token: 'token', username: 'username', logged: true } })
      )
    };

    const angularCrudClientProviderMock = {
      url: jasmine.createSpy('url').and.returnValue(mockClient)
    };

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: AuthContainer, useValue: authContainerSpy },
        { provide: AngularCrudClientProvider, useValue: angularCrudClientProviderMock }
      ]
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store details', (done) => {
    const loginRequest = new UserLogin('test', '1234');
    const rememberMe = true;

    const expectedSecurityDetails: SecurityDetails = {
      token: 'token',
      username: 'username',
      logged: true
    } as any;

    authContainerSpy.setDetails.and.returnValue(expectedSecurityDetails);

    service.login(loginRequest, rememberMe).subscribe(result => {
      expect(authContainerSpy.setDetails).toHaveBeenCalledWith(
        expectedSecurityDetails,
        rememberMe
      );
      expect(result).toEqual(expectedSecurityDetails);
      done();
    });
  });
});
