import { TestBed } from '@angular/core/testing';
import { AuthContainer } from '../services/auth.service';
import { UnauthorizedErrorInterceptor } from './unauthorized.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UnauthorizedErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
        UnauthorizedErrorInterceptor,
        AuthContainer,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}));

  it('should be created', () => {
    const interceptor: UnauthorizedErrorInterceptor = TestBed.inject(UnauthorizedErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
