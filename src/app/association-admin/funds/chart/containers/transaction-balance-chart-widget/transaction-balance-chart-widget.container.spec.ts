import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../../balance/services/transaction-balance.service';
import { TransactionBalanceChartWidgetContainer } from './transaction-balance-chart-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionBalanceChartWidgetContainer', () => {
  let component: TransactionBalanceChartWidgetContainer;
  let fixture: ComponentFixture<TransactionBalanceChartWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TransactionBalanceChartWidgetContainer],
    providers: [
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(TransactionBalanceChartWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
