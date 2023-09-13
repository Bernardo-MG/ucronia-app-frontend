import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Colors } from '@app/shared/utils/colors';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarNote } from '../../models/calendar-note';
import { Day } from '../../models/day';
import { Month } from '../../models/month';


@Component({
  selector: 'shared-calendar-month',
  templateUrl: './calendar-month.component.html'
})
export class CalendarMonthComponent implements OnChanges {

  @Input() public notes: CalendarNote[] = [];

  @Input() public year = 0;

  @Input() public month = 0;

  @Input() public startYear = 0;

  @Input() public startMonth = 0;

  @Input() public endYear = 0;

  @Input() public endMonth = 0;

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<Day>();

  public monthName = '';

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public viewDate: Date = new Date();

  public events: CalendarEvent<any>[] = [];

  public activeDayIsOpen: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year'] || changes['month'] || changes['notes']) {
      this.loadMonth();
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

    if (this.year == this.endYear) {
      // In the same year
      // Checks month
      valid = (this.month < this.endMonth);
    } else {
      valid = (this.year < this.endYear);
    }

    return valid;
  }

  public isAbleToGoPrevious() {
    let valid;

    if (this.year == this.startYear) {
      // In the same year
      // Checks month
      valid = (this.month > this.startMonth);
    } else {
      valid = (this.year > this.startYear);
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
    const day = new Day();
    day.day = event.start.getDate();
    day.month = event.start.getMonth() + 1;
    day.year = event.start.getFullYear();
    this.pickDate.emit(day);
  }

  private loadMonth() {
    this.monthName = this.getMonthName(this.month);
    this.activeDayIsOpen = false;
    this.viewDate = new Date(this.year, this.month - 1, 1);
    this.events = this.notes.map(n => {
      return {
        title: n.description,
        color: Colors.yellow,
        start: n.date
      };
    });
  }

  private getMonthName(month: number): string {
    return this.monthNames[month - 1];
  }

}
