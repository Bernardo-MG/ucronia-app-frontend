import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ImageEndpoint } from './image-endpoint';

describe('ImageEndpoint', () => {
  let endpoint: ImageEndpoint;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    endpoint = new ImageEndpoint(TestBed.inject(HttpClient), 'http://localhost/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should expose the shared asset content URL', () => {
    expect(endpoint.contentUrl(1)).toBe('http://localhost/api/assets/1/content');
  });

  it('should send image visibility when creating an image', () => {
    const file = new File(['data'], 'image.png', { type: 'image/png' });

    endpoint.create('Image', 'Description', false, file).subscribe();

    const request = http.expectOne('http://localhost/api/images');
    const body = request.request.body as FormData;
    expect(request.request.method).toBe('POST');
    expect(body.get('publicAccess')).toBe('false');
    expect(body.get('file')).toBe(file);
    request.flush({ content: { number: 1, name: 'Image', description: 'Description', publicAccess: false } });
  });

  it('should send image visibility when updating metadata', () => {
    endpoint.patch(1, 'Image', 'Description', false).subscribe();

    const request = http.expectOne('http://localhost/api/images/1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ name: 'Image', description: 'Description', publicAccess: false });
    request.flush({ content: { number: 1, name: 'Image', description: 'Description', publicAccess: false } });
  });
});
