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
    client = new AngularCrudClient(httpClient, rootUrl, errorInterceptor);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the client', () => {
    expect(client).toBeTruthy();
  });

  /** SEND REQUESTS */

  it('should send a POST request', () => {
    client.create(testData).subscribe();
    const req = httpMock.expectOne(rootUrl);
    expect(req.request.method).toBe('POST');
  });

  it('should send a GET request', () => {
    client.read().subscribe();
    const req = httpMock.expectOne(rootUrl);
    expect(req.request.method).toBe('GET');
  });

  it('should send a PUT request', () => {
    client.update(testData).subscribe();
    const req = httpMock.expectOne(rootUrl);
    expect(req.request.method).toBe('PUT');
  });

  it('should send a DELETE request', () => {
    client.delete().subscribe();
    const req = httpMock.expectOne(rootUrl);
    expect(req.request.method).toBe('DELETE');
  });

  it('should send a PATCH request', () => {
    client.patch(testData).subscribe();
    const req = httpMock.expectOne(rootUrl);
    expect(req.request.method).toBe('PATCH');
  });

  /** RECEIVE RESPONSES */

  it('should receive response from a POST request', () => {
    client.create(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpMock.expectOne(rootUrl);
    req.flush(testData);
  });

  it('should receive response from a GET request', () => {
    client.read().subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpMock.expectOne(rootUrl);
    req.flush(testData);
  });

  it('should receive response from a PUT request', () => {
    client.update(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpMock.expectOne(rootUrl);
    req.flush(testData);
  });

  it('should receive response from a DELETE request', () => {
    client.delete().subscribe(data => {
      expect(data).toBeNull();
    });
    const req = httpMock.expectOne(rootUrl);
    req.flush(null);
  });

  it('should receive response from a PATCH request', () => {
    client.patch(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpMock.expectOne(rootUrl);
    req.flush(testData);
  });

  /** ROUTES */

  it('should append route correctly', () => {
    const newClient = client.appendRoute('/test').appendRoute('/route');
    expect(newClient['route']).toBe(`${rootUrl}/test/route`);
  });

  /** PARAMETERS */

  it('should set parameters correctly', () => {
    const newClient = client.parameter('key', 'value');
    expect(newClient['options'].params?.toString()).toBe('key=value');
  });

  it('should ignore undefined parameters', () => {
    const newClient = client.parameter('key', undefined);
    expect(newClient['options'].params?.toString()).toBe('');
  });

  it('should apply a parameter loader correctly', () => {
    const paramLoader = {
      load: (callback: (key: string, value: any) => void) => {
        callback('key1', 'value1');
        callback('key2', 'value2');
      },
    };
    
    const newClient = client.loadParameters(paramLoader);
    expect(newClient['options'].params?.toString()).toBe('key1=value1&key2=value2');
  });

  it('should ignore undefined parameters through the parameter loader', () => {
    const paramLoader = {
      load: (callback: (key: string, value: any) => void) => {
        callback('key1', undefined);
      },
    };
    
    const newClient = client.loadParameters(paramLoader);
    expect(newClient['options'].params?.toString()).toBe('');
  });

});
