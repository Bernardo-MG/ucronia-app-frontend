import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { UnauthorizedErrorInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedErrorInterceptor,
      AuthService
    ]
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedErrorInterceptor = TestBed.inject(UnauthorizedErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
