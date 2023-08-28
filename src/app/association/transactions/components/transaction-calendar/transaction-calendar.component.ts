import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { CalendarNote } from '@app/shared/calendar/models/calendar-note';
import { Day } from '@app/shared/calendar/models/day';
import { Month } from '@app/shared/calendar/models/month';

@Component({
  selector: 'assoc-transaction-calendar',
  templateUrl: './transaction-calendar.component.html'
})
export class TransactionCalendarComponent implements OnChanges {

  @Input() public year = 0;

  @Input() public month = 0;

  @Input() public range = new TransactionCalendarRange();
  
  @Input() public transactions: Transaction[] = [];

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickDate = new EventEmitter<Day>();

  public notes: CalendarNote[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.notes = this.transactions.map(t => {
        const date = new Date(t.date);
        // Corrects month value
        const month = date.getMonth() + 1;
        // TODO: Shouldn't the year and month match the ones in the calendar?
        return new CalendarNote(date.getFullYear(), month, date.getDate(), t.description);
      });
    }
  }
  
  public onPickDate(date: Day) {
    this.pickDate.emit(date);
  }

  public onDateChange(date: Month) {
    this.dateChange.emit(date);
  }

}
