import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FeeSummary } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeService } from '../fee-service';
import { FeeSummaryService } from '../fee-summary-service';
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
    ['update', 'pay', 'create', 'delete', 'getOne', 'searchMembers']
  );

  const feeReportMock = jasmine.createSpyObj<FeeSummaryService>(
    'FeeReportService',
    ['getSummary']
  );

  beforeEach(async () => {
    feeCalendarMock.getRange.and.returnValue(
      of({ years: [2020, 2021, 2022, 2023, 2024] })
    );

    feeCalendarMock.getCalendar.and.returnValue(
      of([])
    );

    feeReportMock.getSummary.and.returnValue(
      of(new FeeSummary())
    );

    await TestBed.configureTestingModule({
      imports: [
        FeeView
      ],
      providers: [
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: FeeCalendarService, useValue: feeCalendarMock },
        { provide: FeeService, useValue: feeServiceMock },
        { provide: FeeSummaryService, useValue: feeReportMock }
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
