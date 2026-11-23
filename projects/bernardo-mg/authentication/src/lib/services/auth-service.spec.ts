import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PermissionList } from '../models/permission-list';
import { SecurityDetails } from '../models/security-details';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTUxNjIzOTAyMiwicGVybWlzc2lvbnMiOnsicmVzb3VyY2UiOlsiYWN0aW9uIl19fQ.4mVqVsV7_v-TMGCKnObvoD55pLWwRSqv600RAZxqtVs';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(AuthService);
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default security details', () => {
    const defaultDetails = new SecurityDetails(false);
    service.securityDetails
      .subscribe(details => expect(details).toEqual(defaultDetails));
  });

  it('should log out and clear local storage', () => {
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem');
    service.logout();
    expect(removeItem).toHaveBeenCalledWith('securityDetails');
    service.securityDetails
      .subscribe(details => expect(details.logged).toBe(false));
  });

  it('should store security details and token when set to store', () => {
    const storedDetails = service.setDetails(true, token, true);
    expect(storedDetails.logged).toBe(true);
    expect(storedDetails.token).toBe(token);
    expect(storedDetails.username).toBe('testUser');
    expect(storedDetails.permissions).toBeInstanceOf(PermissionList);
    expect(storedDetails.permissions['resource']).toEqual(['action']);
    expect(localStorage.getItem('securityDetails')).toBe(JSON.stringify(storedDetails));
  });

  it('should remove security details and token when set to not store', () => {
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem');

    service.setDetails(true, token, false);
    expect(removeItem).toHaveBeenCalledWith('securityDetails');
  });

  it('should return correct login status when logged in', () => {
    service.setDetails(true, token, false);
    expect(service.logged).toBe(true);
  });

  it('should validate the user has an existing resource and action', () => {
    service.setDetails(true, token, false);
    expect(service.hasPermission({ resource: 'resource', action: 'action' })).toBe(true);
  });

  it('should validate the user does not have an existing resource with a not existing action', () => {
    service.setDetails(true, token, false);
    expect(service.hasPermission({ resource: 'resource', action: 'invalidAction' })).toBe(false);
  });

  it('should validate the user does not have an existing resource and action', () => {
    service.setDetails(true, token, false);
    expect(service.hasPermission({ resource: 'invalidResource', action: 'action' })).toBe(false);
  });

  it('should load details from local storage', () => {
    const storedUser = new SecurityDetails(true);
    storedUser.token = token
    ; localStorage.setItem('securityDetails', JSON.stringify(storedUser));

    service['loadDetails']();
    service.securityDetails.subscribe(details => {
      expect(details.logged).toBe(true);
      expect(details.token).toBe(token);
    });
  });

  it('should clear security details if the token is expired', () => {
    vi.spyOn(service['jwtHelper'], 'isTokenExpired').mockResolvedValue(true);
    vi.spyOn(service.securityDetails, 'subscribe');

    service.setDetails(true, token, true);

    (service as any).checkTokenExpiration();

    service.securityDetails.subscribe(details => {
      expect(details.logged).toBe(false);
      expect(details.token).toBe('');
    });
  });

});
