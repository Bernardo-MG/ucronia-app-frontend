import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../service/transaction-balance.service';
import { FundsBalanceChartComponent } from './funds-balance-chart.component';

describe('FundsBalanceChartComponent', () => {
  let component: FundsBalanceChartComponent;
  let fixture: ComponentFixture<FundsBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        FundsBalanceChartComponent
      ],
      providers: [
        TransactionBalanceService
      ]
    });
    fixture = TestBed.createComponent(FundsBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
