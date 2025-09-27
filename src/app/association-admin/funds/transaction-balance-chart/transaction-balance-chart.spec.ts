import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionBalanceChartContainer } from './transaction-balance-chart';

describe('TransactionBalanceChartContainer', () => {
  let component: TransactionBalanceChartContainer;
  let fixture: ComponentFixture<TransactionBalanceChartContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionBalanceChartContainer],
      providers: [
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(TransactionBalanceChartContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
