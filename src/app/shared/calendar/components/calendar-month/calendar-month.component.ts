import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Calendar } from '../../models/calendar';
import { CalendarDay } from '../../models/calendar-day';
import { CalendarNote } from '../../models/calendar-note';
import { CalendarWeek } from '../../models/calendar-week';
import { Month } from '../../models/month';
import { Day } from '../../models/day';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';

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

  public calendar: Calendar = new Calendar();

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  public monthName = '';

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

  public onPickDate(year: number, month: number, day: number) {
    if (day) {
      const date = new Day();
      date.year = year;
      date.month = month;
      date.day = day;

      this.pickDate.emit(date);
    }
  }

  private getDateInfo(year: number, month: number, day: number | null): CalendarNote[] {
    return this.notes.filter(d => d.year === year && d.month === month && d.day === day);
  }

  private loadMonth() {
    this.calendar.year = this.year;
    this.calendar.month = this.month;
    this.monthName = this.getMonthName(this.calendar.month);
    this.calendar.weeks = this.generateWeeks(this.calendar.year, this.month);
    this.calendar.weeks.forEach(w => w.days
      .filter(d => d.number)
      .forEach(d => {
        const notes = this.getDateInfo(this.calendar.year, this.calendar.month, d.number);
        if (notes) {
          d.notes = notes;
        }
      }))
  }

  private generateWeeks(currentYear: number, currentMonth: number): CalendarWeek[] {
    const weeks: CalendarWeek[] = [];
    let currentWeek: CalendarWeek = new CalendarWeek();
    let currentDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
    const numDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Add empty days to the beginning of the first week to align it with the correct day of the week
    for (let i = 0; i < currentDayOfWeek; i++) {
      currentWeek.days.push(new CalendarDay(null));
    }

    // Add days to the calendar
    for (let i = 1; i <= numDaysInMonth; i++) {
      currentWeek.days.push(new CalendarDay(i));

      if (currentDayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = new CalendarWeek();
        currentDayOfWeek = -1;
      }

      currentDayOfWeek++;
    }

    // Add empty days to the end of the last week to fill it out
    while (currentWeek.days.length < 7) {
      currentWeek.days.push(new CalendarDay(null));
    }

    weeks.push(currentWeek);

    return weeks;
  }

  private getMonthName(month: number): string {
    return this.monthNames[month - 1];
  }

}
