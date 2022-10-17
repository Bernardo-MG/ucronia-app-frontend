import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UrlParamsExtractor } from './url-params-extractor';

describe('UrlParamsExtractor', () => {
  let extractor: UrlParamsExtractor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    extractor = new UrlParamsExtractor();
  });

  it('should extract a param pair', () => {
    const params = extractor.getUrlParams('route?key=value');

    expect(params).toEqual({ 'key': 'value' });
  });

  it('should extract values for a param key duplicated two times', () => {
    const params = extractor.getUrlParams('route?key=value1&key=value2');

    expect(params).toEqual({ 'key': ['value1', 'value2'] });
  });

  it('should extract values without the selection', () => {
    const params = extractor.getUrlParamsWithout({ 'sort': 'value,asc' }, 'sort', (s) => s.startsWith(`value`));

    expect(params).toEqual({});
  });

  it('should return all the params when extracting without a selection with no match', () => {
    const params = extractor.getUrlParamsWithout({ 'sort': 'value,asc' }, 'sort', (s) => s.startsWith(`abc`));

    expect(params).toEqual({ 'sort': 'value,asc' });
  });

  it('should extract values without the selection for a param key duplicated two times', () => {
    const params = extractor.getUrlParamsWithout({ 'sort': ['value1,asc', 'value2,asc'] }, 'sort', (s) => s.startsWith(`value1`));

    expect(params).toEqual({ 'sort': 'value2,asc' });
  });

  it('should extract values without the selection for a param key duplicated three times', () => {
    const params = extractor.getUrlParamsWithout({ 'sort': ['value1,asc', 'value2,asc', 'value3,asc'] }, 'sort', (s) => s.startsWith(`value1`));

    expect(params).toEqual({ 'sort': ['value2,asc', 'value3,asc'] });
  });

  it('should append a parameter when there are no parameters', () => {
    const params = extractor.appendParameter({}, 'sort', 'value,asc');

    expect(params).toEqual({ 'sort': 'value,asc' });
  });

  it('should append a parameter when the paremeter key exists', () => {
    const params = extractor.appendParameter({ 'sort': 'value1,asc' }, 'sort', 'value2,asc');

    expect(params).toEqual({ 'sort': ['value1,asc', 'value2,asc'] });
  });

});
