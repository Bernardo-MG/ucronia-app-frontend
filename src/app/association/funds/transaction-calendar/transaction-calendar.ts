import { Component, inject, input, LOCALE_ID, OnChanges, output, SimpleChanges } from '@angular/core';
import { Colors } from '@app/shared/utils/colors';
import { CalendarMonth } from '@bernardo-mg/ui';
import { Transaction } from '@ucronia/domain';
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
  public readonly pickDate = output<number>();

  private readonly currencyFormatter = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'currency',
    currency: 'EUR'
  });

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  public ngOnChanges({ transactions }: SimpleChanges): void {
    if (transactions) {
      this.events = this.transactions().map(t => {
        let color;
        if (t.amount >= 0) {
          color = Colors.blue;
        } else {
          color = Colors.red;
        }
        return {
          title: `${t.description} (${this.currencyFormatter.format(t.amount)})`,
          color: color,
          start: t.date,
          meta: {
            transactionId: t.index,
          }
        };
      });
    }
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
    if (event.meta) {
      this.pickDate.emit(event.meta.transactionId);
    }
  }

}
