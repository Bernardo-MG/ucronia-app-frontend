import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { Day } from '@app/shared/calendar/models/day';
import { Month } from '@app/shared/calendar/models/month';
import { Colors } from '@app/shared/utils/colors';
import { CalendarEvent } from 'angular-calendar';

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

  @Output() public pickTransaction = new EventEmitter<number>();

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.events = this.transactions.map(t => {
        const date = new Date(t.date);
        return {
          title: t.description,
          color: Colors.yellow,
          start: date,
          meta: {
            transactionId: t.id,
          }
        };
      });
    }
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
    this.pickTransaction.emit(event.meta?.transactionId);
  }

  public onDateChange(date: Month) {
    this.dateChange.emit(date);
  }

}
