import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeeCalendarRange } from '@app/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/models/fee-calendar-row';

@Component({
  selector: 'admin-fee-calendar',
  templateUrl: './fee-calendar.component.html',
  styleUrls: ['./fee-calendar.component.sass']
})
export class FeeYearComponent {

  @Input() public year: number = -1;

  @Input() public data: FeeCalendarRow[] = [];

  @Input() public range = new FeeCalendarRange();

  @Output() public yearChange = new EventEmitter<number>();

  public months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  public feesTable: FeeCalendarRow[] = []

  constructor() {}

  public onGoPrevious() {
    this.year = this.year - 1;
    this.yearChange.emit(this.year);
  }

  public onGoNext() {
    this.year = this.year + 1;
    this.yearChange.emit(this.year);
  }

  public isAbleToGoForwards() {
    return ((this.range.end > 0) && (this.year < this.range.end));
  }

  public isAbleToGoBackwards() {
    return ((this.range.start > 0) && (this.year > this.range.start));
  }

}
