import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UCRONIA_API_BASE_URL, UcroniaClient } from './ucronia-client';

describe('UcroniaClient', () => {
  let service: UcroniaClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UcroniaClient,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: UCRONIA_API_BASE_URL, useValue: 'http://localhost/api' }
      ]
    });

    service = TestBed.inject(UcroniaClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
