import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthContainer } from '../services/auth-container';
import { unauthorizedInterceptor } from './unauthorized.interceptor';

describe('unauthorizedInterceptor', () => {
  const apiUrl = 'https://api.example.com';
  const externalUrl = 'https://external-api.com/data';
  const apiRequest = new HttpRequest('GET', apiUrl);
  const externalRequest = new HttpRequest('GET', externalUrl);
  let interceptor: HttpInterceptorFn;
  let mockAuthContainer: jasmine.SpyObj<AuthContainer>;

  beforeEach(() => {
    mockAuthContainer = jasmine.createSpyObj<AuthContainer>('AuthContainer', ['logout']);

    const builtInterceptor = unauthorizedInterceptor(apiUrl);
    interceptor = (req, next) => TestBed.runInInjectionContext(() => builtInterceptor(req, next));

    TestBed.configureTestingModule({
      providers: [{ provide: AuthContainer, useValue: mockAuthContainer }],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should pass through requests that are not from API', (done) => {
    const next: HttpHandlerFn = (req) => of(new HttpResponse({ status: 200, body: { message: 'Success' } }));

    interceptor(externalRequest, next).subscribe((response) => {
      if (response instanceof HttpResponse) {
        expect(response.status).toBe(200);
        done();
      }
    });
  });

  it('should throw error on 401 error', (done) => {
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({ status: 401, url: apiUrl }));

    interceptor(apiRequest, next).subscribe({
      error: (err) => {
        expect(err instanceof HttpErrorResponse && err.status).toBe(401);
        done();
      },
    });
  });

  it('should pass through other errors for API requests', (done) => {
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({ status: 500 }));

    interceptor(apiRequest, next).subscribe({
      error: (err) => {
        expect(mockAuthContainer.logout).not.toHaveBeenCalled();
        expect(err instanceof HttpErrorResponse && err.status).toBe(500);
        done();
      },
    });
  });

  it('should pass through errors for external API requests', (done) => {
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({ status: 403 }));

    interceptor(externalRequest, next).subscribe({
      error: (err) => {
        expect(mockAuthContainer.logout).not.toHaveBeenCalled();
        expect(err instanceof HttpErrorResponse && err.status).toBe(403);
        done();
      },
    });
  });
});
