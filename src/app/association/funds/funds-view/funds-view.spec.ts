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

  it('refreshes available months after updating a transaction', () => {
    transactionServiceMock.update.and.returnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.and.returnValue(of([
      { year: 2026, month: 1 },
      { year: 2026, month: 3 }
    ]));

    component.loadCalendar(new Date(2026, 0, 1));
    component.onUpdate({ index: 1 } as Transaction);

    expect(component.months.map(m => m.getMonth())).toEqual([0, 2]);
    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args).toEqual([2026, 0]);
  });

  it('falls back to the newest available month if the selected month disappears', () => {
    transactionServiceMock.update.and.returnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.and.returnValue(of([
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));

    component.loadCalendar(new Date(2026, 0, 1));
    component.onUpdate({ index: 1 } as Transaction);

    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args).toEqual([2026, 3]);
  });

  it('refreshes months after creating a transaction without reordering the backend result', () => {
    transactionServiceMock.create.and.returnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.and.returnValue(of([
      { year: 2025, month: 12 },
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));

    component.onCreate({ index: 1 } as Transaction);

    expect(component.months.map(m => [m.getFullYear(), m.getMonth()])).toEqual([
      [2025, 11], [2026, 1], [2026, 3]
    ]);
    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args)
      .toEqual([2026, 3]);
  });

  it('refreshes months after confirming deletion and falls back to the newest remaining month', () => {
    const confirmationService = TestBed.inject(ConfirmationService);
    const confirmSpy = spyOn(confirmationService, 'confirm').and.stub();
    transactionServiceMock.delete.and.returnValue(of({}));
    transactionCalendarServiceMock.getRange.and.returnValue(of([
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));
    component.selectedData = { index: 17 } as Transaction;
    component.loadCalendar(new Date(2026, 0, 1));

    component.onDelete({ currentTarget: null } as unknown as Event);
    const accept = confirmSpy.calls.mostRecent().args[0].accept;
    expect(accept).toBeDefined();
    accept!();

    expect(transactionServiceMock.delete).toHaveBeenCalledWith(17);
    expect(component.months.map(m => m.getMonth())).toEqual([1, 3]);
    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args)
      .toEqual([2026, 3]);
  });

  it('refreshes months after creating a transaction without reordering the backend result', () => {
    transactionServiceMock.create.and.returnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.and.returnValue(of([
      { year: 2025, month: 12 },
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));

    component.onCreate({ index: 1 } as Transaction);

    expect(component.months.map(m => [m.getFullYear(), m.getMonth()])).toEqual([
      [2025, 11], [2026, 1], [2026, 3]
    ]);
    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args)
      .toEqual([2026, 3]);
  });

  it('refreshes months after confirming deletion and falls back to the newest remaining month', () => {
    const confirmationService = TestBed.inject(ConfirmationService);
    const confirmSpy = spyOn(confirmationService, 'confirm').and.stub();
    transactionServiceMock.delete.and.returnValue(of({}));
    transactionCalendarServiceMock.getRange.and.returnValue(of([
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));
    component.selectedData = { index: 17 } as Transaction;
    component.loadCalendar(new Date(2026, 0, 1));

    component.onDelete({ currentTarget: null } as unknown as Event);
    const accept = confirmSpy.calls.mostRecent().args[0].accept;
    expect(accept).toBeDefined();
    accept!();

    expect(transactionServiceMock.delete).toHaveBeenCalledWith(17);
    expect(component.months.map(m => m.getMonth())).toEqual([1, 3]);
    expect(transactionCalendarServiceMock.getCalendarInRange.calls.mostRecent().args)
      .toEqual([2026, 3]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
