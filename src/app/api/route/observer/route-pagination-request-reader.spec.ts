import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { RoutePaginationRequestReader } from './route-pagination-request-reader';

describe('RoutePaginationRequestReader', () => {
  let reader: RoutePaginationRequestReader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    reader = new RoutePaginationRequestReader();
  });

  it('provides no pagination when there is no pagination parameters', () => {
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

  it('should be able to parse sort', () => {
    const params = convertToParamMap({ sort: 'property,asc' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(1);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property');
      expect(request.sort[0].order).toEqual('asc');
    }
  });

  it('should be able to parse sort with default direction when no direction is provided', () => {
    const params = convertToParamMap({ sort: 'property' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(1);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property');
      expect(request.sort[0].order).toEqual('asc');
    }
  });

  it('should be able to parse multiple sorts', () => {
    const params = convertToParamMap({ sort: ['property1,asc', 'property2,desc'] });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(2);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property1');
      expect(request.sort[0].order).toEqual('asc');
      expect(request.sort[1].property).toEqual('property2');
      expect(request.sort[1].order).toEqual('desc');
    }
  });

});
