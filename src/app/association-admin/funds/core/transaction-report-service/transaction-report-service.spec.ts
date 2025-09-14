import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransactionReportService } from './transaction-report-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionReportService', () => {
  let service: TransactionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(TransactionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
