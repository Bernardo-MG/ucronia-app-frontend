import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CalendarMonthComponent } from './calendar-month.component';

describe('CalendarMonthComponent', () => {
  let component: CalendarMonthComponent;
  let fixture: ComponentFixture<CalendarMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarMonthComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Init

  it('should send an event notifying the date when initializing', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    component.ngOnInit();

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the current month when initializing', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    component.ngOnInit();

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  // Moving through months

  it('should send an event notifying the date when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the previous month when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.date).toEqual(date);
  });

  it('should send an event notifying the date when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(2);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the next month when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(2);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.date).toEqual(date);
  });

  // Changing years

  it('should send an event notifying the date when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2019);
    date.setMonth(11);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the previous month when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2019);
    date.setMonth(11);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.date).toEqual(date);
  });

  it('should send an event notifying the date when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(11);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(11);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2021);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the next month when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.date.setFullYear(2020);
    component.date.setMonth(11);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2021);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    expect(component.date).toEqual(date);
  });

});
