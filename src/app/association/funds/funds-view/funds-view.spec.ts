import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Transaction, TransactionSummary } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, Subject } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';
import { TransactionReportService } from '../transaction-report-service';
import { TransactionService } from '../transaction-service';
import { FundsView } from './funds-view';

describe('FundsView', () => {
  let component: FundsView;
  let fixture: ComponentFixture<FundsView>;

  const transactionServiceMock = jasmine.createSpyObj<TransactionService>(
    'TransactionService',
    ['create', 'update', 'delete', 'getOne']
  );

  const transactionReportServiceMock = jasmine.createSpyObj<TransactionReportService>(
    'TransactionReportService',
    ['downloadExcelReport']
  );

  const transactionBalanceServiceMock = jasmine.createSpyObj<TransactionBalanceService>(
    'TransactionBalanceService',
    ['summary', 'monthly']
  );

  const transactionCalendarServiceMock = jasmine.createSpyObj<TransactionCalendarService>(
    'TransactionCalendarService',
    ['getRange', 'getCalendarInRange']
  );

  beforeEach(async () => {
    transactionBalanceServiceMock.monthly.and.returnValue(
      of([])
    );
    transactionBalanceServiceMock.summary.and.returnValue(
      of(new TransactionSummary())
    );
    transactionCalendarServiceMock.getRange.and.returnValue(
      of([])
    );
    transactionCalendarServiceMock.getCalendarInRange.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        FundsView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: TransactionReportService, useValue: transactionReportServiceMock },
        { provide: TransactionBalanceService, useValue: transactionBalanceServiceMock },
        { provide: TransactionCalendarService, useValue: transactionCalendarServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FundsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('reloads the selected month after a refresh', () => {
    component.loadCalendar(new Date(2026, 0, 1));
    component.loadCalendar();
    expect(transactionCalendarServiceMock.getCalendarInRange).toHaveBeenCalledWith(2026, 0);
    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args).toEqual([2026, 0]);
  });

  it('ignores an older calendar response after selecting a new month', () => {
    const january = new Subject<Transaction[]>();
    const february = new Subject<Transaction[]>();
    transactionCalendarServiceMock.getCalendarInRange.and.returnValues(january, february);

    component.loadCalendar(new Date(2026, 0, 1));
    component.loadCalendar(new Date(2026, 1, 1));
    expect(january.observed).toBeFalse();

    january.next([{ index: 1 } as Transaction]);
    february.next([{ index: 2 } as Transaction]);
    expect(component.transactions.map(t => t.index)).toEqual([2]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
