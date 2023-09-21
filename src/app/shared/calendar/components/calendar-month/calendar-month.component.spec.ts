import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
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
        LayoutModule,
        IconsModule
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
  // Moving through months
  // **************************************************************************

  it('should send an event notifying the date when moving to the previous month', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 2);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.changeMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 2);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month(2020, 1);

    expect(component.changeMonth.emit).toHaveBeenCalledWith(date);
  });

  it('should send an event notifying the date when moving to the next month', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 2);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.changeMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 2);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month(2020, 3);

    expect(component.changeMonth.emit).toHaveBeenCalledWith(date);
  });

  // **************************************************************************
  // Changing years
  // **************************************************************************

  it('should send an event notifying the date when moving to the previous month when the current month is January', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2019, 1), new Month(2020, 0), new Month(2020, 1)];
    component.currentMonth = new Month(2020, 1);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    expect(component.changeMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the previous month when moving to the previous month when the current month is January', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2019, 1), new Month(2020, 0), new Month(2020, 1)];
    component.currentMonth = new Month(2020, 1);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#previousMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month(2019, 12);

    expect(component.changeMonth.emit).toHaveBeenCalledWith(date);
  });

  it('should send an event notifying the date when moving to the next month when the current month is December', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2020, 10), new Month(2020, 11), new Month(2021, 0)];
    component.currentMonth = new Month(2020, 12);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    expect(component.changeMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event with the next month when moving to the next month when the current month is December', () => {
    spyOn(component.changeMonth, 'emit');

    component.months = [new Month(2020, 10), new Month(2020, 11), new Month(2021, 0)];
    component.currentMonth = new Month(2020, 12);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#nextMonthButton'));
    button.triggerEventHandler('click');

    const date = new Month(2021, 1);

    expect(component.changeMonth.emit).toHaveBeenCalledWith(date);
  });

  // **************************************************************************
  // Range and buttons
  // **************************************************************************

  it('should enable the forward button when the current month is before the end', () => {
    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 2);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button.disabled).toEqual(false);
  });

  it('should enable the backward button when the current month is after the start', () => {
    component.months = [new Month(2020, 1), new Month(2020, 2), new Month(2020, 3)];
    component.currentMonth = new Month(2020, 3);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button.disabled).toEqual(false);
  });

  // **************************************************************************
  // Hide buttons
  // **************************************************************************

  it('should hide the forward button by default', () => {
    const button = fixture.nativeElement.querySelector('#nextMonthButton');

    expect(button).toBeNull();
  });

  it('should hide the backward button by default', () => {
    const button = fixture.nativeElement.querySelector('#previousMonthButton');

    expect(button).toBeNull();
  });

  it('should hide the backward button when the current month is equal to the start', () => {
    component.months = [new Month(2020, 1), new Month(2020, 2), new Month(2020, 3)];
    component.currentMonth = new Month(2020, 2);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button).toBeNull();
  });

  it('should hide the backward button when the current month is before the start', () => {
    component.months = [new Month(2020, 1), new Month(2020, 2), new Month(2020, 3)];
    component.currentMonth = new Month(2020, 1);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#previousMonthButton');
    expect(button).toBeNull();
  });

  it('should hide the forward button when the current month is equal to the end', () => {
    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 3);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button).toBeNull();
  });

  it('should hide the forward button when the current month is after the end', () => {
    component.months = [new Month(2020, 0), new Month(2020, 1), new Month(2020, 2)];
    component.currentMonth = new Month(2020, 4);
    component.ngOnChanges({
      months: new SimpleChange(null, component.months, true)
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#nextMonthButton');
    expect(button).toBeNull();
  });

});
