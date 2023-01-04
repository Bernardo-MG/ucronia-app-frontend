import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { SortParametersParser } from './sort-parameters-parser';

describe('SortParametersParser', () => {
  let reader: SortParametersParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    reader = new SortParametersParser();
  });

  it('should parse no sort when there is no sort data', () => {
    const params = convertToParamMap({});
    const sort = reader.parse(params);

    expect(sort).toBeUndefined();
  });

  it('should be able to parse an ascending sort', () => {
    const params = convertToParamMap({ sort: 'property,asc' });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(1);
    if (sort) {
      expect(sort[0].property).toEqual('property');
      expect(sort[0].order).toEqual('asc');
    }
  });

  it('should be able to parse a descending sort', () => {
    const params = convertToParamMap({ sort: 'property,desc' });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(1);
    if (sort) {
      expect(sort[0].property).toEqual('property');
      expect(sort[0].order).toEqual('desc');
    }
  });

  it('should be able to parse sort with default direction when no direction is provided', () => {
    const params = convertToParamMap({ sort: 'property' });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(1);
    if (sort) {
      expect(sort[0].property).toEqual('property');
      expect(sort[0].order).toEqual('asc');
    }
  });

  it('should parse the sort data with the default direction when no valid direction is provided', () => {
    const params = convertToParamMap({ sort: 'property,abc' });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(1);
    if (sort) {
      expect(sort[0].property).toEqual('property');
      expect(sort[0].order).toEqual('asc');
    }
  });

  it('should be able to parse multiple sort data', () => {
    const params = convertToParamMap({ sort: ['property1,asc', 'property2,desc'] });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(2);
    if (sort) {
      expect(sort[0].property).toEqual('property1');
      expect(sort[0].order).toEqual('asc');
      expect(sort[1].property).toEqual('property2');
      expect(sort[1].order).toEqual('desc');
    }
  });

  // ERROR HANDLING

  it('should parse no sort data when missing the property', () => {
    const params = convertToParamMap({ sort: ',asc' });
    const sort = reader.parse(params);

    expect(sort).toBeUndefined();
  });

  it('should parse no sort data when the value is empty', () => {
    const params = convertToParamMap({ sort: '' });
    const sort = reader.parse(params);

    expect(sort).toBeUndefined();
  });

  it('should parse only sort data with a property', () => {
    const params = convertToParamMap({ sort: [',asc', 'property2,desc'] });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(1);
    if (sort) {
      expect(sort[0].property).toEqual('property2');
      expect(sort[0].order).toEqual('desc');
    }
  });

  it('should parse only sort data with valid data', () => {
    const params = convertToParamMap({ sort: ['', 'property2,desc'] });
    const sort = reader.parse(params);

    expect(sort).not.toBeUndefined();
    expect(sort).toHaveSize(1);
    if (sort) {
      expect(sort[0].property).toEqual('property2');
      expect(sort[0].order).toEqual('desc');
    }
  });

});
