import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { TransactionReportService } from './transaction-report-service';

describe('TransactionReportService', () => {
  let service: TransactionReportService;

  const mockUcroniaClient = {
    transaction: {
      excel: vi.fn().mockReturnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(TransactionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
