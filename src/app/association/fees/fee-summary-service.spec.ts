import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { FeeSummaryService } from './fee-summary-service';

describe('FeeSummaryService', () => {
  let service: FeeSummaryService;

  const mockUcroniaClient = {
    fee: {
      summary: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(FeeSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
