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

  @Input() public currentMonth = new Date();

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<CalendarEvent<any>>();

  public activeDayIsOpen = false;

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  private index = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentMonth']) {
      this.activeDayIsOpen = false;
      // Reload index
      this.index = this.months.findIndex(d => (d.getUTCFullYear() === this.currentMonth.getUTCFullYear()) && (d.getUTCMonth() === (this.currentMonth.getUTCMonth())));
      if (this.index >= 0) {
        this.currentMonth = this.months[this.index];
      } else {
        this.currentMonth = new Date();
      }
    }
    if (changes['months']) {
      // Reload index
      this.index = this.months.findIndex(d => (d.getUTCFullYear() === this.currentMonth.getUTCFullYear()) && (d.getUTCMonth() === (this.currentMonth.getUTCMonth())));
      if (this.index >= 0) {
        this.currentMonth = this.months[this.index];
      } else {
        this.currentMonth = new Date();
      }
    }
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.currentMonth = this.months[this.index];
    const year = this.currentMonth.getFullYear();
    const monthValue = this.currentMonth.getUTCMonth() + 1;
    const month = new Month();
    month.year = year;
    month.month = monthValue;
    this.dateChange.emit(month);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.currentMonth = this.months[this.index];
    const year = this.currentMonth.getFullYear();
    const monthValue = this.currentMonth.getUTCMonth() + 1;
    const month = new Month();
    month.year = year;
    month.month = monthValue;
    this.dateChange.emit(month);
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
      this.currentMonth = date;
    }
  }

  public onSelectEvent({ event }: { event: CalendarEvent }): void {
    this.pickDate.emit(event);
  }

  public onGoTo(event: any) {
    this.currentMonth = event.target.value;
  }

  public monthName2(date: Date) {
    return `${date.getFullYear()} ${this.monthNames[date.getUTCMonth()]}`;
  }

  private getMonthName(month: number): string {
    return this.monthNames[month - 1];
  }

}
