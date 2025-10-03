import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

    it('should emit pickDate event when onSelectEvent is called', () => {
      spyOn(component.pickDate, 'emit');
      const event = { event: { start: new Date('2024-03-15T10:00:00'), title: 'Event 1' } };
      component.onSelectEvent(event);

      expect(component.pickDate.emit).toHaveBeenCalledWith(event.event);
    });

  });

  describe('Dates', () => {

    it('should update viewDate and emit when onGoTo is called', () => {
      const month = new Date("2024-2");
      component.onGoTo({ value: month });

      expect(component.currentMonth.getFullYear()).toEqual(month.getFullYear());
      expect(component.currentMonth.getMonth()).toEqual(month.getMonth());
    });

  });

});
