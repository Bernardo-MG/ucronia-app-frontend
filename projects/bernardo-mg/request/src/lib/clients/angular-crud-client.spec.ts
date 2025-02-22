import { HttpClient, HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularErrorRequestInterceptor } from '../interceptors/angular-error-request-interceptor';
import { AngularCrudClient } from './angular-crud-client';

describe('AngularCrudClient', () => {
  let client: AngularCrudClient;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let errorInterceptor: AngularErrorRequestInterceptor;

  const rootUrl = 'http://test.com/api';
  const testData = { name: 'test' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AngularErrorRequestInterceptor,
        { provide: 'ROOT_URL', useValue: rootUrl },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    errorInterceptor = TestBed.inject(AngularErrorRequestInterceptor);

    client = new AngularCrudClient(httpClient, rootUrl);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(client).toBeTruthy();
  });

  /** SEND REQUESTS */

  it('should send a POST request', () => {
    client.create(testData).subscribe(data => { });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('POST');
  });

  it('should send a GET request', () => {
    client.read().subscribe(data => { });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('GET');
  });

  it('should send a PUT request', () => {
    client.update(testData).subscribe(data => { });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('PUT');
  });

  it('should send a DELETE request', () => {
    client.delete().subscribe(data => { });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should send a PATCH request', () => {
    client.patch(testData).subscribe(data => { });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('PATCH');
  });

  /** RECEIVE RESPONSES */

  it('should receive response from a POST request', () => {
    const testData = { name: 'test' };
    client.create(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    req.flush(testData);
  });

  it('should send a GET request', () => {
    const testData = { name: 'test' };
    client.read().subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    req.flush(testData);
  });

  it('should send a PUT request', () => {
    const testData = { name: 'test' };
    client.update(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    req.flush(testData);
  });

  it('should send a DELETE request', () => {
    client.delete().subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    req.flush(null);
  });

  it('should send a PATCH request', () => {
    const testData = { name: 'test' };
    client.patch(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    req.flush(testData);
  });

  /** ROUTES */

  it('should append route correctly', () => {
    client.appendRoute('/test').appendRoute('/route');

    expect(client['route']).toBe('/test/route');
  });

  it('should construct the final URL correctly', () => {
    client.appendRoute('/test').appendRoute('/route');

    const finalUrl = client['getFinalUrl']();
    expect(finalUrl).toBe('http://test.com/api/test/route');
  });

  /** PARAMETERS */

  it('should set parameters correctly', () => {
    client.parameter('key', 'value');

    const params = new HttpParams().append('key', 'value');
    expect(client['options'].params).toEqual(params);
  });

  it('should apply a parameter loader correctly', () => {
    const paramLoader = {
      load: (callback: (key: string, value: any) => void) => {
        callback('key1', 'value1');
        callback('key2', 'value2');
      },
    };

    client.loadParameters(paramLoader);

    const params = new HttpParams()
      .append('key1', 'value1')
      .append('key2', 'value2');

    expect(client['options'].params).toEqual(params);
  });

});
