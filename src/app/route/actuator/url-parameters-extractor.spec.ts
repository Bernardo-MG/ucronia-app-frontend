import { TestBed } from '@angular/core/testing';
import { UrlParamsExtractor } from './url-parameters-extractor';

describe('UrlParamsProcessor', () => {
  let extractor: UrlParamsExtractor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    extractor = new UrlParamsExtractor();
  });

  it('should extract no param pairs when there are no parameters', () => {
    const params = extractor.getUrlParams('route');

    expect(params).toEqual({});
  });

  it('should extract a param pair when there is only a single pair', () => {
    const params = extractor.getUrlParams('route?key=value');

    expect(params).toEqual({ 'key': 'value' });
  });

  it('should extract a param pair when there are two pairs', () => {
    const params = extractor.getUrlParams('route?key1=value1&key2=value2');

    expect(params).toEqual({ 'key1': 'value1', 'key2': 'value2' });
  });

  it('should extract values for a param key duplicated two times', () => {
    const params = extractor.getUrlParams('route?key=value1&key=value2');

    expect(params).toEqual({ 'key': ['value1', 'value2'] });
  });

});
