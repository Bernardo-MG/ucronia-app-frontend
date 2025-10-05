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

  });

  describe('Dates', () => {

    it('should update viewDate and emit when onGoTo is called', () => {
      const month = new Date("2024-2");
      component.onGoTo({ value: month });

      expect(component.month.getFullYear()).toEqual(month.getFullYear());
      expect(component.month.getMonth()).toEqual(month.getMonth());
    });

  });

});
