import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionBalanceChartView } from './transaction-balance-chart-view';

describe('TransactionBalanceChartView', () => {
  let component: TransactionBalanceChartView;
  let fixture: ComponentFixture<TransactionBalanceChartView>;

  const transactionBalanceServiceMock = {
    monthly: vi.fn(

  ).mockName("TransactionBalanceService.monthly")
};

  beforeEach(() => {
    transactionBalanceServiceMock.monthly.mockReturnValue(of([]));

    TestBed.configureTestingModule({
      imports: [TransactionBalanceChartView],
      providers: [
        { provide: TransactionBalanceService, useValue: transactionBalanceServiceMock }
      ]
    });

    fixture = TestBed.createComponent(TransactionBalanceChartView);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit + setupBalanceReload
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load monthly data on init', () => {
    expect(transactionBalanceServiceMock.monthly).toHaveBeenCalled();
  });
});