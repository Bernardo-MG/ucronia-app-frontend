import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FileEndpoint } from './file-endpoint';

describe('FileEndpoint', () => {
  let endpoint: FileEndpoint;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    endpoint = new FileEndpoint(TestBed.inject(HttpClient), 'http://localhost/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should expose the file content URL', () => {
    expect(endpoint.contentUrl(1)).toBe('http://localhost/api/assets/1/content?download=true');
  });

  it('should send file visibility when creating a file', () => {
    const file = new File(['data'], 'document.pdf', { type: 'application/pdf' });

    endpoint.create('Document', 'Description', false, file).subscribe();

    const request = http.expectOne('http://localhost/api/assets/files');
    const body = request.request.body as FormData;
    expect(request.request.method).toBe('POST');
    expect(body.get('publicAccess')).toBe('false');
    expect(body.get('file')).toBe(file);
    request.flush({ content: { number: 1, name: 'Document', description: 'Description', publicAccess: false } });
  });

  it('should send file visibility when updating metadata', () => {
    endpoint.patch(1, 'Document', 'Description', false).subscribe();

    const request = http.expectOne('http://localhost/api/assets/files/1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ name: 'Document', description: 'Description', publicAccess: false });
    request.flush({ content: { number: 1, name: 'Document', description: 'Description', publicAccess: false } });
  });
});
