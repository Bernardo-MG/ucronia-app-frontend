import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeeCalendarMonth, FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-fee-calendar',
  imports: [FormsModule, CommonModule, RouterModule, SelectModule, TableModule, ButtonModule, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './fee-calendar.html'
})
export class FeeCalendar implements OnChanges {

  public range = input(new FeeCalendarYearsRange());

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readonly waiting = input(false);

  public readonly feeCalendar = input<FeeCalendarYear[]>([]);

  public readonly goToYear = output<number>();

  public readonly selectFee = output<{ member: number, date: Date }>();

  public year = new Date().getFullYear();

  public monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  private index = 0;

  public get canGoNext() {
    return (this.index >= 0) && ((this.index + 1) < this.range().years.length);
  }

  public get canGoPrevious() {
    return (this.index > 0);
  }

  public get years() {
    return [...this.range().years].reverse();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const rangeChange = changes['range'];
    if (rangeChange) {
      const range = rangeChange.currentValue as FeeCalendarYearsRange;

      if (range?.years?.length) {
        this.index = range.years.indexOf(this.year);
      }
    }
  }

  public onGoTo(event: any) {
    this.year = Number(event.value);
    this.index = this.range().years.indexOf(this.year);
    this.goToYear.emit(this.year);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.year = Number(this.range().years[this.index]);
    this.goToYear.emit(this.year);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.year = Number(this.range().years[this.index]);
    this.goToYear.emit(this.year);
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
