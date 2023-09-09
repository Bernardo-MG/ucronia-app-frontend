import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';

@Component({
  selector: 'assoc-fee-calendar',
  templateUrl: './fee-calendar.component.html'
})
export class FeeCalendarComponent implements OnChanges {

  @Input() public year = 0;

  @Input() public years: number[] = [];

  @Input() public rows: FeeCalendarRow[] = [];

  @Output() public yearChange = new EventEmitter<number>();

  private index = 0;

  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public feesTable: FeeCalendarRow[] = [];

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

}
