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

    it('should call updateCurrentMonth and loadInitialMonth when months change', () => {
      spyOn<any>(component, 'updateCurrentMonth');
      spyOn<any>(component, 'loadInitialMonth');

      component.ngOnChanges({
        months: {
          currentValue: [new Date()],
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component['updateCurrentMonth']).toHaveBeenCalled();
      expect(component['loadInitialMonth']).toHaveBeenCalled();
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

});
