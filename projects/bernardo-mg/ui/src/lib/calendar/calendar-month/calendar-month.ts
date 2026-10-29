import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent, CalendarMonthViewComponent, CalendarMonthViewDay, DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { SelectChangeEvent, SelectModule } from 'primeng/select';


@Component({
  selector: 'ui-calendar-month',
  templateUrl: './calendar-month.html',
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, CalendarMonthViewComponent],
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

  public _month = new Date();
  public get month() {
    return this._month;
  }
  public set month(value: Date) {
    this._month = value;
    this.viewDate = value;
  }

  public selectionMonths: { value: Date, label: string }[] = [];

  public viewDate = new Date();

  public activeDayIsOpen = false;

  public ngOnChanges({ months }: SimpleChanges): void {
    if (months) {
      this.selectionMonths = this.months()
        .map(m => { return { value: m, label: format(m, 'yyyy MMMM') } });
      this.updateCurrentMonth();
    }
  }

  public onGoTo(event: SelectChangeEvent) {
    this.viewDate = event.value;
    this.activeDayIsOpen = false;
    this.changeMonth.emit(event.value);
  }

  public onSelectDay({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      const sameDay = isSameDay(this.viewDate, date);
      this.activeDayIsOpen = !(this.activeDayIsOpen && sameDay) && events.length > 0;
      this.viewDate = date;
    }
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => day.badgeTotal = day.events.length);
  }

  private updateCurrentMonth(): void {
    const months = this.months();
    if (!months.length) {
      this.month = new Date();
      return;
    }

    const selectedMonth = months.find(m => isSameMonth(m, this.viewDate));
    this.month = selectedMonth ?? months[months.length - 1];
  }

}
