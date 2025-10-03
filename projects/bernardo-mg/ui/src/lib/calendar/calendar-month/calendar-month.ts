import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent, CalendarMonthViewComponent, CalendarMonthViewDay, DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { JustifyCenterDirective } from '../../directives/justify-center.directive';
import { Month } from '../models/month';


@Component({
  selector: 'ui-calendar-month',
  templateUrl: './calendar-month.html',
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, JustifyCenterDirective, CalendarMonthViewComponent],
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
  public readonly month = input(new Date());

  public months: { value: Date, label: string }[] = [];

  private _selectionMonths: Date[] = [];
  @Input() public set selectionMonths(months: Date[]) {
    this._selectionMonths = [...months].reverse();
    this.months = this._selectionMonths
      .map(m => { return { value: m, label: format(m, 'yyyy MMMM') } });
    this.updateCurrentMonth();
  }
  public get selectionMonths() {
    return this._selectionMonths;
  }

  public readonly changeMonth = output<Date>();
  public readonly pickDate = output<CalendarEvent<any>>();

  public currentMonth = new Date();

  public activeDayIsOpen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month']) {
      this.setMonth(this.month());
    }
  }

  public onGoTo(event: SelectChangeEvent) {
    this.setMonth(event.value);
    this.changeMonth.emit(event.value);
  }

  public onSelectDay({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.currentMonth)) {
      const sameDay = isSameDay(this.currentMonth, date);
      this.activeDayIsOpen = !(this.activeDayIsOpen && sameDay) && events.length > 0;
      this.currentMonth = date;
    }
  }

  public onSelectEvent({ event }: { event: CalendarEvent }): void {
    this.pickDate.emit(event);
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => day.badgeTotal = day.events.length);
  }

  private updateCurrentMonth() {
    if (!this.selectionMonths.length) {
      this.currentMonth = new Date();
    } else {
      const exists = this.selectionMonths.some(m => m === this.currentMonth);
      if (!exists) {
        // Choose latest date
        this.setMonth(this.selectionMonths[this.selectionMonths.length - 1]);
      }
    }
  }

  private setMonth(month: Date) {
    this.currentMonth = month;
    this.activeDayIsOpen = false;
  }

}
