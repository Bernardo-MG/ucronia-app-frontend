import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TransactionSummary } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
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
    ['getRange']
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
