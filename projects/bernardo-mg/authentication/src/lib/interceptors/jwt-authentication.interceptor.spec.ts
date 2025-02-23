import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthContainer } from '../services/auth.service';
import { jwtAuthenticationInterceptor } from './jwt-authentication.interceptor';

describe('jwtAuthenticationInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authContainer: jasmine.SpyObj<AuthContainer>;
  const apiUrl = "apiUrl";
  let builtInterceptor = jwtAuthenticationInterceptor(apiUrl);

  beforeEach(() => {
    const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => builtInterceptor(req, next));
    const authContainerSpy = jasmine.createSpyObj('AuthContainer', ['isLogged', 'getToken']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: AuthContainer, useValue: authContainerSpy },
        provideHttpClient(withInterceptors([interceptor])),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authContainer = TestBed.inject(AuthContainer) as jasmine.SpyObj<AuthContainer>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header for API requests when logged in', () => {
    authContainer.isLogged.and.returnValue(true);
    authContainer.getToken.and.returnValue('test-token');

    httpClient.get(`${apiUrl}/test`).subscribe();

    const httpRequest = httpMock.expectOne(`${apiUrl}/test`);
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add Authorization header for API requests when not logged in', () => {
    authContainer.isLogged.and.returnValue(false);
    authContainer.getToken.and.returnValue(undefined);

    httpClient.get(`${apiUrl}/test`).subscribe();

    const httpRequest = httpMock.expectOne(`${apiUrl}/test`);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should not add Authorization header for non-API requests', () => {
    authContainer.isLogged.and.returnValue(true);
    authContainer.getToken.and.returnValue('test-token');

    httpClient.get('https://external-api.com/test').subscribe();

    const httpRequest = httpMock.expectOne('https://external-api.com/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });

});
