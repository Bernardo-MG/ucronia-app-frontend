import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FeePaymentSummary } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeReportService } from '../fee-report-service';
import { FeeService } from '../fee-service';
import { FeeView } from './fee-view';

describe('FeeView', () => {
  let component: FeeView;
  let fixture: ComponentFixture<FeeView>;

  const feeCalendarMock = jasmine.createSpyObj<FeeCalendarService>(
    'FeeCalendarService',
    ['getCalendar', 'getRange']
  );

  const feeServiceMock = jasmine.createSpyObj<FeeService>(
    'FeeService',
    ['update', 'pay', 'create', 'delete', 'getOne', 'getMembers']
  );

  const feeReportMock = jasmine.createSpyObj<FeeReportService>(
    'FeeReportService',
    ['getPaymentReport']
  );

  beforeEach(async () => {
    feeCalendarMock.getRange.and.returnValue(
      of({ years: [2020, 2021, 2022, 2023, 2024] })
    );

    feeCalendarMock.getCalendar.and.returnValue(
      of([])
    );

    feeReportMock.getPaymentReport.and.returnValue(
      of(new FeePaymentSummary())
    );

    await TestBed.configureTestingModule({
      imports: [
        FeeView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: FeeCalendarService, useValue: feeCalendarMock },
        { provide: FeeService, useValue: feeServiceMock },
        { provide: FeeReportService, useValue: feeReportMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
