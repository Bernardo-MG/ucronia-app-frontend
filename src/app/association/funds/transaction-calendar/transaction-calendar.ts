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
  public readonly selectedMonth = input<Date | undefined>(undefined);

  public readonly changeMonth = output<Date>();
  public readonly pickDate = output<number>();

  private readonly currencyFormatter = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'currency',
    currency: 'EUR'
  });

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  public ngOnChanges({ transactions }: SimpleChanges): void {
    if (transactions) {
      this.events = this.transactions().map(t => ({
        title: `${t.description} (${this.currencyFormatter.format(t.amount)})`,
        color: t.amount >= 0 ? Colors.blue : Colors.red,
        start: t.date,
        meta: { transactionId: t.index }
      }));
    }
  }

  public onPickDate(event: CalendarEvent<unknown>): void {
    const meta = event.meta;
    if (typeof meta === 'object' && meta !== null && 'transactionId' in meta
      && typeof meta.transactionId === 'number') {
      this.pickDate.emit(meta.transactionId);
    }
  }

}
