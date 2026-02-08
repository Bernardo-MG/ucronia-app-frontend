import { TestBed } from '@angular/core/testing';

import { UcroniaClient } from '@ucronia/api';
import { DirectoryReportService } from './directory-report-service';

describe('DirectoryReportService', () => {
  let service: DirectoryReportService;

  const mockUcroniaClient = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(DirectoryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
