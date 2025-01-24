import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LibraryLendingService } from './library-lending.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryLendingService', () => {
  let service: LibraryLendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(LibraryLendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
