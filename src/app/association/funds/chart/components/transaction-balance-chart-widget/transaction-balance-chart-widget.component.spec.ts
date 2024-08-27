import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../../core/service/transaction-balance.service';
import { TransactionBalanceChartWidgetComponent } from './transaction-balance-chart-widget.component';

describe('TransactionBalanceChartWidgetComponent', () => {
  let component: TransactionBalanceChartWidgetComponent;
  let fixture: ComponentFixture<TransactionBalanceChartWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TransactionBalanceChartWidgetComponent
      ],
      providers: [
        TransactionBalanceService
      ]
    });
    fixture = TestBed.createComponent(TransactionBalanceChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
