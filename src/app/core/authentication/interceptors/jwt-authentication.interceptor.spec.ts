import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtAuthenticationInterceptor } from './jwt-authentication.interceptor';

describe('JwtAuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      JwtAuthenticationInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtAuthenticationInterceptor = TestBed.inject(JwtAuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
