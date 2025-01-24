import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MyFeesService } from './my-fees.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MyFeesService', () => {
  let service: MyFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(MyFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
