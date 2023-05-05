import { TestBed } from '@angular/core/testing';
import { SecurityContainer } from '../services/security-container.service';
import { UnauthorizedErrorInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedErrorInterceptor,
      SecurityContainer
    ]
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedErrorInterceptor = TestBed.inject(UnauthorizedErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
