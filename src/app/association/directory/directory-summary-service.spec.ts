import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { DirectorySummaryService } from './directory-summary-service';

describe('DirectorySummaryService', () => {
  let service: DirectorySummaryService;

  const mockUcroniaClient = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(DirectorySummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
