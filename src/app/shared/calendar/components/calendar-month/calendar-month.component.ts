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

  @Input() public months: Month[] = [];

  @Input() public month = new Month(0, 0);

  @Output() public changeMonth = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<CalendarEvent<any>>();

  public currentMonth = new Month(0, 0);

  public activeDayIsOpen = false;

  public viewDate = new Date();

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  private index = 0;

  public selectionMonths: Month[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month']) {
      this.currentMonth = this.month;
      this.viewDate = new Date(`${this.currentMonth.year}-${this.currentMonth.month}`);
  
      this.activeDayIsOpen = false;
    }

    if (changes['months']) {
      // Reload index
      this.selectionMonths = this.months.slice().reverse();
      this.index = this.months.findIndex(d => (d.year === this.currentMonth.year) && (d.month === (this.currentMonth.month)));
      if (this.index >= 0) {
        this.currentMonth = this.months[this.index];
      } else if (this.months.length > 0) {
        // Outside the range
        const lastMonth = this.months[this.months.length - 1];
        if ((lastMonth.year < this.currentMonth.year) && (lastMonth.month < this.currentMonth.month)) {
          // After the range
          this.currentMonth = lastMonth;
        } else {
          // Before the range
          this.currentMonth = this.months[0];
        }
      } else {
        // Empty range
        this.currentMonth = this.getThisMonth();
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
    const date = event.target.value.split('-');
    this.currentMonth = new Month(Number(date[0]), Number(date[1]));
    this.index = this.months.findIndex(d => (d.year === this.currentMonth.year) && (d.month === (this.currentMonth.month)));
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
    if (isSameMonth(date, this.viewDate)) {
      if (this.activeDayIsOpen && (isSameDay(this.viewDate, date)) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.viewDate = date;
        this.activeDayIsOpen = true;
      }
    }
  }

  public onSelectEvent({ event }: { event: CalendarEvent }): void {
    this.pickDate.emit(event);
  }

  public getMonthName(month: Month) {
    return `${month.year} ${this.monthNames[month.month - 1]}`;
  }

  private goToMonth() {
    this.viewDate = new Date(`${this.currentMonth.year}-${this.currentMonth.month}`);

    this.activeDayIsOpen = false;

    this.changeMonth.emit(this.currentMonth);
  }

  private getThisMonth() {
    const date = new Date();
    const month = new Month(date.getFullYear(), date.getMonth() + 1);

    return month;
  }

}
