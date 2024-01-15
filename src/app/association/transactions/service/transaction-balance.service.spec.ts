import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionBalanceService } from './transaction-balance.service';

describe('TransactionBalanceService', () => {
  let service: TransactionBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TransactionBalanceService
      ]
    });
    service = TestBed.inject(TransactionBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
