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
  public readonly events = input<CalendarEvent<unknown>[]>([]);
  public readonly months = input<Date[]>([]);
  public readonly selectedMonth = input<Date | undefined>(undefined);

  public readonly changeMonth = output<Date>();
  public readonly pickDate = output<CalendarEvent<unknown>>();

  public get month(): Date {
    return this.selectionMonths.find(({ value }) => isSameMonth(value, this.viewDate))?.value ?? this.viewDate;
  }

  public get selectionDisabled(): boolean {
    return this.loading() || this.selectionMonths.length === 0;
  }

  public get canGoPrevious(): boolean {
    return !this.loading() && this.monthIndex > 0;
  }

  public get canGoNext(): boolean {
    return !this.loading() && this.monthIndex >= 0 && this.monthIndex < this.selectionMonths.length - 1;
  }

  private get monthIndex(): number {
    return this.selectionMonths.findIndex(({ value }) => isSameMonth(value, this.viewDate));
  }

  public selectionMonths: { value: Date, label: string }[] = [];

  public viewDate = new Date();

  public activeDayIsOpen = false;

  public ngOnChanges({ months, selectedMonth }: SimpleChanges): void {
    if (months) {
      this.selectionMonths = this.months().map(month => ({
        value: month,
        label: format(month, 'yyyy MMMM')
      }));
    }
    if (months || selectedMonth) {
      this.updateCurrentMonth();
    }
  }

  public onGoTo(event: SelectChangeEvent) {
    this.activeDayIsOpen = false;
    this.changeMonth.emit(event.value);
  }

  public onGoPrevious(): void {
    if (this.canGoPrevious) {
      this.changeMonth.emit(this.selectionMonths[this.monthIndex - 1].value);
    }
  }

  public onGoNext(): void {
    if (this.canGoNext) {
      this.changeMonth.emit(this.selectionMonths[this.monthIndex + 1].value);
    }
  }

  public onSelectDay({ date, events }: { date: Date; events: CalendarEvent<unknown>[] }): void {
    if (!isSameMonth(date, this.viewDate)) {
      return;
    }

    const isCurrentDay = isSameDay(date, this.viewDate);
    const isOpenDay = isCurrentDay && this.activeDayIsOpen;

    this.activeDayIsOpen = events.length > 0 && !isOpenDay;
    this.viewDate = date;
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => day.badgeTotal = day.events.length);
  }

  private updateCurrentMonth(): void {
    const month = this.selectedMonth() ?? this.months().at(-1) ?? new Date();

    if (!isSameMonth(this.viewDate, month)) {
      this.activeDayIsOpen = false;
    }

    this.viewDate = month;
  }

}
