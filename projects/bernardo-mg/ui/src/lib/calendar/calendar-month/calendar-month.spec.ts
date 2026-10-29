import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CalendarEvent } from 'angular-calendar';
import { format } from 'date-fns';
import { CalendarMonth } from './calendar-month';

describe('CalendarMonth', () => {
  let component: CalendarMonth;
  let fixture: ComponentFixture<CalendarMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarMonth
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Events', () => {

    it('should emit changeMonth event when onGoTo is called', fakeAsync(() => {
      spyOn(component.changeMonth, 'emit');
      const month = new Date("2024-2");
      component.onGoTo({ value: month });

      tick(); // Waiting for asynchronous operations to complete
      expect(component.changeMonth.emit).toHaveBeenCalledWith(month);
    }));

  });

  describe('Dates', () => {

    it('should update viewDate when onGoTo is called', () => {
      const month = new Date("2024-2");
      component.onGoTo({ value: month });

      expect(component.viewDate.getFullYear()).toEqual(month.getFullYear());
      expect(component.viewDate.getMonth()).toEqual(month.getMonth());
    });

  });

  describe('ngOnChanges', () => {

    it('should build selectionMonths when months input changes', () => {
      const months = [new Date(2024, 0, 1), new Date(2024, 1, 1)];
      fixture.componentRef.setInput('months', months);

      component.ngOnChanges({
        months: {
          currentValue: months,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.selectionMonths.length).toBe(2);
      expect(component.selectionMonths[0].label).toBe(format(months[0], 'yyyy MMMM'));
    });

    it('should call updateCurrentMonth when months change', () => {
      spyOn<any>(component, 'updateCurrentMonth');

      component.ngOnChanges({
        months: {
          currentValue: [new Date()],
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component['updateCurrentMonth']).toHaveBeenCalled();
    });


    it('should preserve the selected month when months are refreshed with new Date instances', () => {
      fixture.componentRef.setInput('months', [new Date(2024, 0, 1), new Date(2024, 1, 1)]);
      fixture.detectChanges();
      component.onGoTo({ value: new Date(2024, 0, 15) });

      fixture.componentRef.setInput('months', [new Date(2024, 0, 1), new Date(2024, 1, 1)]);
      fixture.detectChanges();

      expect(component.viewDate.getFullYear()).toBe(2024);
      expect(component.viewDate.getMonth()).toBe(0);
      expect(component.month).toBe(component.selectionMonths[0].value);
    });

    it('should select the latest available month when the selected month is absent', () => {
      component.month = new Date(2023, 5, 1);
      fixture.componentRef.setInput('months', [new Date(2024, 0, 1), new Date(2024, 1, 1)]);
      fixture.detectChanges();

      expect(component.viewDate.getFullYear()).toBe(2024);
      expect(component.viewDate.getMonth()).toBe(1);
      expect(component.month).toBe(component.selectionMonths[1].value);
    });

    it('should default to the current month when no months are available', () => {
      component.month = new Date(2020, 0, 1);
      const before = new Date();
      fixture.componentRef.setInput('months', []);
      fixture.detectChanges();
      const after = new Date();

      expect(component.viewDate.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(component.viewDate.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(component.month).toBe(component.viewDate);
    });

  });

  describe('onSelectDay', () => {

    it('should open day if same month and events exist', () => {
      const date = new Date(component.viewDate);
      const events: CalendarEvent[] = [{ start: date, title: 'Event' }];
      component.onSelectDay({ date, events });

      expect(component.activeDayIsOpen).toBeTrue();
    });

    it('should not open day if no events', () => {
      const date = new Date(component.viewDate);
      component.onSelectDay({ date, events: [] });

      expect(component.activeDayIsOpen).toBeFalse();
    });

    it('should not update viewDate if day is from another month', () => {
      const oldViewDate = component.viewDate;
      const nextMonth = new Date(oldViewDate.getFullYear(), oldViewDate.getMonth() + 1, 1);
      component.onSelectDay({ date: nextMonth, events: [] });

      // Should not open or change month
      expect(component.viewDate.getMonth()).toEqual(oldViewDate.getMonth());
    });

  });

  describe('drawer', () => {
    it('closes an expanded day when the same day is selected again', () => {
      const date = new Date(component.viewDate);
      const events: CalendarEvent[] = [{ start: date, title: 'Payment' }];
      component.onSelectDay({ date, events });
      expect(component.activeDayIsOpen).toBeTrue();
      component.onSelectDay({ date, events });
      expect(component.activeDayIsOpen).toBeFalse();
    });

    it('does not open an empty day after another day was expanded', () => {
      component.month = new Date(2024, 5, 1);
      const first = new Date(2024, 5, 10);
      component.onSelectDay({ date: first, events: [{ start: first, title: 'Payment' }] });
      component.onSelectDay({ date: new Date(2024, 5, 11), events: [] });
      expect(component.activeDayIsOpen).toBeFalse();
    });

    it('does not change the displayed month or open state for an adjacent-month day', () => {
      component.month = new Date(2024, 5, 1);
      const oldViewDate = component.viewDate;
      component.onSelectDay({ date: new Date(2024, 6, 1), events: [{ start: new Date(2024, 6, 1), title: 'Payment' }] });
      expect(component.viewDate).toBe(oldViewDate);
      expect(component.activeDayIsOpen).toBeFalse();
    });

    it('closes the expanded day when navigating to another month', () => {
      const date = new Date(component.viewDate);
      component.onSelectDay({ date, events: [{ start: date, title: 'Payment' }] });
      component.onGoTo({ value: new Date(2024, 3, 1) });
      expect(component.activeDayIsOpen).toBeFalse();
    });
  });

  describe('badges', () => {
    it('sets badge counts for days with zero, one, and multiple events', () => {
      const date = new Date(2024, 3, 1);
      const event: CalendarEvent = { start: date, title: 'Payment' };
      const days = [[], [event], [event, event]].map(events => ({ events, badgeTotal: -1 }));
      component.beforeMonthViewRender({ body: days as any });
      expect(days.map(day => day.badgeTotal)).toEqual([0, 1, 2]);
    });
  });

  describe('selection months', () => {
    it('preserves a month across a refresh even when the date within that month differs', () => {
      fixture.componentRef.setInput('months', [new Date(2024, 0, 1), new Date(2024, 1, 1)]);
      fixture.detectChanges();
      component.onGoTo({ value: new Date(2024, 0, 29) });
      fixture.componentRef.setInput('months', [new Date(2024, 0, 15), new Date(2024, 1, 15)]);
      fixture.detectChanges();
      expect(component.viewDate.getMonth()).toBe(0);
      expect(component.month).toBe(component.selectionMonths[0].value);
    });
  });

});
