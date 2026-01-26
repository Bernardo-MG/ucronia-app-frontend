import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { FeeReportService } from './fee-report-service';

describe('FeeReportService', () => {
  let service: FeeReportService;

  const mockUcroniaClient = {
    fee: {
      balance: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(FeeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
