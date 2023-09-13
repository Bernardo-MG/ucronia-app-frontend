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

  @Input() public year = 0;

  @Input() public month = 0;

  @Input() public months: Date[] = [];

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<CalendarEvent<any>>();

  public monthName = '';

  public viewDate: Date = new Date();

  public activeDayIsOpen: boolean = false;

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  private index = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year'] || changes['month'] || changes['notes']) {
      this.monthName = this.getMonthName(this.month);
      this.activeDayIsOpen = false;
      this.viewDate = new Date(this.year, this.month - 1, 1);
      // Reload index
      this.index = this.months.findIndex(d => (d.getFullYear() === this.year) && (d.getMonth() === (this.month - 1)));
    }
    if (changes['months']) {
      // Reload index
      this.index = this.months.findIndex(d => (d.getFullYear() === this.year) && (d.getMonth() === (this.month - 1)));
    }
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    const date = this.months[this.index];
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    const month = new Month();
    month.year = this.year;
    month.month = this.month;
    this.dateChange.emit(month);
  }

  public onGoNext() {
    this.index = this.index + 1;
    const date = this.months[this.index];
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    const month = new Month();
    month.year = this.year;
    month.month = this.month;
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
