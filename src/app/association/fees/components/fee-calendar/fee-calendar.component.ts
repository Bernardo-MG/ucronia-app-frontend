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

  public months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  public feesTable: FeeCalendarRow[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['year']) || (changes['years'])) {
      this.index = this.years.indexOf(this.year);
    }
  }

  public onGoPrevious() {
    this.year = this.years[this.index - 1];
    this.yearChange.emit(this.year);
  }

  public onGoNext() {
    this.year = this.years[this.index + 1];
    this.yearChange.emit(this.year);
  }

  public isAbleToGoNext() {
    return ((this.index + 1) < this.years.length);
  }

  public isAbleToGoPrevious() {
    return (this.index > 0);
  }

}
