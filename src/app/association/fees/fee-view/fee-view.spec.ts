import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { FeeSummary, MemberStatus } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { MemberFees } from '../domain/member-fees';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeCalendar } from '../fee-calendar/fee-calendar';
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

  it('filters calendar rows by member status and keeps the selection when changing years', () => {
    const row = (number: number, active?: boolean): MemberFees => {
      const entry = new MemberFees();
      entry.member.number = number;
      entry.member.active = active;
      return entry;
    };
    const active = row(1, true);
    const inactive = row(2, false);
    const unknown = row(3);
    feeCalendarMock.getCalendar.and.returnValue(of([active, inactive, unknown]));
    component.loadCalendar(2023);
    fixture.detectChanges();

    const selector: MemberStatusSelector = fixture.debugElement.query(By.directive(MemberStatusSelector)).componentInstance;
    const calendar: FeeCalendar = fixture.debugElement.query(By.directive(FeeCalendar)).componentInstance;
    feeCalendarMock.getCalendar.calls.reset();

    expect(selector.status()).toBe(MemberStatus.Active);
    expect(calendar.feeCalendar()).toEqual([active]);

    selector.filter.emit(MemberStatus.Inactive);
    fixture.detectChanges();
    expect(calendar.feeCalendar()).toEqual([inactive]);

    selector.filter.emit(MemberStatus.All);
    fixture.detectChanges();
    expect(calendar.feeCalendar()).toEqual([active, inactive, unknown]);
    expect(feeCalendarMock.getCalendar).not.toHaveBeenCalled();

    selector.filter.emit(MemberStatus.Inactive);
    const nextYearInactive = row(4, false);
    feeCalendarMock.getCalendar.and.returnValue(of([active, nextYearInactive]));
    calendar.goToYear.emit(2024);
    fixture.detectChanges();
    expect(feeCalendarMock.getCalendar).toHaveBeenCalledOnceWith(2024);
    expect(selector.status()).toBe(MemberStatus.Inactive);
    expect(calendar.feeCalendar()).toEqual([nextYearInactive]);
  });
});
