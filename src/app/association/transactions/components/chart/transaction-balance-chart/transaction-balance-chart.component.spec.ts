import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../../service/transaction-balance.service';
import { TransactionBalanceChartComponent } from './transaction-balance-chart.component';

describe('TransactionBalanceChartComponent', () => {
  let component: TransactionBalanceChartComponent;
  let fixture: ComponentFixture<TransactionBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TransactionBalanceChartComponent
      ],
      providers: [
        TransactionBalanceService
      ]
    });
    fixture = TestBed.createComponent(TransactionBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
