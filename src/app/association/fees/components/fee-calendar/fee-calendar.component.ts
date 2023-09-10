import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeeMonth } from '@app/association/models/fee-month';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';

@Component({
  selector: 'assoc-fee-calendar',
  templateUrl: './fee-calendar.component.html'
})
export class FeeCalendarComponent {

  @Input() public year = 0;

  @Input() start = 0;

  @Input() end = 0;

  @Input() public rows: UserFeeCalendar[] = [];

  @Output() public yearChange = new EventEmitter<number>();

  public months: number[] = Array(12).fill(0).map((x, i) => i + 1);

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

  public hasMonth(months: FeeMonth[], month: number): boolean {
    return months.find(m => m.month === month) !== undefined;
  }

  public getMonth(months: FeeMonth[], month: number): FeeMonth | undefined {
    return months.find(m => m.month === month);
  }

}
