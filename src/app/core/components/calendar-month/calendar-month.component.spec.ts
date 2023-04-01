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

  // Moving through months

  it('should send an event notifying the date when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the previous month when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    expect(component.date).toEqual(date);
  });

  it('should send an event notifying the date when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(2);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the next month when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(2);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.date).toEqual(date);
  });

  // Changing years

  it('should send an event notifying the date when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2019);
    date.setMonth(11);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the previous month when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2019);
    date.setMonth(11);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.date).toEqual(date);
  });

  it('should send an event notifying the date when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(11);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(11);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2021);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should change date to the next month when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2021;
    component.endMonth = 0;

    component.date.setFullYear(2020);
    component.date.setMonth(11);

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Date();
    date.setFullYear(2021);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(component.date).toEqual(date);
  });

  // Range and buttons

  it('should disable the forward button by default', () => {
    const button = fixture.nativeElement.querySelector('#nextMonthButton');

    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button by default', () => {
    const button = fixture.nativeElement.querySelector('#previousMonthButton');

    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when the current month is before the end', () => {
    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2020;
    component.endMonth = 3;

    component.date.setFullYear(2020);
    component.date.setMonth(1);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when the current month is equal to the end', () => {
    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2020;
    component.endMonth = 3;

    component.date.setFullYear(2020);
    component.date.setMonth(3);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the forward button when the current month is after the end', () => {
    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2020;
    component.endMonth = 3;

    component.date.setFullYear(2021);
    component.date.setMonth(0);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the backward button when the current month is after the start', () => {
    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2020;
    component.endMonth = 3;

    component.date.setFullYear(2020);
    component.date.setMonth(0);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the backward button when the current month is equal to the start', () => {
    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2020;
    component.endMonth = 3;

    component.date.setFullYear(2019);
    component.date.setMonth(0);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button when the current month is before the start', () => {
    component.startYear = 2019;
    component.startMonth = 0;
    component.endYear = 2020;
    component.endMonth = 3;

    component.date.setFullYear(2018);
    component.date.setMonth(0);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(true);
  });

});
