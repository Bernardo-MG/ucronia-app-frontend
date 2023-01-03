import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UrlParamsProcessor } from './url-params-processor';

describe('UrlParamsProcessor', () => {
  let extractor: UrlParamsProcessor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    extractor = new UrlParamsProcessor();
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
