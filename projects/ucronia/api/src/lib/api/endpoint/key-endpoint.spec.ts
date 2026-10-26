import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { KeyEndpoint } from './key-endpoint';

describe('KeyEndpoint', () => {
  let endpoint: KeyEndpoint;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    endpoint = new KeyEndpoint(TestBed.inject(HttpClient), '/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should request a page of keys', () => {
    endpoint.page(2, 100).subscribe();
    const request = http.expectOne('/api/profile/key?page=2&size=100');

    expect(request.request.method).toBe('GET');

    request.flush({ content: [], page: 2, last: true });
  });
});
