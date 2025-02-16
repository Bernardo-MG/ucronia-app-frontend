import { SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BlockUiDirective } from '@bernardo-mg/layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Month } from '../../models/month';
import { CalendarMonthComponent } from './calendar-month.component';

describe('CalendarMonthComponent', () => {
  let component: CalendarMonthComponent;
  let fixture: ComponentFixture<CalendarMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
        BlockUiDirective
      ],
      declarations: [CalendarMonthComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Input/Output bindings tests
  // **************************************************************************

  it('should emit changeMonth event when onGoTo is called', fakeAsync(() => {
    spyOn(component.changeMonth, 'emit');
    const selectedMonth = new Month(2024, 3);
    const event = { target: { value: '2024-3' } };
    component.onGoTo(event);

    tick(); // Waiting for asynchronous operations to complete
    expect(component.changeMonth.emit).toHaveBeenCalledWith(selectedMonth);
  }));

  it('should emit pickDate event when onSelectEvent is called', () => {
    spyOn(component.pickDate, 'emit');
    const event = { event: { start: new Date('2024-03-15T10:00:00'), title: 'Event 1' } };
    component.onSelectEvent(event);

    expect(component.pickDate.emit).toHaveBeenCalledWith(event.event);
  });

  // **************************************************************************
  // Dates
  // **************************************************************************

  it('should update viewDate and emit when onGoTo is called', () => {
    const selectedMonth = new Month(2024, 3);
    const event = { target: { value: '2024-3' } };
    component.onGoTo(event);

    expect(component.viewDate.getFullYear()).toEqual(selectedMonth.year);
    expect(component.viewDate.getMonth()).toEqual(selectedMonth.month - 1); // Months are zero-based
  });

  // **************************************************************************
  // Months
  // **************************************************************************

  it('should render month selector when months are provided', () => {
    const months: Month[] = [
      new Month(2024, 1),
      new Month(2024, 2),
      new Month(2024, 3)
    ];
    component.months = months;
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });
    fixture.detectChanges();

    const selectorElement = fixture.nativeElement.querySelector('.form-select');

    expect(selectorElement).toBeTruthy();
    const options = selectorElement.querySelectorAll('option');
    expect(options.length).toBe(months.length);
    months.slice().reverse().forEach((month, index) => {
      expect(options[index].textContent).toContain(component.getMonthName(month));
      expect(options[index].value).toBe(`${month.year}-${month.month}`);
    });
  });

  it('should render empty month selector when months array is empty', () => {
    const emptyMonths: Month[] = [];
    component.months = emptyMonths;
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });
    fixture.detectChanges();

    const selectorElement = fixture.nativeElement.querySelector('.form-select');

    expect(selectorElement).toBeTruthy();
    const options = selectorElement.querySelectorAll('option');
    expect(options.length).toBe(0);
  });

  // **************************************************************************
  // UI
  // **************************************************************************

  it('should show the month name properly', () => {
    const month = new Month(2024, 3); // March 2024
    const monthName = component.getMonthName(month);
    expect(monthName).toEqual('2024 March');
  });

});
