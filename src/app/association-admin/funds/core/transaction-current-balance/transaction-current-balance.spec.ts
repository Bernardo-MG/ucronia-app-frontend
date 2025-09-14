import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../transaction-balance-service/transaction-balance-service';
import { FundsCurrentBalance } from './transaction-current-balance';

describe('FundsCurrentBalanceWidgetContainer', () => {
  let component: FundsCurrentBalance;
  let fixture: ComponentFixture<FundsCurrentBalance>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FundsCurrentBalance],
      providers: [
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(FundsCurrentBalance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
