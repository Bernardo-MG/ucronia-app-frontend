import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { RouteSortReader } from './route-sort-reader';

describe('RouteSortReader', () => {
  let reader: RouteSortReader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    reader = new RouteSortReader();
  });

  it('should provide an empty sort when there are no parameters', () => {
    const params = convertToParamMap({});
    const request = reader.read(params);

    expect(request).toBeUndefined();
  });

  it('should be able to parse an ascending sort', () => {
    const params = convertToParamMap({ sort: 'property,asc' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request).toHaveSize(1);
    if (request) {
      expect(request[0].property).toEqual('property');
      expect(request[0].order).toEqual('asc');
    }
  });

  it('should be able to parse a descending sort', () => {
    const params = convertToParamMap({ sort: 'property,desc' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request).toHaveSize(1);
    if (request) {
      expect(request[0].property).toEqual('property');
      expect(request[0].order).toEqual('desc');
    }
  });

  it('should be able to parse sort with default direction when no direction is provided', () => {
    const params = convertToParamMap({ sort: 'property' });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request).toHaveSize(1);
    if (request) {
      expect(request[0].property).toEqual('property');
      expect(request[0].order).toEqual('asc');
    }
  });

  it('should be able to parse multiple sorts', () => {
    const params = convertToParamMap({ sort: ['property1,asc', 'property2,desc'] });
    const request = reader.read(params);

    expect(request).not.toBeUndefined();
    expect(request).toHaveSize(2);
    if (request) {
      expect(request[0].property).toEqual('property1');
      expect(request[0].order).toEqual('asc');
      expect(request[1].property).toEqual('property2');
      expect(request[1].order).toEqual('desc');
    }
  });

});
