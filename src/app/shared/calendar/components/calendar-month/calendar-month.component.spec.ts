import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarMonthComponent } from './calendar-month.component';
import { Month } from '../../models/month';

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

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Moving through months
  // **************************************************************************

  it('should send an event notifying the date when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 2;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 2;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month();
    date.year = 2020;
    date.month = 1;

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should send an event notifying the date when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 2;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 2;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month();
    date.year = 2020;
    date.month = 3;

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  // **************************************************************************
  // Changing years
  // **************************************************************************

  it('should send an event notifying the date when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 1;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month when the current month is January', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 1;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month();
    date.year = 2019;
    date.month = 12;

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  it('should send an event notifying the date when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 12;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month when the current month is December', () => {
    spyOn(component.dateChange, 'emit');

    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2021;
    component.endMonth = 1;

    component.year = 2020;
    component.month = 12;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month();
    date.year = 2021;
    date.month = 1;

    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
  });

  // **************************************************************************
  // Range and buttons
  // **************************************************************************

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
    component.startMonth = 1;
    component.endYear = 2020;
    component.endMonth = 3;

    component.year = 2020;
    component.month = 1;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when the current month is equal to the end', () => {
    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2020;
    component.endMonth = 3;

    component.year = 2020;
    component.month = 3;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the forward button when the current month is after the end', () => {
    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2020;
    component.endMonth = 3;

    component.year = 2021;
    component.month = 1;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the backward button when the current month is after the start', () => {
    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2020;
    component.endMonth = 3;

    component.year = 2020;
    component.month = 1;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the backward button when the current month is equal to the start', () => {
    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2020;
    component.endMonth = 3;

    component.year = 2019;
    component.month = 1;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button when the current month is before the start', () => {
    component.startYear = 2019;
    component.startMonth = 1;
    component.endYear = 2020;
    component.endMonth = 3;

    component.year = 2018;
    component.month = 0;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(true);
  });

});
