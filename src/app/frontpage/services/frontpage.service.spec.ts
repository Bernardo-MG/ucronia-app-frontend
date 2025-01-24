import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FrontpageService } from './frontpage.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FrontpageService', () => {
  let service: FrontpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(FrontpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
