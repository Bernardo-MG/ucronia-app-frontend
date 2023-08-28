import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { CalendarNote } from '@app/shared/calendar/models/calendar-note';

@Component({
  selector: 'assoc-transaction-calendar',
  templateUrl: './transaction-calendar.component.html'
})
export class TransactionCalendarComponent implements OnChanges {

  @Input() public year = 0;

  @Input() public month = 0;

  @Input() public range = new TransactionCalendarRange();
  
  @Input() public transactions: Transaction[] = [];

  @Output() public dateChange = new EventEmitter<Date>();

  @Output() public pickDate = new EventEmitter<Date>();

  public notes: CalendarNote[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.notes = this.transactions.map(t => {
        const date = new Date(t.date);
        return new CalendarNote(date.getFullYear(), date.getMonth(), date.getDate(), t.description);
      });
    }
  }
  
  public onPickDate(date: Date) {
    this.pickDate.emit(date);
  }

  public onDateChange(date: Date) {
    this.dateChange.emit(date);
  }

}
