import { Component } from '@angular/core';
import { Calendar, CalendarWeek } from '@app/models/calendar';

@Component({
  selector: 'admin-transaction-calendar',
  templateUrl: './transaction-calendar.component.html',
  styleUrls: ['./transaction-calendar.component.sass']
})
export class TransactionCalendarComponent {

  public calendar: Calendar = new Calendar();
  private date = new Date();

  constructor() {
    this.loadMonth(this.date.getFullYear(), this.date.getMonth());
  }

  private loadMonth(year: number, month: number) {
    this.calendar.year = year;
    this.calendar.month = this.getMonthName(month);
    this.calendar.weeks = this.generateWeeks(this.calendar.year, month);
  }

  private generateWeeks(currentYear: number, currentMonth: number): CalendarWeek[] {
    const weeks: { days: (number | null)[] }[] = [];
    let currentWeek: { days: (number | null)[] } = { days: [] };
    let currentDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty days to the beginning of the first week to align it with the correct day of the week
    for (let i = 0; i < currentDayOfWeek; i++) {
      currentWeek.days.push(null);
    }

    // Add days to the calendar
    for (let i = 1; i <= numDaysInMonth; i++) {
      currentWeek.days.push(i);

      if (currentDayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = { days: [] };
        currentDayOfWeek = -1;
      }

      currentDayOfWeek++;
    }

    // Add empty days to the end of the last week to fill it out
    while (currentWeek.days.length < 7) {
      currentWeek.days.push(null);
    }

    weeks.push(currentWeek);

    return weeks;
  }

  private getMonthName(month: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  }

  public onGoPrevious() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.loadMonth(this.date.getFullYear(), this.date.getMonth());
  }

  public onGoNext() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.loadMonth(this.date.getFullYear(), this.date.getMonth());
  }

}
