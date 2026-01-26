import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { BookReportService } from './book-report-service';

describe('BookReportService', () => {
  let service: BookReportService;

  const mockUcroniaClient = {
    library: {
      report: {
        excel: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(BookReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
