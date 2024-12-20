import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookReportService } from './book-report.service';

describe('BookReportService', () => {
  let service: BookReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BookReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
