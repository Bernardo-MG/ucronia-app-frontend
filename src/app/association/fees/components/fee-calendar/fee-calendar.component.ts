import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';

@Component({
  selector: 'admin-fee-calendar',
  templateUrl: './fee-calendar.component.html',
  styleUrls: ['./fee-calendar.component.sass']
})
export class FeeCalendarComponent {

  @Input() public year = 0;

  @Input() start = 0;

  @Input() end = 0;

  @Input() public rows: FeeCalendarRow[] = [];

  @Output() public yearChange = new EventEmitter<number>();

  public months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  public feesTable: FeeCalendarRow[] = []

  public onGoPrevious() {
    this.year = this.year - 1;
    this.yearChange.emit(this.year);
  }

  public onGoNext() {
    this.year = this.year + 1;
    this.yearChange.emit(this.year);
  }

  public isAbleToGoNext() {
    return (this.year < this.end);
  }

  public isAbleToGoPrevious() {
    return (this.year > this.start);
  }

}
