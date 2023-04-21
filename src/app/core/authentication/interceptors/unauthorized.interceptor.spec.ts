import { TestBed } from '@angular/core/testing';
import { AuthenticationContainer } from '../services/authentication-container.service';
import { UnauthorizedErrorInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedErrorInterceptor,
      AuthenticationContainer
    ]
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedErrorInterceptor = TestBed.inject(UnauthorizedErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
