import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { FeeSummary, MemberStatus } from '@ucronia/domain';
import { ConfirmationService } from '@openng/optimus-ui/api';
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

  const feeCalendarMock = {
    getCalendar: vi.fn(

  ).mockName("FeeCalendarService.getCalendar")
};

  const feeServiceMock = {
    update: vi.fn(
    ).mockName("FeeService.update"),
    pay: vi.fn().mockName("FeeService.pay"), create: vi.fn().mockName("FeeService.create"), delete: vi.fn().mockName("FeeService.delete"), getOne: vi.fn().mockName("FeeService.getOne"), searchMembers: vi.fn(
  ).mockName("FeeService.searchMembers")
};

  const feeReportMock = {
    getSummary: vi.fn(

  ).mockName("FeeReportService.getSummary")
};

  beforeEach(async () => {
    feeCalendarMock.getCalendar.mockReturnValue(
      of([])
    );

    feeReportMock.getSummary.mockReturnValue(
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

  it('filters calendar rows by member status and keeps the selection when changing the period', () => {
    const row = (number: number, active?: boolean): MemberFees => {
      const entry = new MemberFees();
      entry.member.number = number;
      entry.member.active = active;
      return entry;
    };
    const active = row(1, true);
    const inactive = row(2, false);
    const unknown = row(3);
    feeCalendarMock.getCalendar.mockReturnValue(of([active, inactive, unknown]));
    component.loadCalendar({ start: new Date(2023, 0, 1), end: new Date(2023, 5, 1) });
    fixture.detectChanges();

    const selector: MemberStatusSelector = fixture.debugElement.query(By.directive(MemberStatusSelector)).componentInstance;
    const calendar: FeeCalendar = fixture.debugElement.query(By.directive(FeeCalendar)).componentInstance;
    feeCalendarMock.getCalendar.mockClear();

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
    const nextPeriodInactive = row(4, false);
    feeCalendarMock.getCalendar.mockReturnValue(of([active, nextPeriodInactive]));
    const nextPeriod = { start: new Date(2024, 10, 1), end: new Date(2025, 1, 1) };
    calendar.periodChange.emit(nextPeriod);
    fixture.detectChanges();
    expect(feeCalendarMock.getCalendar).toHaveBeenCalledTimes(1);
    expect(feeCalendarMock.getCalendar).toHaveBeenCalledWith(nextPeriod);
    expect(selector.status()).toBe(MemberStatus.Inactive);
    expect(calendar.feeCalendar()).toEqual([nextPeriodInactive]);
  });
});
