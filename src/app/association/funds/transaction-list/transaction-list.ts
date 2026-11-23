import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Transaction } from '@ucronia/domain';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TableModule, TablePageEvent } from '@openng/optimus-ui/table';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-transaction-list',
  imports: [ButtonModule, TableModule, TagModule, CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './transaction-list.html'
})
export class TransactionList {

  public readonly data = input<Transaction[]>([]);
  public readonly loading = input(false);
  public readonly page = input(0);
  public readonly rows = input(0);
  public readonly totalRecords = input(0);

  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();
  public readonly show = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  // Event handlers
  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
