import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AngularClient } from './angular-client';
import { AngularErrorRequestInterceptor } from './angular-error-request-interceptor';
import { PaginatedQuery } from '../models/paginated-query';
import { Sort } from '../models/sort';
import { SortDirection } from '../models/sort-direction';

describe('AngularClient', () => {
  let client: AngularClient;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let errorInterceptor: AngularErrorRequestInterceptor;

  const rootUrl = 'http://test.com/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AngularErrorRequestInterceptor,
        { provide: 'ROOT_URL', useValue: rootUrl }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    errorInterceptor = TestBed.inject(AngularErrorRequestInterceptor);

    client = new AngularClient(httpClient, rootUrl);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(client).toBeTruthy();
  });

  it('should send a POST request', () => {
    const testData = { name: 'test' };
    client.create(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(testData);
  });

  it('should send a GET request', () => {
    const testData = { name: 'test' };
    client.read().subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should send a PUT request', () => {
    const testData = { name: 'test' };
    client.update(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('PUT');
    req.flush(testData);
  });

  it('should send a DELETE request', () => {
    client.delete().subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should send a PATCH request', () => {
    const testData = { name: 'test' };
    client.patch(testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${rootUrl}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(testData);
  });

  it('should append route correctly', () => {
    client.appendRoute('/test').appendRoute('/route');
    expect(client['route']).toBe('/test/route');
  });

  it('should set parameters correctly', () => {
    client.parameter('key', 'value');
    const params = new HttpParams().append('key', 'value');
    expect(client['options'].params).toEqual(params);
  });

  it('should sort ascending correctly', () => {
    const sort = new Sort([{ property: 'name', direction: SortDirection.Ascending }]);
    client.sort(sort);
    const params = new HttpParams().append('sort', 'name,asc');
    expect(client['options'].params).toEqual(params);
  });

  it('should sort descending correctly', () => {
    const sort = new Sort([{ property: 'name', direction: SortDirection.Descending }]);
    client.sort(sort);
    const params = new HttpParams().append('sort', 'name,desc');
    expect(client['options'].params).toEqual(params);
  });

  it('should ignore unsorted sorting', () => {
    const sort = new Sort([{ property: 'name', direction: SortDirection.Unsorted }]);
    client.sort(sort);
    expect(client['options'].params).toEqual(undefined);
  });

  it('should handle query parameters correctly', () => {
    const sort = new Sort([{ property: 'name', direction: SortDirection.Ascending }]);
    const query = new PaginatedQuery();
    query.sort = sort;
    query.parameters = { key1: 'value1', key2: 'value2' };

    client.query(query);
    const params = new HttpParams()
      .append('sort', 'name,asc')
      .append('key1', 'value1')
      .append('key2', 'value2');
    expect(client['options'].params).toEqual(params);
  });

});
