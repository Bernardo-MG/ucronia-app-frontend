import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Transaction } from '@app/domain/transactions/transaction';
import { Colors } from '@app/shared/utils/colors';
import { CalendarMonth } from '@bernardo-mg/ui';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'assoc-transaction-calendar',
  imports: [CalendarMonth],
  templateUrl: './transaction-calendar.html'
})
export class TransactionCalendar implements OnChanges {

  public readonly transactions = input<Transaction[]>([]);
  public readonly loading = input(false);
  public readonly months = input<Date[]>([]);

  public readonly changeMonth = output<Date>();
  public readonly pickDate = output<CalendarEvent<{ transactionId: number }>>();

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  public ngOnChanges({ transactions }: SimpleChanges): void {
    if (transactions) {
      this.events = this.transactions().map(t => {
        const date = new Date(t.date);
        let color;
        if (t.amount >= 0) {
          color = Colors.blue;
        } else {
          color = Colors.red;
        }
        return {
          title: `${t.description} (${t.amount}€)`,
          color: color,
          start: date,
          meta: {
            transactionId: t.index,
          }
        };
      });
    }
  }

}
