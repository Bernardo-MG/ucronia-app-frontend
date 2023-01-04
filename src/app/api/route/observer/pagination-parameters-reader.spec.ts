import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { PaginationParametersReader } from './pagination-parameters-reader';

describe('PaginationParametersReader', () => {
  let reader: PaginationParametersReader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    reader = new PaginationParametersReader();
  });

  it('should provide no pagination when there is no pagination parameters', () => {
    const params = convertToParamMap({});
    const pagination = reader.read(params);

    expect(pagination).toBeUndefined();
  });

  it('should be able to parse pagination when all parameters are provided', () => {
    const params = convertToParamMap({ page: '1', size: '2' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(1);
    expect(pagination?.size).toEqual(2);
  });

  it('should be able to parse pagination when only the page is provided', () => {
    const params = convertToParamMap({ page: '1' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(1);
    expect(pagination?.size).toBeUndefined();
  });

  it('should provide an empty pagination when there is no page parameter', () => {
    const params = convertToParamMap({ size: '2' });
    const pagination = reader.read(params);

    expect(pagination).toBeUndefined();
  });

  it('should be able to parse pagination when the page is zero', () => {
    const params = convertToParamMap({ page: '0', size: '2' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(0);
    expect(pagination?.size).toEqual(2);
  });

  it('should be able to parse pagination when the size is zero', () => {
    const params = convertToParamMap({ page: '1', size: '0' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(1);
    expect(pagination?.size).toEqual(0);
  });

  it('should be able to parse pagination when the page and size are zero', () => {
    const params = convertToParamMap({ page: '0', size: '0' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(0);
    expect(pagination?.size).toEqual(0);
  });

  // ERROR HANDLING

  it('should be able to parse pagination when the page is negative', () => {
    const params = convertToParamMap({ page: '-1', size: '2' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(-1);
    expect(pagination?.size).toEqual(2);
  });

  it('should be able to parse pagination when the size is negative', () => {
    const params = convertToParamMap({ page: '1', size: '-2' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(1);
    expect(pagination?.size).toEqual(-2);
  });

  it('should be able to parse pagination when the page and size are negative', () => {
    const params = convertToParamMap({ page: '-1', size: '-2' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(-1);
    expect(pagination?.size).toEqual(-2);
  });

  it('should not parse pagination when the page is not a number', () => {
    const params = convertToParamMap({ page: 'abc', size: '2' });
    const pagination = reader.read(params);

    expect(pagination).toBeUndefined();
  });

  it('should not parse pagination size when the size is not a number', () => {
    const params = convertToParamMap({ page: '1', size: 'abc' });
    const pagination = reader.read(params);

    expect(pagination).not.toBeUndefined();
    expect(pagination?.page).toEqual(1);
    expect(pagination?.size).toBeUndefined();
  });

});
