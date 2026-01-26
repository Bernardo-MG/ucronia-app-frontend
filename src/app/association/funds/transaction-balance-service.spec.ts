import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { TransactionBalanceService } from './transaction-balance-service';

describe('TransactionBalanceService', () => {
  let service: TransactionBalanceService;

  const mockUcroniaClient = {
    transaction: {
      currentBalance: jasmine.createSpy().and.returnValue(of({})),
      monthlyBalance: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(TransactionBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
