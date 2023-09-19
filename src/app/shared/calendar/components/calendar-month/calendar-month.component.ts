import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Month } from '../../models/month';


@Component({
  selector: 'shared-calendar-month',
  templateUrl: './calendar-month.component.html'
})
export class CalendarMonthComponent implements OnChanges {

  @Input() public waiting = false;

  @Input() public events: CalendarEvent<any>[] = [];

  @Input() public months: Date[] = [];

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<CalendarEvent<any>>();

  public currentMonth = new Date();

  public activeDayIsOpen = false;

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  private index = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['months']) {
      // Reload index
      this.index = this.months.findIndex(d => (d.getUTCFullYear() === this.currentMonth.getUTCFullYear()) && (d.getUTCMonth() === (this.currentMonth.getUTCMonth())));
      if (this.index >= 0) {
        this.currentMonth = this.months[this.index];
      } else {
        // Outside the range
        const lastMonth = this.months[this.months.length - 1];
        this.currentMonth = new Date();
        if ((lastMonth.getFullYear() < this.currentMonth.getFullYear()) && (lastMonth.getMonth() < this.currentMonth.getMonth())) {
          // After the range
          this.currentMonth = lastMonth;
        } else {
          // Before the range
          this.currentMonth = this.months[0];
        }
      }
    }
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.currentMonth = this.months[this.index];
    this.goToMonth();
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.currentMonth = this.months[this.index];
    this.goToMonth();
  }

  public onGoTo(event: any) {
    this.currentMonth = new Date(event.target.value);
    this.index = this.months.findIndex(d => (d.getUTCFullYear() === this.currentMonth.getUTCFullYear()) && (d.getUTCMonth() === (this.currentMonth.getUTCMonth())));
    this.goToMonth();
  }

  public isAbleToGoNext() {
    return ((!this.waiting) && ((this.index >= 0) && ((this.index + 1) < this.months.length)));
  }

  public isAbleToGoPrevious() {
    return ((!this.waiting) && (this.index > 0));
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.length;
    });
  }

  public onPickDate({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.currentMonth)) {
      if (
        (isSameDay(this.currentMonth, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  public onSelectEvent({ event }: { event: CalendarEvent }): void {
    this.pickDate.emit(event);
  }

  public getMonthName(date: Date) {
    return `${date.getFullYear()} ${this.monthNames[date.getUTCMonth()]}`;
  }

  private goToMonth() {
    const year = this.currentMonth.getFullYear();
    const monthValue = this.currentMonth.getUTCMonth() + 1;
    const month = new Month();
    month.year = year;
    month.month = monthValue;
    this.dateChange.emit(month);
  }

}
