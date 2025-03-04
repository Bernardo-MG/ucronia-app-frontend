import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoginStatus } from '../models/login-status';
import { PermissionList } from '../models/permission-list';
import { SecurityDetails } from '../models/security-details';
import { AuthContainer } from './auth-container';

describe('AuthContainer', () => {
  let service: AuthContainer;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthContainer,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthContainer);
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default security details', () => {
    const defaultDetails = new SecurityDetails(false);
    service.securityDetails.subscribe(details => {
      expect(details).toEqual(defaultDetails);
    });
  });

  it('should log out and clear local storage', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('securityDetails');
    service.securityDetails.subscribe(details => {
      expect(details.logged).toBeFalse();
    });
  });

  it('should store security details and token when set to store', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: token
    };

    const storedDetails = service.setDetails(loginStatus, true);
    expect(storedDetails.logged).toBeTrue();
    expect(storedDetails.token).toBe(token);
    expect(storedDetails.username).toBe('testUser');
    expect(storedDetails.permissions).toBeInstanceOf(PermissionList);
    expect(storedDetails.permissions['resource']).toEqual(['action']);
    expect(localStorage.getItem('securityDetails')).toBe(JSON.stringify(storedDetails));
  });

  it('should remove security details and token when set to not store', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: token
    };
    spyOn(localStorage, 'removeItem');

    service.setDetails(loginStatus, false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('securityDetails');
  });

  it('should return correct login status when logged in', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: token
    };

    service.setDetails(loginStatus, false);
    expect(service.logged).toBeTrue();
  });

  it('should validate the user has an existing resource and action', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: token
    };

    service.setDetails(loginStatus, false);
    expect(service.hasPermission('resource', 'action')).toBeTrue();
  });

  it('should validate the user does not have an existing resource with a not existing action', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: token
    };

    service.setDetails(loginStatus, false);
    expect(service.hasPermission('resource', 'invalidAction')).toBeFalse();
  });

  it('should validate the user does not have an existing resource and action', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: token
    };

    service.setDetails(loginStatus, false);
    expect(service.hasPermission('invalidResource', 'action')).toBeFalse();
  });

  it('should load details from local storage', () => {
    const storedUser = new SecurityDetails(true);
    storedUser.token = token
    localStorage.setItem('securityDetails', JSON.stringify(storedUser));

    service['loadDetailsFromLocal']();
    service.securityDetails.subscribe(details => {
      expect(details.logged).toBeTrue();
      expect(details.token).toBe(token);
    });
  });

  it('should clear security details if the token is expired', () => {
    const expiredToken = token;
    spyOn(service['jwtHelper'], 'isTokenExpired').and.returnValue(Promise.resolve(true));
    spyOn(service.securityDetails, 'subscribe').and.callThrough();

    const loginStatus: LoginStatus = { logged: true, token: expiredToken };
    service.setDetails(loginStatus, true);

    (service as any).checkTokenExpiration();

    service.securityDetails.subscribe(details => {
      expect(details.logged).toBeFalse();
      expect(details.token).toBe('');
    });
  });

});
