import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { Month } from '@app/shared/calendar/models/month';
import { Colors } from '@app/shared/utils/colors';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'assoc-transaction-calendar',
  templateUrl: './transaction-calendar.component.html'
})
export class TransactionCalendarComponent implements OnChanges {

  @Input() public waiting = false;

  @Input() public year = 0;

  @Input() public month = 0;

  @Input() public months: Date[] = [];

  @Input() public transactions: Transaction[] = [];

  @Output() public dateChange = new EventEmitter<Month>();

  @Output() public pickTransaction = new EventEmitter<number>();

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.events = this.transactions.map(t => {
        const date = new Date(t.date);
        let color;
        if (t.amount >= 0) {
          color = Colors.blue;
        } else {
          color = Colors.red;
        }
        return {
          title: t.description,
          color: color,
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
