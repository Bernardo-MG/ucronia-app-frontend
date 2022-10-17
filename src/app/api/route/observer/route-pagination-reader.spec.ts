import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { RoutePaginationReader } from './route-pagination-reader';

describe('RoutePaginationReader', () => {
  let reader: RoutePaginationReader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    reader = new RoutePaginationReader();
  });

  it('should provide no pagination when there is no pagination parameters', () => {
    const params = convertToParamMap({});
    const request = reader.read(params);

    expect(request).toBeUndefined();
  });

  it('should be able to parse pagination when all parameters are provided', () => {
    const params = convertToParamMap({ page: '1', size: '2' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toEqual(2);
  });

  it('should be able to parse pagination when only the page is provided', () => {
    const params = convertToParamMap({ page: '1' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toBeUndefined();
  });

  it('should provide an empty pagination when there is no page parameter', () => {
    const params = convertToParamMap({ size: '2' });
    const request = reader.read(params);

    expect(request).toBeUndefined();
  });

  it('should be able to parse pagination when the page is zero', () => {
    const params = convertToParamMap({ page: '0', size: '2' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(0);
    expect(request?.size).toEqual(2);
  });

  it('should be able to parse pagination when the size is zero', () => {
    const params = convertToParamMap({ page: '1', size: '0' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toEqual(0);
  });

  it('should be able to parse pagination when the page and size are zero', () => {
    const params = convertToParamMap({ page: '0', size: '0' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(0);
    expect(request?.size).toEqual(0);
  });

});
