import { HttpInterceptorFn, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthContainer } from '../services/auth.service';
import { unauthorizedInterceptor } from './unauthorized.interceptor';

describe('unauthorizedInterceptor', () => {
  const apiUrl = "apiUrl";
  const builtInterceptor = unauthorizedInterceptor(apiUrl);

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => builtInterceptor(req, next));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
      AuthContainer,
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting()
    ]
  }));

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
