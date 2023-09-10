import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FeeMonth } from '@app/association/models/fee-month';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';

@Component({
  selector: 'assoc-fee-calendar',
  templateUrl: './fee-calendar.component.html'
})
export class FeeCalendarComponent implements OnChanges {

  @Input() public year = 0;

  @Input() public years: number[] = [];

  @Input() public rows: UserFeeCalendar[] = [];

  @Output() public yearChange = new EventEmitter<number>();

  private index = 0;

  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['year']) || (changes['years'])) {
      this.index = this.years.indexOf(this.year);
    }
  }

  public onGoTo(selectedYear: number) {
    this.yearChange.emit(selectedYear);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.year = this.years[this.index];
    this.yearChange.emit(this.year);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.year = this.years[this.index];
    this.yearChange.emit(this.year);
  }

  public isAbleToGoNext() {
    return ((this.index >= 0) && ((this.index + 1) < this.years.length));
  }

  public isAbleToGoPrevious() {
    return (this.index > 0);
  }

  public hasMonth(months: FeeMonth[], month: number): boolean {
    return months.find(m => m.month === month) !== undefined;
  }

  public getMonth(months: FeeMonth[], month: number): FeeMonth | undefined {
    return months.find(m => m.month === month);
  }

}
