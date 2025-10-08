import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookReportService } from './book-report-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BookReportService', () => {
  let service: BookReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(BookReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
