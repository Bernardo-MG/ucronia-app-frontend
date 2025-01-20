import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeeCalendar, FeeCalendarMonth } from '@app/models/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/models/fees/fee-calendar-years-range';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
    selector: 'assoc-fee-calendar',
    imports: [CommonModule, RouterModule, IconsModule, JustifyCenterDirective, BlockUiDirective],
    templateUrl: './fee-calendar.component.html',
    styleUrl: './fee-calendar.component.sass'
})
export class FeeCalendarComponent implements OnChanges {

  @Input() public range = new FeeCalendarYearsRange();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  @Input() public waiting = false;

  @Input() public feeCalendar: FeeCalendar[] = [];

  @Output() public goToYear = new EventEmitter<number>();

  public year = new Date().getFullYear();

  public monthNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  private index = 0;

  public get canGoNext() {
    return ((this.index >= 0) && ((this.index + 1) < this.range.years.length));
  }

  public get canGoPrevious() {
    return (this.index > 0);
  }

  public ngOnChanges({ range }: SimpleChanges): void {
    if (range) {
      const lastYear = Number(this.range.years[this.range.years.length - 1]);
      if (this.year > lastYear) {
        this.year = lastYear;
      }
      this.index = this.range.years.indexOf(this.year.toString());
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
    return months.find(m => m.monthNumber === month) !== undefined;
  }

  public isPaid(months: FeeCalendarMonth[], month: number): boolean {
    return this.getCalendarMonth(months, month).paid;
  }

  public getMonth(months: FeeCalendarMonth[], month: number): string {
    return this.getCalendarMonth(months, month).month;
  }

  private getCalendarMonth(months: FeeCalendarMonth[], month: number): FeeCalendarMonth {
    return months.find(m => m.monthNumber === month) as FeeCalendarMonth;
  }

}
