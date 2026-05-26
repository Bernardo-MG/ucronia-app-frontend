import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';
import { TransactionBalanceChartView } from './transaction-balance-chart-view';

describe('TransactionBalanceChartView', () => {
  let component: TransactionBalanceChartView;
  let fixture: ComponentFixture<TransactionBalanceChartView>;

  const transactionBalanceServiceMock = jasmine.createSpyObj<TransactionBalanceService>(
    'TransactionBalanceService',
    ['monthly']
  );

  const transactionCalendarServiceMock = jasmine.createSpyObj<TransactionCalendarService>(
    'TransactionCalendarService',
    ['getRange']
  );

  beforeEach(() => {
    transactionBalanceServiceMock.monthly.and.returnValue(
      of([])
    );
    transactionCalendarServiceMock.getRange.and.returnValue(
      of([])
    );

    TestBed.configureTestingModule({
      imports: [TransactionBalanceChartView],
      providers: [
        { provide: TransactionBalanceService, useValue: transactionBalanceServiceMock },
        { provide: TransactionCalendarService, useValue: transactionCalendarServiceMock }
      ]
    });
    fixture = TestBed.createComponent(TransactionBalanceChartView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
