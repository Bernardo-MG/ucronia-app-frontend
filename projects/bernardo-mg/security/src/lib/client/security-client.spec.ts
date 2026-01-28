import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UCRONIA_API_BASE_URL, SecurityClient } from './security-client';

describe('SecurityClient', () => {
  let service: SecurityClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityClient,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: UCRONIA_API_BASE_URL, useValue: 'http://localhost/api' }
      ]
    });

    service = TestBed.inject(SecurityClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
