import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth-service';
import { jwtAuthenticationInterceptor } from './jwt-authentication.interceptor';

describe('jwtAuthenticationInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: jasmine.SpyObj<AuthService>;
  const apiUrl = "apiUrl";
  const builtInterceptor = jwtAuthenticationInterceptor(apiUrl);

  beforeEach(() => {
    const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => builtInterceptor(req, next));
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLogged'], { token: 'test-token' });

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideHttpClient(withInterceptors([interceptor])),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header for API requests when logged in', () => {
    Object.defineProperty(authService, 'logged', { get: () => true });
    Object.defineProperty(authService, 'token', { get: () => 'test-token' });

    httpClient.get(`${apiUrl}/test`).subscribe();

    const httpRequest = httpMock.expectOne(`${apiUrl}/test`);
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add Authorization header for API requests when not logged in', () => {
    Object.defineProperty(authService, 'logged', { get: () => false });
    Object.defineProperty(authService, 'token', { get: () => undefined });

    httpClient.get(`${apiUrl}/test`).subscribe();

    const httpRequest = httpMock.expectOne(`${apiUrl}/test`);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should not add Authorization header for non-API requests', () => {
    Object.defineProperty(authService, 'logged', { get: () => true });
    Object.defineProperty(authService, 'token', { get: () => 'test-token' });

    httpClient.get('https://external-api.com/test').subscribe();

    const httpRequest = httpMock.expectOne('https://external-api.com/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });
});
