import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../../balance/services/transaction-balance.service';
import { TransactionBalanceChartWidgetContainer } from './transaction-balance-chart-widget.container';

describe('TransactionBalanceChartWidgetContainer', () => {
  let component: TransactionBalanceChartWidgetContainer;
  let fixture: ComponentFixture<TransactionBalanceChartWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TransactionBalanceChartWidgetContainer
      ],
      providers: [
        TransactionBalanceService
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
