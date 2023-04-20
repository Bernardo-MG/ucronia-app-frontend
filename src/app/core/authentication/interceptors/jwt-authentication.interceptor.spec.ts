import { TestBed } from '@angular/core/testing';
import { AuthenticationContainer } from '../services/authentication-container.service';
import { JwtAuthenticationInterceptor } from './jwt-authentication.interceptor';

describe('JwtAuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtAuthenticationInterceptor,
      AuthenticationContainer
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtAuthenticationInterceptor = TestBed.inject(JwtAuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
