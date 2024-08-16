import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeeCalendarYearsRange } from '@app/association/fees/models/fee-calendar-years-range';
import { Active } from '@app/association/members/models/active';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { FeeCalendar } from '../../../models/fee-calendar';
import { FeeCalendarMonth } from '../../../models/fee-month';

@Component({
  selector: 'assoc-fee-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, WaitingOverlayComponent, JustifyCenterDirective],
  templateUrl: './fee-calendar.component.html'
})
export class FeeCalendarComponent implements OnChanges {

  @Input() public activeFilter = Active.Active;

  @Input() public range = new FeeCalendarYearsRange();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  @Input() public waiting = false;

  @Input() public rows: FeeCalendar[] = [];
  
  @Output() public goToYear = new EventEmitter<number>();

  public year = new Date().getFullYear();

  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  private index = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['year']) {
      this.index = this.range.years.indexOf(this.year);
    }
    if (changes['range']) {
      const lastYear = this.range.years[this.range.years.length - 1];
      if (this.year > lastYear) {
        this.year = lastYear;
      }
      this.index = this.range.years.indexOf(this.year);
    }
  }

  public onGoTo(event: any) {
    this.year = Number(event.target.value);
    this.goToYear.emit(this.year);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.year = this.range.years[this.index];
    this.goToYear.emit(this.year);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.year = this.range.years[this.index];
    this.goToYear.emit(this.year);
  }

  public isAbleToGoNext() {
    return ((this.index >= 0) && ((this.index + 1) < this.range.years.length));
  }

  public isAbleToGoPrevious() {
    return (this.index > 0);
  }

  public hasMonth(months: FeeCalendarMonth[], month: number): boolean {
    return months.find(m => m.month === month) !== undefined;
  }

  public getMonth(months: FeeCalendarMonth[], month: number): FeeCalendarMonth | undefined {
    return months.find(m => m.month === month);
  }

}
