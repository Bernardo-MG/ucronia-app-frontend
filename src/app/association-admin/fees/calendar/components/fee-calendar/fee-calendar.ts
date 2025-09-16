import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeeCalendarYear, FeeCalendarMonth } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { IconBackwardComponent, IconForwardComponent, IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-fee-calendar',
  imports: [CommonModule, RouterModule, JustifyCenterDirective, IconBackwardComponent, IconForwardComponent, IconSuccessOrFailureComponent, BlockUiDirective],
  templateUrl: './fee-calendar.html',
  styleUrl: './fee-calendar.sass'
})
export class FeeCalendar implements OnChanges {

  @Input() public range = new FeeCalendarYearsRange();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readonly waiting = input(false);

  public readonly feeCalendar = input<FeeCalendarYear[]>([]);

  public readonly goToYear = output<number>();

  public year = new Date().getFullYear();

  public monthNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  private index = 0;

  public get canGoNext() {
    return ((this.index >= 0) && ((this.index + 1) < this.range.years.length));
  }

  public get canGoPrevious() {
    return (this.index > 0);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const rangeChange = changes['range'];
    if (rangeChange) {
      const range = rangeChange.currentValue as FeeCalendarYearsRange;

      if (range?.years?.length) {
        const lastYear = Number(range.years[range.years.length - 1]);

        if (this.year > lastYear) {
          this.year = lastYear;
        }

        this.index = range.years.indexOf(this.year.toString());
      }
    }
  }

  public onGoTo(event: any) {
    this.year = Number(event.target.value);
    this.index = this.range.years.indexOf(this.year.toString());
    this.goToYear.emit(this.year);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.year = Number(this.range.years[this.index]);
    this.goToYear.emit(this.year);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.year = Number(this.range.years[this.index]);
    this.goToYear.emit(this.year);
  }

  public hasMonth(months: FeeCalendarMonth[], month: number): boolean {
    return months.find(m => this.getMonthNumber(m.month) === month) !== undefined;
  }

  public isPaid(months: FeeCalendarMonth[], month: number): boolean {
    return this.getCalendarMonth(months, month).paid;
  }

  public getMonth(months: FeeCalendarMonth[], month: number): string {
    return this.getCalendarMonth(months, month).month;
  }

  private getCalendarMonth(months: FeeCalendarMonth[], month: number): FeeCalendarMonth {
    return months.find(m => this.getMonthNumber(m.month) === month) as FeeCalendarMonth;
  }

  private getMonthNumber(date: string): number {
    return parseInt(date.split("-")[1], 10);
  }

}
