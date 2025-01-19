import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtAuthenticationInterceptor } from './jwt-authentication.interceptor';
import { AuthContainer } from '../services/auth.service';
import { environment } from 'environments/environment';

describe('JwtAuthenticationInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authContainer: jasmine.SpyObj<AuthContainer>;

  beforeEach(() => {
    const authContainerSpy = jasmine.createSpyObj('AuthContainer', ['isLogged', 'getToken']);

    TestBed.configureTestingModule({
    imports: [],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
        { provide: AuthContainer, useValue: authContainerSpy },
        provideHttpClient(withInterceptorsFromDi()),
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

    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add Authorization header for API requests when not logged in', () => {
    authContainer.isLogged.and.returnValue(false);
    authContainer.getToken.and.returnValue(undefined);

    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/test`);
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
