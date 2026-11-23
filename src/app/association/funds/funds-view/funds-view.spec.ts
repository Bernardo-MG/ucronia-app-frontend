import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { Transaction, TransactionSummary, TransactionType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { of, Subject } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';
import { TransactionReportService } from '../transaction-report-service';
import { TransactionService } from '../transaction-service';
import { FundsView } from './funds-view';

describe('FundsView', () => {
  let component: FundsView;
  let fixture: ComponentFixture<FundsView>;

  const transactionServiceMock = {
    create: vi.fn(
    ).mockName("TransactionService.create"),
    update: vi.fn().mockName("TransactionService.update"), delete: vi.fn().mockName("TransactionService.delete"), getOne: vi.fn().mockName("TransactionService.getOne"), getTypes: vi.fn().mockName("TransactionService.getTypes"), getTypesPage: vi.fn().mockName("TransactionService.getTypesPage"), getType: vi.fn().mockName("TransactionService.getType"), deleteType: vi.fn().mockName("TransactionService.deleteType"), saveType: vi.fn(
  ).mockName("TransactionService.saveType")
};

  const transactionReportServiceMock = {
    downloadExcelReport: vi.fn(

  ).mockName("TransactionReportService.downloadExcelReport")
};

  const transactionBalanceServiceMock = {
    summary: vi.fn(
    ).mockName("TransactionBalanceService.summary"),
    monthly: vi.fn(
  ).mockName("TransactionBalanceService.monthly")
};

  const transactionCalendarServiceMock = {
    getRange: vi.fn(
    ).mockName("TransactionCalendarService.getRange"),
    getCalendarInRange: vi.fn(
  ).mockName("TransactionCalendarService.getCalendarInRange")
};

  beforeEach(async () => {
    transactionBalanceServiceMock.monthly.mockReturnValue(
      of([])
    );
    transactionServiceMock.getTypes.mockReturnValue(of([]));
    transactionServiceMock.getTypesPage.mockReturnValue(of(new Page<TransactionType>()));
    transactionServiceMock.getType.mockReturnValue(of({} as TransactionType));
    transactionServiceMock.deleteType.mockReturnValue(of({} as TransactionType));
    transactionServiceMock.saveType.mockReturnValue(of({} as TransactionType));
    transactionBalanceServiceMock.summary.mockReturnValue(
      of(new TransactionSummary())
    );
    transactionCalendarServiceMock.getRange.mockReturnValue(
      of([])
    );
    transactionCalendarServiceMock.getCalendarInRange.mockReturnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        FundsView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: AuthService, useValue: { hasPermission: () => true } },
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
    expect(vi.mocked(transactionCalendarServiceMock.getCalendarInRange).mock.lastCall).toEqual([2026, 0]);
  });

  it('loads the transaction type page from the view when selecting its tab', () => {
    const data = Object.assign(new Page<TransactionType>(), {
      page: 1,
      size: 10,
      totalElements: 1,
      totalPages: 1,
      content: [{ number: 1, description: 'Donación', color: '#123456' }]
    });
    transactionServiceMock.getTypesPage.mockClear();
    transactionServiceMock.getTypesPage.mockReturnValue(of(data));

    fixture.debugElement.query(By.css('p-tabs')).triggerEventHandler('valueChange', 'types');
    fixture.detectChanges();

    expect(transactionServiceMock.getTypesPage).toHaveBeenCalledTimes(1);

    expect(transactionServiceMock.getTypesPage).toHaveBeenCalledWith(1, 10);
    expect(fixture.nativeElement.textContent).toContain('Donación');
  });

  it('ignores an older calendar response after selecting a new month', () => {
    const january = new Subject<Transaction[]>();
    const february = new Subject<Transaction[]>();
    transactionCalendarServiceMock.getCalendarInRange.mockReturnValueOnce(january).mockReturnValueOnce( february);

    component.loadCalendar(new Date(2026, 0, 1));
    component.loadCalendar(new Date(2026, 1, 1));
    expect(january.observed).toBe(false);

    january.next([{ index: 1 } as Transaction]);
    february.next([{ index: 2 } as Transaction]);
    expect(component.transactions.map(t => t.index)).toEqual([2]);
  });

  it('refreshes available months after updating a transaction', () => {
    transactionServiceMock.update.mockReturnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.mockReturnValue(of([
      { year: 2026, month: 1 },
      { year: 2026, month: 3 }
    ]));

    component.loadCalendar(new Date(2026, 0, 1));
    component.onUpdate({ index: 1 } as Transaction);

    expect(component.months.map(m => m.getMonth())).toEqual([0, 2]);
    expect(vi.mocked(transactionCalendarServiceMock.getCalendarInRange).mock.lastCall).toEqual([2026, 0]);
  });

  it('falls back to the newest available month if the selected month disappears', () => {
    transactionServiceMock.update.mockReturnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.mockReturnValue(of([
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));

    component.loadCalendar(new Date(2026, 0, 1));
    component.onUpdate({ index: 1 } as Transaction);

    expect(vi.mocked(transactionCalendarServiceMock.getCalendarInRange).mock.lastCall).toEqual([2026, 3]);
  });

  it('refreshes months after creating a transaction without reordering the backend result', () => {
    transactionServiceMock.create.mockReturnValue(of({} as Transaction));
    transactionCalendarServiceMock.getRange.mockReturnValue(of([
      { year: 2025, month: 12 },
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));

    component.onCreate({ index: 1 } as Transaction);

    expect(component.months.map(m => [m.getFullYear(), m.getMonth()])).toEqual([
      [2025, 11], [2026, 1], [2026, 3]
    ]);
    expect(vi.mocked(transactionCalendarServiceMock.getCalendarInRange).mock.lastCall)
      .toEqual([2026, 3]);
  });

  it('refreshes months after confirming deletion and falls back to the newest remaining month', () => {
    const confirmationService = TestBed.inject(ConfirmationService);
    const confirmSpy = vi.spyOn(confirmationService, 'confirm').mockReturnThis();
    transactionServiceMock.delete.mockReturnValue(of(new Transaction()));
    transactionCalendarServiceMock.getRange.mockReturnValue(of([
      { year: 2026, month: 2 },
      { year: 2026, month: 4 }
    ]));
    component.selectedData = { index: 17 } as Transaction;
    component.loadCalendar(new Date(2026, 0, 1));

    component.onDelete({ currentTarget: null } as unknown as Event);
    const accept = vi.mocked(confirmSpy).mock.lastCall![0].accept;
    expect(accept).toBeDefined();
    accept!();

    expect(transactionServiceMock.delete).toHaveBeenCalledWith(17);
    expect(component.months.map(m => m.getMonth())).toEqual([1, 3]);
    expect(vi.mocked(transactionCalendarServiceMock.getCalendarInRange).mock.lastCall)
      .toEqual([2026, 3]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
