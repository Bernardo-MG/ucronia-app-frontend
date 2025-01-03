import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransactionReportService } from './transaction-report.service';

describe('TransactionReportService', () => {
  let service: TransactionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TransactionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
