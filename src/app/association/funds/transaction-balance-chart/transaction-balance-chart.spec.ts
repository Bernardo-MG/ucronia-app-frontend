import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionBalanceChart } from './transaction-balance-chart';

describe('TransactionBalanceChart', () => {
  let component: TransactionBalanceChart;
  let fixture: ComponentFixture<TransactionBalanceChart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionBalanceChart],
      providers: [
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(TransactionBalanceChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
