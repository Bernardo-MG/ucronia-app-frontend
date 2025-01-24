import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from './transaction-balance.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionBalanceService', () => {
  let service: TransactionBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(TransactionBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
