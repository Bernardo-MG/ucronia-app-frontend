import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeeCalendarMonth, FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-fee-calendar',
  imports: [FormsModule, CommonModule, RouterModule, SelectModule, TableModule, ButtonModule, JustifyCenterDirective],
  templateUrl: './fee-calendar.html'
})
export class FeeCalendar implements OnChanges {

  public range = input(new FeeCalendarYearsRange());
  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readonly loading = input(false);
  public readonly year = input(new Date().getFullYear());
  public readonly feeCalendar = input<FeeCalendarYear[]>([]);

  // TODO: maybe use bidirectional property
  public readonly goToYear = output<number>();
  public readonly selectFee = output<{ member: number, date: Date }>();

  public monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public currentYear = new Date().getFullYear();

  private index = 0;

  public get selectionDisabled() {
    return this.loading() || (this.range().years.length === 0);
  }

  public get canGoNext() {
    return (this.index >= 0) && ((this.index + 1) < this.range().years.length);
  }

  public get canGoPrevious() {
    return (this.index > 0);
  }

  public get years() {
    return [...this.range().years].reverse();
  }

  public ngOnChanges({ range, year }: SimpleChanges): void {
    if (range) {

      if (range.currentValue.years.length) {
        this.index = range.currentValue.years.indexOf(this.currentYear);
      }
    }

    if (year) {
      this.currentYear = year.currentValue;
    }
  }

  public onGoTo(event: any) {
    this.currentYear = Number(event.value);
    this.index = this.range().years.indexOf(this.currentYear);
    this.goToYear.emit(this.currentYear);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.currentYear = Number(this.range().years[this.index]);
    this.goToYear.emit(this.currentYear);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.currentYear = Number(this.range().years[this.index]);
    this.goToYear.emit(this.currentYear);
  }

  public hasMonth(months: FeeCalendarMonth[], month: number): boolean {
    return months.find(m => (m.month.getMonth() + 1) === month) !== undefined;
  }

  public onSelectFee(member: number, months: FeeCalendarMonth[], month: number) {
    const calendarMonth = this.getCalendarMonth(months, month);
    this.selectFee.emit({ member: member, date: calendarMonth.month })
  }

  public isPaid(months: FeeCalendarMonth[], month: number): boolean {
    return this.getCalendarMonth(months, month).paid;
  }

  public getMonth(months: FeeCalendarMonth[], month: number): Date {
    return this.getCalendarMonth(months, month).month;
  }

  private getCalendarMonth(months: FeeCalendarMonth[], month: number): FeeCalendarMonth {
    return months.find(m => (m.month.getMonth() + 1) === month) as FeeCalendarMonth;
  }

}
