import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SecurityDetails } from '../models/security-details';
import { AuthContainer } from './auth.service';
import { LoginStatus } from '../models/login-status';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuhtContainer', () => {
  let service: AuthContainer;

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
    service.getDetails().subscribe(details => {
      expect(details).toEqual(defaultDetails);
    });
  });

  it('should log out and clear local storage', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('securityDetails');
    service.getDetails().subscribe(details => {
      expect(details.logged).toBeFalse();
    });
  });

  it('should store security details and token when set to store', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs'
    };

    const storedDetails = service.setDetails(loginStatus, true);
    expect(storedDetails.logged).toBeTrue();
    expect(storedDetails.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs');
    expect(storedDetails.username).toBe('testUser');
    expect(storedDetails.permissions).toEqual({ 'resource': ['action'] });
    expect(localStorage.getItem('securityDetails')).toBe(JSON.stringify(storedDetails));
  });

  it('should remove security details and token when set to not store', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs'
    };
    spyOn(localStorage, 'removeItem');

    service.setDetails(loginStatus, false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('securityDetails');
  });

  it('should return correct login status when logged in', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs'
    };

    service.setDetails(loginStatus, false);
    expect(service.isLogged()).toBeTrue();
  });

  it('should validate the user has an existing resource and action', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs'
    };

    service.setDetails(loginStatus, false);
    expect(service.hasPermission('resource', 'action')).toBeTrue();
  });

  it('should validate the user does not have an existing resource with a not existing action', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs'
    };

    service.setDetails(loginStatus, false);
    expect(service.hasPermission('resource', 'invalidAction')).toBeFalse();
  });

  it('should validate the user does not have an existing resource and action', () => {
    const loginStatus: LoginStatus = {
      logged: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs'
    };

    service.setDetails(loginStatus, false);
    expect(service.hasPermission('invalidResource', 'action')).toBeFalse();
  });

  it('should load details from local storage', () => {
    const storedUser = new SecurityDetails(true);
    storedUser.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs';
    localStorage.setItem('securityDetails', JSON.stringify(storedUser));

    service['loadDetailsFromLocal']();
    service.getDetails().subscribe(details => {
      expect(details.logged).toBeTrue();
      expect(details.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs');
    });
  });

});
