import { TestBed } from '@angular/core/testing';

import { DirectoryReportService } from './directory-report-service';

describe('DirectoryReport', () => {
  let service: DirectoryReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectoryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
