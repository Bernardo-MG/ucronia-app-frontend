import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent, CalendarMonthViewComponent, CalendarMonthViewDay, DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { JustifyCenterDirective } from '../../directives/justify-center.directive';


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

  public readonly loading = input(false);
  public readonly events = input<CalendarEvent<any>[]>([]);
  public readonly months = input<Date[]>([]);

  public readonly changeMonth = output<Date>();
  public readonly pickDate = output<CalendarEvent<any>>();

  public readonly month = new Date();

  public selectionMonths: { value: Date, label: string }[] = [];

  public currentMonth = new Date();

  public activeDayIsOpen = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['months']) {
      this.selectionMonths = this.months()
        .map(m => { return { value: m, label: format(m, 'yyyy MMMM') } });
      this.updateCurrentMonth();
      this.loadInitialMonth();
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

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => day.badgeTotal = day.events.length);
  }

  private updateCurrentMonth() {
    if (!this.months().length) {
      this.currentMonth = new Date();
    } else {
      const exists = this.months().some(m => m === this.currentMonth);
      if (!exists) {
        // Choose latest date
        this.setMonth(this.months()[this.months().length - 1]);
      }
    }
  }

  private setMonth(month: Date) {
    this.currentMonth = month;
    this.activeDayIsOpen = false;
  }

  private loadInitialMonth() {
    const date = new Date();
    if (this.months().length > 0) {
      const month = this.months()[0];
      if ((date.getFullYear() >= month.getFullYear()) || ((date.getFullYear() >= month.getFullYear()) && (date.getMonth() >= month.getMonth()))) {
        // The current date is after the last date in range
        // Replace with the last date
        this.currentMonth = month;
      } else {
        this.currentMonth = new Date();
      }
    } else {
      this.currentMonth = new Date();
    }
  }

}
