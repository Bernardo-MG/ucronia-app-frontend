import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { Direction } from '@app/core/api/models/direction';
import { PaginationRequestParametersParser } from './pagination-request-parameters-parser';

describe('PaginationRequestParametersParser', () => {
  let reader: PaginationRequestParametersParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    reader = new PaginationRequestParametersParser();
  });

  it('should provide no request when there are no request parameters', () => {
    const params = convertToParamMap({});
    const request = reader.parse(params);

    expect(request).toBeUndefined();
  });

  it('should be able to parse the request when all parameters are provided', () => {
    const params = convertToParamMap({ page: '1', size: '2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toEqual(2);
  });

  it('should be able to parse the request when only the page is provided', () => {
    const params = convertToParamMap({ page: '1' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toBeUndefined();
  });

  it('should be able to parse the request when only the size is provided', () => {
    const params = convertToParamMap({ size: '2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toBeUndefined();
    expect(request?.size).toEqual(2);
  });

  // ERROR HANDLING

  it('should be able to parse the request when the page is negative', () => {
    const params = convertToParamMap({ page: '-1', size: '2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(-1);
    expect(request?.size).toEqual(2);
  });

  it('should be able to parse the request when the size is negative', () => {
    const params = convertToParamMap({ page: '1', size: '-2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toEqual(-2);
  });

  it('should be able to parse the request when the page and size are negative', () => {
    const params = convertToParamMap({ page: '-1', size: '-2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(-1);
    expect(request?.size).toEqual(-2);
  });

  it('should not parse the request page when the page is not a number', () => {
    const params = convertToParamMap({ page: 'abc', size: '2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toBeUndefined();
    expect(request?.size).toEqual(2);
  });

  it('should not parse the request size when the size is not a number', () => {
    const params = convertToParamMap({ page: '1', size: 'abc' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toBeUndefined();
  });

  it('should parse the default value for the page when the page is empty', () => {
    const params = convertToParamMap({ page: '', size: '2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(0);
    expect(request?.size).toEqual(2);
  });

  it('should parse the default value for the size when the size is empty', () => {
    const params = convertToParamMap({ page: '1', size: '' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.page).toEqual(1);
    expect(request?.size).toEqual(0);
  });

  // SORT

  it('should parse no sort when there is no sort data', () => {
    const params = convertToParamMap({ page: '1', size: '2' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).toBeUndefined();
  });

  it('should be able to parse the sort data', () => {
    const params = convertToParamMap({ sort: 'property,asc' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(1);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property');
      expect(request.sort[0].direction).toEqual(Direction.Ascending);
    }
  });

  it('should parse the sort data with the default direction when no direction is provided', () => {
    const params = convertToParamMap({ sort: 'property' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(1);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property');
      expect(request.sort[0].direction).toEqual(Direction.Ascending);
    }
  });

  it('should parse the sort data with the default direction when no valid direction is provided', () => {
    const params = convertToParamMap({ sort: 'property,abc' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(1);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property');
      expect(request.sort[0].direction).toEqual(Direction.Ascending);
    }
  });

  it('should be able to parse multiple sort data', () => {
    const params = convertToParamMap({ sort: ['property1,asc', 'property2,desc'] });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).not.toBeUndefined();
    expect(request?.sort?.length).toEqual(2);
    if (request?.sort) {
      expect(request.sort[0].property).toEqual('property1');
      expect(request.sort[0].direction).toEqual(Direction.Ascending);
      expect(request.sort[1].property).toEqual('property2');
      expect(request.sort[1].direction).toEqual(Direction.Descending);
    }
  });

  // SORT ERROR HANDLING

  it('should parse no sort data when missing the property', () => {
    const params = convertToParamMap({ sort: ',asc' });
    const request = reader.parse(params);

    expect(request).not.toBeUndefined();
    expect(request?.sort).toBeUndefined();
  });

});
