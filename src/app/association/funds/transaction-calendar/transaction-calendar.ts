import { Component, inject, input, LOCALE_ID, OnChanges, output, SimpleChanges } from '@angular/core';
import { Colors } from '@app/shared/utils/colors';
import { CalendarMonth } from '@bernardo-mg/ui';
import { Transaction, TransactionType } from '@ucronia/domain';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'assoc-transaction-calendar',
  imports: [CalendarMonth],
  templateUrl: './transaction-calendar.html'
})
export class TransactionCalendar implements OnChanges {
  public readonly loading = input(false);
  public readonly months = input<Date[]>([]);
  public readonly selectedMonth = input<Date | undefined>(undefined);

  public readonly transactions = input<Transaction[]>([]);
  public readonly types = input<TransactionType[]>([]);

  public readonly changeMonth = output<Date>();
  public readonly pickDate = output<number>();

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  private readonly currencyFormatter = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'currency',
    currency: 'EUR'
  });

  public ngOnChanges({ transactions, types }: SimpleChanges): void {
    if (transactions || types) {
      const colors = new Map(this.types().map(type => [type.number, type.color]));
      this.events = this.transactions().map(t => {
        const color = t.transactionType == null ? undefined : colors.get(t.transactionType);
        return {
          title: `${t.description} (${this.currencyFormatter.format(t.amount)})`,
          color: color && /^#[0-9a-f]{6}$/i.test(color)
            ? { primary: color, secondary: `${color}33` }
            : t.amount >= 0 ? Colors.blue : Colors.red,
          start: t.date,
          meta: { transactionId: t.index }
        };
      });
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
