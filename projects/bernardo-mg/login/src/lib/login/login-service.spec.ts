import { TestBed } from '@angular/core/testing';
import { AuthService, PermissionList, SecurityDetails } from '@bernardo-mg/authentication';
import { LoginRequest, SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { LoginService } from './login-service';

describe('LoginService', () => {
  let service: LoginService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockSecurityClient = {
    login: {
      login: jasmine.createSpy()
    }
  };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setDetails']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SecurityClient, useValue: mockSecurityClient }
      ]
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store details', (done) => {
    const loginRequest = new LoginRequest('test', '1234');
    const rememberMe = true;

    const apiResponse = {
      logged: true,
      token: 'token'
    };

    const expectedSecurityDetails: SecurityDetails = {
      token: 'token',
      username: 'username',
      logged: true,
      permissions: new PermissionList()
    };

    mockSecurityClient.login.login.and.returnValue(of(apiResponse));
    authServiceSpy.setDetails.and.returnValue(expectedSecurityDetails);

    service.login(loginRequest, rememberMe).subscribe(result => {
      expect(authServiceSpy.setDetails).toHaveBeenCalledWith(
        true,
        'token',
        rememberMe
      );

      expect(result).toEqual(expectedSecurityDetails);
      done();
    });
  });

});
