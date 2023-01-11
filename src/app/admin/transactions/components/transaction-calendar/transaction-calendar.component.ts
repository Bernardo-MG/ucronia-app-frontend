import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CalendarNote } from '@app/calendar/models/calendar-note';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'admin-transaction-calendar',
  templateUrl: './transaction-calendar.component.html',
  styleUrls: ['./transaction-calendar.component.sass']
})
export class TransactionCalendarComponent implements OnChanges {

  @Input() public transactions: Transaction[] = [];

  @Input() public date = new Date();

  @Output() public dateChange = new EventEmitter<Date>();

  @Output() public pickDate = new EventEmitter<Date>();

  public notes: CalendarNote[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.notes = this.transactions.map(t => {
      const date = new Date(t.date);
      return new CalendarNote(date.getFullYear(), date.getMonth(), date.getDay(), t.description);
    });
  }

  public onDateChange(date: Date) {
    this.dateChange.emit(date);
  }

  public onPickDate(date: Date) {
    this.pickDate.emit(date);
  }

}
