import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Month } from '../../models/month';


@Component({
  selector: 'shared-calendar-month',
  templateUrl: './calendar-month.component.html'
})
export class CalendarMonthComponent implements OnChanges {

  @Input() public events: CalendarEvent<any>[] = [];

  @Input() public year = 0;

  @Input() public month = 0;

  @Input() public months: Date[] = [];

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<CalendarEvent<any>>();

  public monthName = '';

  public viewDate: Date = new Date();

  public activeDayIsOpen: boolean = false;

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  private startYear = 0;

  private startMonth = 0;

  private endYear = 0;

  private endMonth = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year'] || changes['month'] || changes['notes']) {
      this.monthName = this.getMonthName(this.month);
      this.activeDayIsOpen = false;
      this.viewDate = new Date(this.year, this.month - 1, 1);
    }
    if (changes['months']) {
      const startDate = this.months[0];
      this.startYear = startDate.getFullYear();
      this.startMonth = startDate.getMonth() + 1;
      const endDate = this.months[this.months.length - 1];
      this.endYear = endDate.getFullYear();
      this.endMonth = endDate.getMonth() + 1;
    }
  }

  public onGoPrevious() {
    const date = new Month();
    if (this.month > 1) {
      date.year = this.year;
      date.month = this.month - 1;
    } else {
      date.year = this.year - 1;
      date.month = 12;
    }
    this.dateChange.emit(date);
  }

  public onGoNext() {
    const date = new Month();
    if (this.month < 12) {
      date.year = this.year;
      date.month = this.month + 1;
    } else {
      date.year = this.year + 1;
      date.month = 1;
    }
    this.dateChange.emit(date);
  }

  public isAbleToGoNext() {
    let valid;

    if (this.months.length > 0) {
      if (this.year == this.endYear) {
        // In the same year
        // Checks month
        valid = (this.month < this.endMonth);
      } else {
        valid = (this.year < this.endYear);
      }
    } else {
      valid = false;
    }

    return valid;
  }

  public isAbleToGoPrevious() {
    let valid;

    if (this.months.length > 0) {
      if (this.year == this.startYear) {
        // In the same year
        // Checks month
        valid = (this.month > this.startMonth);
      } else {
        valid = (this.year > this.startYear);
      }
    } else {
      valid = false;
    }

    return valid;
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.length;
    });
  }

  public onPickDate({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  public onSelectEvent({ event }: { event: CalendarEvent }): void {
    this.pickDate.emit(event);
  }

  private getMonthName(month: number): string {
    return this.monthNames[month - 1];
  }

}
