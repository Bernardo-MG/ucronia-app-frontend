import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UrlParamsExtractor } from './url-parameters-extractor';

describe('UrlParamsProcessor', () => {
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

});
