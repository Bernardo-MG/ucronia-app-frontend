import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { CalendarEvent, CalendarMonthViewComponent, CalendarMonthViewDay, DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { isSameDay, isSameMonth } from 'date-fns';
import { JustifyCenterDirective } from '../../directives/justify-center.directive';
import { Month } from '../models/month';


@Component({
  selector: 'shared-calendar-month',
  templateUrl: './calendar-month.html',
  imports: [CommonModule, JustifyCenterDirective, CalendarMonthViewComponent],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class CalendarMonth implements OnChanges {

  public readonly waiting = input(false);
  public readonly events = input<CalendarEvent<any>[]>([]);
  public readonly month = input(new Month(0, 0));

  private _selectionMonths: Month[] = [];
  @Input() public set selectionMonths(months: Month[]) {
    this._selectionMonths = [...months].reverse();
    this.updateCurrentMonth();
  }
  public get selectionMonths() {
    return this._selectionMonths;
  }

  public readonly changeMonth = output<Month>();
  public readonly pickDate = output<CalendarEvent<any>>();

  public currentMonth = new Month(0, 0);

  public activeDayIsOpen = false;

  public viewDate = new Date();

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month']) {
      this.setMonth(this.month());
    }
  }

  public onGoTo(event: any) {
    const [year, month] = event.target.value.split('-').map(Number);
    this.setMonth(new Month(year, month));
    this.changeMonth.emit(this.currentMonth);
  }

  public onSelectDay({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      const sameDay = isSameDay(this.viewDate, date);
      this.activeDayIsOpen = !(this.activeDayIsOpen && sameDay) && events.length > 0;
      this.viewDate = date;
    }
  }

  public onSelectEvent({ event }: { event: CalendarEvent }): void {
    this.pickDate.emit(event);
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => day.badgeTotal = day.events.length);
  }

  public getMonthName(month: Month) {
    return `${month.year} ${this.monthNames[month.month - 1]}`;
  }

  private updateCurrentMonth() {
    if (!this.selectionMonths.length) {
      this.currentMonth = this.getThisMonth();
    } else {
      const exists = this.selectionMonths.some(m => m.year === this.currentMonth.year && m.month === this.currentMonth.month);
      if (!exists) {
        this.setMonth(this.selectionMonths[this.selectionMonths.length - 1]);
      }
    }
  }

  private setMonth(month: Month) {
    this.currentMonth = month;
    this.viewDate = new Date(`${month.year}-${month.month}`);
    this.activeDayIsOpen = false;
  }

  private getThisMonth() {
    const date = new Date();
    return new Month(date.getFullYear(), date.getMonth() + 1);
  }

}
